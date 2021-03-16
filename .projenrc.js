const { AwsCdkConstructLibrary, ProjectType } = require('projen');

const project = new AwsCdkConstructLibrary({
  releaseEveryCommit: false,
  name: '@charlesdotfish/smtp-credentials-cdk-construct',
  description:
    'A CDK construct that creates SMTP credentials permitting emails to be sent via SES.',
  repositoryUrl:
    'https://github.com/charlesdotfish/smtp-credentials-cdk-construct',
  author: 'Charles Salmon',
  authorAddress: 'me@charles.fish',
  license: 'MIT',
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  projectType: ProjectType.LIB,
  defaultReleaseBranch: 'main',
  cdkVersion: '1.93.0',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-logs',
    '@aws-cdk/custom-resources',
    '@aws-cdk/aws-ssm',
  ],
  devDeps: ['prettier@2.2.1'],
  publishToNuget: {
    dotNetNamespace: 'CharlesDotFish.SmtpCredentialsCdkConstruct',
    packageId: 'CharlesDotFish.SmtpCredentialsCdkConstruct',
  },
});

project.compileTask.prependExec(
  'prettier --write src test .projenrc.js && eslint --fix src/** test/** .projenrc.js',
);

project.synth();
