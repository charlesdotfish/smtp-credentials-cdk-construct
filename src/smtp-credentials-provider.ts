import * as path from "path";
import {
  aws_iam as iam,
  aws_lambda as lambda,
  aws_logs as logs,
  custom_resources as cr,
} from "aws-cdk-lib";
import { Construct } from "constructs";

interface SmtpCredentialsProviderProps {
  userArn: string;
}

export class SmtpCredentialsProvider extends Construct {
  public readonly serviceToken: string;

  public constructor(
    scope: Construct,
    id: string,
    props: SmtpCredentialsProviderProps
  ) {
    super(scope, id);
    this.serviceToken = new cr.Provider(this, "SmtpCredentialsProvider", {
      onEventHandler: new lambda.Function(this, "SmtpCredentialsFunction", {
        code: lambda.Code.fromAsset(path.join(__dirname, "../function")),
        runtime: lambda.Runtime.PYTHON_3_8,
        handler: "handler.on_event",
        initialPolicy: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ["iam:CreateAccessKey"],
            resources: [props.userArn],
          }),
        ],
      }),
      logRetention: logs.RetentionDays.ONE_DAY,
    }).serviceToken;
  }
}
