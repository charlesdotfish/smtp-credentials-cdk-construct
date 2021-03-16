const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  name: '@charlesdotfish/smtp-credentials-cdk-construct',
  description: 'A CDK construct that creates SMTP credentials permitting emails to be sent via SES.',
  repositoryUrl: 'https://github.com/charlesdotfish/smtp-credentials-cdk-construct',
  author: 'Charles Salmon',
  authorAddress: 'me@charles.fish',
  cdkVersion: '1.93.0',
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-logs',
    '@aws-cdk/custom-resources',
    '@aws-cdk/aws-ssm',
  ],
  devDeps: ['prettier@2.2.1'],
  license: 'MIT',
  releaseEveryCommit: false,
});

project.compileTask.prependExec('eslint --fix src/** test/** .projenrc.js');
project.compileTask.prependExec('prettier --write src test .projenrc.js');

project.synth();
