import os
import hmac
import hashlib
import base64
import boto3

DATE = "11111111"
SERVICE = "ses"
MESSAGE = "SendRawEmail"
TERMINAL = "aws4_request"
VERSION = 0x04

iam = boto3.client('iam')

def on_event(event, context):
    request_type = event['RequestType']
    print(f'Request of type \'{request_type}\' received')

    if request_type == 'Create':
        user_name = event['ResourceProperties']['UserName']

        print(f'Creating programmatic access key for IAM user with username \'{user_name}\'')
        response = iam.create_access_key(UserName=user_name)

        access_key = response['AccessKey']['AccessKeyId']
        secret_access_key = response['AccessKey']['SecretAccessKey']
        region = os.environ['AWS_REGION']

        smtp_password = calculate_smtp_password(secret_access_key, region)

        return {
            'PhysicalResourceId': user_name,
            'Data': {
                'AccessKey': access_key,
                'SmtpPassword': smtp_password
            }
        }
    
    if request_type == 'Update':
        print('Access key has already been provisioned, no operation to be performed')
    
    if request_type == 'Delete':
        print('No operation required, deletion of this resource is assumed to occur in conjunction with deletion of an IAM user')

def calculate_smtp_password(secret_access_key, region):
    signature = sign(("AWS4" + secret_access_key).encode('utf-8'), DATE)
    signature = sign(signature, region)
    signature = sign(signature, SERVICE)
    signature = sign(signature, TERMINAL)
    signature = sign(signature, MESSAGE)
    signature_and_version = bytes([VERSION]) + signature
    smtp_password = base64.b64encode(signature_and_version)
    return smtp_password.decode('utf-8')

def sign(key, msg):
    return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()