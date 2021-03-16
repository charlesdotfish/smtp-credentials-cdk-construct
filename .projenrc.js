const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  author: 'Charles Salmon',
  authorAddress: 'me@charles.fish',
  cdkVersion: '1.93.0',
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  name: 'smtp-credentials-cdk-construct',
  repositoryUrl: 'https://github.com/me/smtp-credentials-cdk-construct.git',
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
});

project.compileTask.prependExec('eslint --fix src/** test/** .projenrc.js');
project.compileTask.prependExec('prettier --write src test .projenrc.js');

project.synth();
