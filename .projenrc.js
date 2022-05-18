const { awscdk, javascript, release } = require("projen");

const project = new awscdk.AwsCdkConstructLibrary({
  name: "@charlesdotfish/smtp-credentials-cdk-construct",
  description:
    "A CDK construct that creates SMTP credentials permitting emails to be sent via SES.",
  keywords: ["aws", "cdk", "constructs", "smtp credentials"],
  repositoryUrl:
    "https://github.com/charlesdotfish/smtp-credentials-cdk-construct",
  author: "Charles Salmon",
  authorAddress: "me@charles.fish",
  license: "MIT",
  catalog: {
    twitter: "charlesdotfish",
  },
  npmAccess: javascript.NpmAccess.PUBLIC,
  minNodeVersion: "12.7.0",
  defaultReleaseBranch: "main",
  releaseTrigger: release.ReleaseTrigger.continuous(),
  cdkVersion: "2.24.1",
  eslintOptions: {
    prettier: true,
  },
  codeCov: true,
  publishToNuget: {
    dotNetNamespace: "CharlesDotFish.CdkConstructs.SmtpCredentials",
    packageId: "CharlesDotFish.CdkConstructs.SmtpCredentials",
  },
  publishToMaven: {
    javaPackage: "fish.charles.cdk.smtp.credentials.construct",
    mavenGroupId: "fish.charles.cdk-constructs",
    mavenArtifactId: "smtp-credentials-cdk-construct",
    mavenEndpoint: "https://s01.oss.sonatype.org",
  },
  publishToPypi: {
    distName: "smtp-credentials-cdk-construct",
    module: "smtp_credentials",
  },
});

project.synth();
