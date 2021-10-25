const { AwsCdkConstructLibrary, NpmAccess } = require('projen');

const project = new AwsCdkConstructLibrary({
  name: '@charlesdotfish/smtp-credentials-cdk-construct',
  description:
    'A CDK construct that creates SMTP credentials permitting emails to be sent via SES.',
  keywords: ['aws', 'cdk', 'constructs', 'smtp credentials'],
  repositoryUrl:
    'https://github.com/charlesdotfish/smtp-credentials-cdk-construct',
  author: 'Charles Salmon',
  authorAddress: 'me@charles.fish',
  license: 'MIT',
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  catalog: {
    twitter: 'charlesdotfish',
  },
  npmAccess: NpmAccess.PUBLIC,
  defaultReleaseBranch: 'main',
  releaseEveryCommit: false,
  cdkVersion: '1.111.0',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-logs',
    '@aws-cdk/custom-resources',
    '@aws-cdk/aws-ssm',
  ],
  devDeps: ['prettier@2.2.1'],
  codeCov: true,
  publishToNuget: {
    dotNetNamespace: 'CharlesDotFish.CdkConstructs.SmtpCredentials',
    packageId: 'CharlesDotFish.CdkConstructs.SmtpCredentials',
  },
  publishToMaven: {
    javaPackage: 'fish.charles.cdk.smtp.credentials.construct',
    mavenGroupId: 'fish.charles.cdk-constructs',
    mavenArtifactId: 'smtp-credentials-cdk-construct',
    mavenEndpoint: 'https://s01.oss.sonatype.org',
  },
  publishToPypi: {
    distName: 'smtp-credentials-cdk-construct',
    module: 'smtp_credentials',
  },
});

project.compileTask.prependExec(
  'prettier --write src test .projenrc.js && eslint --fix src/** test/** .projenrc.js',
);

project.synth();
