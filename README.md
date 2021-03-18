<p align="center"><img src="https://github.com/charlesdotfish/smtp-credentials-cdk-construct/raw/main/media/logo.png" alt="Charles Dot Fish" width="400"></p>

# SMTP Credentials CDK Construct

[![Release Pipeline](https://github.com/charlesdotfish/smtp-credentials-cdk-construct/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/charlesdotfish/smtp-credentials-cdk-construct/actions/workflows/release.yml?branch=main)
[![Code Coverage](https://codecov.io/gh/charlesdotfish/smtp-credentials-cdk-construct/branch/main/graph/badge.svg?token=3NXG4QMJRM)](https://codecov.io/gh/charlesdotfish/smtp-credentials-cdk-construct)
[![GitHub Issues](https://img.shields.io/github/issues/charlesdotfish/smtp-credentials-cdk-construct.svg)](https://github.com/charlesdotfish/smtp-credentials-cdk-construct/issues/)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/charlesdotfish/smtp-credentials-cdk-construct.svg)](https://github.com/charlesdotfish/smtp-credentials-cdk-construct/pulls/)

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

See more details at maven.org: https://search.maven.org/artifact/fish.charles.cdk-constructs/smtp-credentials-cdk-construct

## Example Usage

See [API.md](https://github.com/charlesdotfish/smtp-credentials-cdk-construct/blob/main/API.md) for details on the exposed API.

```typescript
new SmtpCredentials(this, 'SmtpCredentials', {
    emailAddress: 'me@charles.fish',
});
```