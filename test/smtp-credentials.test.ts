import {
  arrayWith,
  expect as expectCDK,
  haveResource,
  haveResourceLike,
  stringLike,
} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';

import { SmtpCredentials } from '../src';

describe('SmtpCredentials', () => {
  const emailAddress = 'me@charles.fish';
  const invalidEmailAddress = 'charles.fish';
  const domainName = 'charles.fish';

  test('creates an IAM user', () => {
    // Arrange
    const stack = new cdk.Stack();

    // Act
    new SmtpCredentials(stack, 'SmtpCredentials', {
      emailAddress,
    });

    // Assert
    expectCDK(stack).to(haveResource('AWS::IAM::User'));
  });

  test('creates an IAM policy with permissions to send email', () => {
    // Arrange
    const stack = new cdk.Stack();

    // Act
    new SmtpCredentials(stack, 'SmtpCredentials', {
      emailAddress,
    });

    // Assert
    expectCDK(stack).to(
      haveResourceLike('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: [
            {
              Action: 'ses:SendRawEmail',
              Condition: {
                StringEquals: {
                  'ses:FromAddress': emailAddress,
                },
              },
              Effect: 'Allow',
              Resource: stringLike(`*${domainName}`),
            },
          ],
        },
      }),
    );
  });

  test('provides a validation error if an invalid email address is supplied', () => {
    // Arrange
    const stack = new cdk.Stack();

    // Act, Assert
    expect(() => {
      new SmtpCredentials(stack, 'SmtpCredentials', {
        emailAddress: invalidEmailAddress,
      });
    }).toThrowError(/Invalid email address/);
  });

  test('creates a parameter containing the SMTP credentials', () => {
    // Arrange
    const stack = new cdk.Stack();

    // Act
    new SmtpCredentials(stack, 'SmtpCredentials', {
      emailAddress,
    });

    // Assert
    expectCDK(stack).to(
      haveResourceLike('AWS::SSM::Parameter', {
        Type: 'String',
        Value: {
          'Fn::Join': arrayWith(
            arrayWith(stringLike('*AccessKey*'), stringLike('*SmtpPassword*')),
          ),
        },
      }),
    );
  });
});
