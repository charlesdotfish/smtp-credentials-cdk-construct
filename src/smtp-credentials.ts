import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

export interface SmtpCredentialsProps {
  readonly emailAddress: string;
}

export class SmtpCredentials extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: SmtpCredentialsProps) {
    super(scope, id);

    const { emailAddress } = props;
    const domainName = this.extractDomainName(emailAddress);
    this.createIamUser(domainName, emailAddress);
  }

  private extractDomainName(emailAddress: string) {
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
  }
}
