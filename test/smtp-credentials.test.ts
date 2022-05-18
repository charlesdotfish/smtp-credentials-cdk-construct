import { Stack } from "aws-cdk-lib";
import { Template, Match } from "aws-cdk-lib/assertions";

import { SmtpCredentials } from "../src";

describe("SmtpCredentials", () => {
  const emailAddress = "me@charles.fish";
  const invalidEmailAddress = "charles.fish";
  const domainName = "charles.fish";

  test("creates an IAM user", () => {
    // Arrange
    const stack = new Stack();

    // Act
    new SmtpCredentials(stack, "SmtpCredentials", {
      emailAddress,
    });

    // Assert
    Template.fromStack(stack).hasResourceProperties("AWS::IAM::User", {});
  });

  test("creates an IAM policy with permissions to send email", () => {
    // Arrange
    const stack = new Stack();

    // Act
    new SmtpCredentials(stack, "SmtpCredentials", {
      emailAddress,
    });

    // Assert
    Template.fromStack(stack).hasResourceProperties("AWS::IAM::Policy", {
      PolicyDocument: {
        Statement: [
          {
            Action: "ses:SendRawEmail",
            Condition: {
              StringEquals: {
                "ses:FromAddress": emailAddress,
              },
            },
            Effect: "Allow",
            Resource: Match.stringLikeRegexp(`.*${domainName}`),
          },
        ],
      },
    });
  });

  test("provides a validation error if an invalid email address is supplied", () => {
    // Arrange
    const stack = new Stack();

    // Act, Assert
    expect(() => {
      new SmtpCredentials(stack, "SmtpCredentials", {
        emailAddress: invalidEmailAddress,
      });
    }).toThrowError(/Invalid email address/);
  });

  test("creates a parameter containing the SMTP credentials", () => {
    // Arrange
    const stack = new Stack();

    // Act
    new SmtpCredentials(stack, "SmtpCredentials", {
      emailAddress,
    });

    // Assert
    Template.fromStack(stack).hasResourceProperties("AWS::SSM::Parameter", {
      Type: "String",
      Value: {
        "Fn::Join": Match.arrayWith([
          Match.arrayWith([
            Match.stringLikeRegexp(".*AccessKey.*"),
            Match.stringLikeRegexp(".*SmtpPassword.*"),
          ]),
        ]),
      },
    });
  });
});
