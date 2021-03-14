import * as path from 'path';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import * as cdk from '@aws-cdk/core';
import * as cr from '@aws-cdk/custom-resources';

interface SmtpCredentialsProviderProps {
  userArn: string;
}

export class SmtpCredentialsProvider extends cdk.Construct {
  public readonly serviceToken: string;

  public constructor(
    scope: cdk.Construct,
    id: string,
    props: SmtpCredentialsProviderProps,
  ) {
    super(scope, id);
    this.serviceToken = new cr.Provider(this, 'SmtpCredentialsProvider', {
      onEventHandler: new lambda.Function(this, 'SmtpCredentialsFunction', {
        code: lambda.Code.fromAsset(path.join(__dirname, '../function')),
        runtime: lambda.Runtime.PYTHON_3_8,
        handler: 'handler.on_event',
        initialPolicy: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ['iam:CreateAccessKey'],
            resources: [props.userArn],
          }),
        ],
      }),
      logRetention: logs.RetentionDays.ONE_DAY,
    }).serviceToken;
  }
}
