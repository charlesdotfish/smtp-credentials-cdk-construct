import * as iam from '@aws-cdk/aws-iam';
import * as ssm from '@aws-cdk/aws-ssm';
import * as cdk from '@aws-cdk/core';

import { SmtpCredentialsProvider } from './smtp-credentials-provider';

export interface SmtpCredentialsProps {
  readonly emailAddress: string;
}

export class SmtpCredentials extends cdk.Construct {
  public constructor(
    scope: cdk.Construct,
    id: string,
    props: SmtpCredentialsProps,
  ) {
    super(scope, id);

    const { emailAddress } = props;

    const domainName = this.extractDomainName(emailAddress);
    const { userArn, userName } = this.createIamUser(domainName, emailAddress);
    const { accessKey, smtpPassword } = this.createSmtpCredentials(
      userArn,
      userName,
    );

    new cdk.CfnOutput(this, 'SmtpCredentialsParameterName', {
      value: new ssm.StringParameter(this, 'SmtpCredentials', {
        stringValue: JSON.stringify({
          AccessKey: accessKey,
          SmtpPassword: smtpPassword,
        }),
      }).parameterName,
    });
  }

  private extractDomainName(emailAddress: string) {
    if (emailAddress.indexOf('@') === -1) {
      throw Error('Invalid email address supplied.');
    }

    return emailAddress.substring(emailAddress.lastIndexOf('@') + 1);
  }

  private createIamUser(domainName: string, emailAddress: string) {
    const user = new iam.User(this, 'SmtpUser');
    user.attachInlinePolicy(
      new iam.Policy(this, 'SmtpPolicy', {
        statements: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ['ses:SendRawEmail'],
            resources: [
              `arn:aws:ses:${process.env.CDK_DEFAULT_REGION}:${process.env.CDK_DEFAULT_ACCOUNT}:identity/${domainName}`,
            ],
            conditions: {
              StringEquals: {
                'ses:FromAddress': emailAddress,
              },
            },
          }),
        ],
      }),
    );

    return user;
  }

  private createSmtpCredentials(userArn: string, userName: string) {
    const { serviceToken } = new SmtpCredentialsProvider(
      this,
      'SmtpCredentialsProvider',
      { userArn },
    );
    const credentials = new cdk.CustomResource(this, 'SmtpCredentialsLambda', {
      serviceToken,
      properties: {
        UserName: userName,
      },
    });

    return {
      accessKey: credentials.getAttString('AccessKey'),
      smtpPassword: credentials.getAttString('SmtpPassword'),
    };
  }
}
