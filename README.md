<p align="center"><img src="https://github.com/charlesdotfish/smtp-credentials-cdk-construct/raw/main/media/logo.png" alt="Charles Dot Fish" width="400"></p>

# SMTP Credentials CDK Construct

This construct creates an IAM user, with a policy permitting emails to be sent via SES from a specified email address, creates an access key associated with this user, and converts the access key to SMTP credentials.

The generated SMTP credentials are stored as a parameter in Parameter Store, and the name of this parameter is output as a CloudFormation output. The parameter may be safely deleted, once the credentials have been accessed.

## Example Usage

See [API.md](https://github.com/charlesdotfish/smtp-credentials-cdk-construct/blob/main/API.md) for details on the exposed API.

```typescript
new SmtpCredentials(this, 'SmtpCredentials', {
    emailAddress: 'me@charles.fish',
});
```