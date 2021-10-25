import * as iam from "@aws-cdk/aws-iam";
import * as ssm from "@aws-cdk/aws-ssm";
import * as cdk from "@aws-cdk/core";

import { SmtpCredentialsProvider } from "./smtp-credentials-provider";

/**
 * This struct provides the configuration required to construct an instance of @see SmtpCredentials.
 */
export interface SmtpCredentialsProps {
  /**
   * The email address that the generated SMTP credentials will permit emails to be sent from.
   */
  readonly emailAddress: string;
}

/**
 * This construct creates an IAM user, with a policy permitting emails to be sent via SES from
 * a specified email address, creates an access key associated with this user, and converts the
 * access key to SMTP credentials.
 *
 * The generated SMTP credentials are stored as a parameter in Parameter Store, and the name of
 * this parameter is output as a CloudFormation output. The parameter may be safely deleted, once
 * the credentials have been accessed.
 *
 * @example
 *
 * new SmtpCredentials(this, 'SmtpCredentials', {
 *     emailAddress: 'me@charles.fish',
 * });
 */
export class SmtpCredentials extends cdk.Construct {
  /**
   * @param scope A reference to the stack which this construct will be created in. Note that the
   * SMTP credentials generated will only be permitted to send emails in this stack's region.
   *
   * @param id A unique identifier, within the context that this construct is created.
   *
   * @param props Configuration defining how this construct should be created.
   */
  public constructor(
    scope: cdk.Construct,
    id: string,
    props: SmtpCredentialsProps
  ) {
    super(scope, id);

    const { emailAddress } = props;

    const domainName = this.extractDomainName(emailAddress);
    const { userArn, userName } = this.createIamUser(domainName, emailAddress);
    const { accessKey, smtpPassword } = this.createSmtpCredentials(
      userArn,
      userName
    );

    new cdk.CfnOutput(this, "SmtpCredentialsParameterName", {
      value: new ssm.StringParameter(this, "SmtpCredentials", {
        stringValue: JSON.stringify({
          AccessKey: accessKey,
          SmtpPassword: smtpPassword,
        }),
      }).parameterName,
    });
  }

  private extractDomainName(emailAddress: string) {
    if (emailAddress.indexOf("@") === -1) {
      throw Error("Invalid email address supplied.");
    }

    return emailAddress.substring(emailAddress.lastIndexOf("@") + 1);
  }

  private createIamUser(domainName: string, emailAddress: string) {
    const user = new iam.User(this, "SmtpUser");
    user.attachInlinePolicy(
      new iam.Policy(this, "SmtpPolicy", {
        statements: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ["ses:SendRawEmail"],
            resources: [
              `arn:aws:ses:${process.env.CDK_DEFAULT_REGION}:${process.env.CDK_DEFAULT_ACCOUNT}:identity/${domainName}`,
            ],
            conditions: {
              StringEquals: {
                "ses:FromAddress": emailAddress,
              },
            },
          }),
        ],
      })
    );

    return user;
  }

  private createSmtpCredentials(userArn: string, userName: string) {
    const { serviceToken } = new SmtpCredentialsProvider(
      this,
      "SmtpCredentialsProvider",
      { userArn }
    );
    const credentials = new cdk.CustomResource(this, "SmtpCredentialsLambda", {
      serviceToken,
      properties: {
        UserName: userName,
      },
    });

    return {
      accessKey: credentials.getAttString("AccessKey"),
      smtpPassword: credentials.getAttString("SmtpPassword"),
    };
  }
}
