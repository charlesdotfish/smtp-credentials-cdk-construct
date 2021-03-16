<p align="center"><img src="https://github.com/charlesdotfish/smtp-credentials-cdk-construct/raw/main/media/logo.png" alt="Charles Dot Fish" width="400"></p>

# SMTP Credentials CDK Construct

This construct creates an IAM user, with a policy permitting emails to be sent via SES from a specified email address, creates an access key associated with this user, and converts the access key to SMTP credentials.

The generated SMTP credentials are stored as a parameter in Parameter Store, and the name of this parameter is output as a CloudFormation output. The parameter may be safely deleted, once the credentials have been accessed.

## Installation

### JavaScript / TypeScript (npm / Yarn)

```bash
# npm
npm i -D @charlesdotfish/smtp-credentials-cdk-construct

# Yarn
yarn add -D @charlesdotfish/smtp-credentials-cdk-construct
```

See more details at npmjs.com: https://www.npmjs.com/package/@charlesdotfish/smtp-credentials-cdk-construct

### C# / .NET (NuGet)

```bash
dotnet add package CharlesDotFish.CdkConstructs.SmtpCredentials
```

See more details at nuget.org: https://www.nuget.org/packages/CharlesDotFish.CdkConstructs.SmtpCredentials/

### Python (pip)

```bash
pip install smtp-credentials-cdk-construct
```

See more details at pypi.org: https://pypi.org/project/smtp-credentials-cdk-construct/

### Java (Maven)

```xml
<dependency>
  <groupId>fish.charles.cdk-constructs</groupId>
  <artifactId>smtp-credentials-cdk-construct</artifactId>
  <version>1.0</version>
</dependency>
```

This package has not yet been indexed into the Maven Central repository. In the interim, you will find more details here: https://s01.oss.sonatype.org/#nexus-search;quick~smtp-credentials-cdk-construct

## Example Usage

See [API.md](https://github.com/charlesdotfish/smtp-credentials-cdk-construct/blob/main/API.md) for details on the exposed API.

```typescript
new SmtpCredentials(this, 'SmtpCredentials', {
    emailAddress: 'me@charles.fish',
});
```