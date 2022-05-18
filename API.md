# API Reference

**Classes**

Name|Description
----|-----------
[SmtpCredentials](#charlesdotfish-smtp-credentials-cdk-construct-smtpcredentials)|This construct creates an IAM user, with a policy permitting emails to be sent via SES from a specified email address, creates an access key associated with this user, and converts the access key to SMTP credentials.


**Structs**

Name|Description
----|-----------
[SmtpCredentialsProps](#charlesdotfish-smtp-credentials-cdk-construct-smtpcredentialsprops)|This struct provides the configuration required to construct an instance of @see SmtpCredentials.



## class SmtpCredentials  <a id="charlesdotfish-smtp-credentials-cdk-construct-smtpcredentials"></a>

This construct creates an IAM user, with a policy permitting emails to be sent via SES from a specified email address, creates an access key associated with this user, and converts the access key to SMTP credentials.

The generated SMTP credentials are stored as a parameter in Parameter Store, and the name of
this parameter is output as a CloudFormation output. The parameter may be safely deleted, once
the credentials have been accessed.

__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new SmtpCredentials(scope: Construct, id: string, props: SmtpCredentialsProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  A reference to the stack which this construct will be created in.
* **id** (<code>string</code>)  A unique identifier, within the context that this construct is created.
* **props** (<code>[SmtpCredentialsProps](#charlesdotfish-smtp-credentials-cdk-construct-smtpcredentialsprops)</code>)  Configuration defining how this construct should be created.
  * **emailAddress** (<code>string</code>)  The email address that the generated SMTP credentials will permit emails to be sent from. 




## struct SmtpCredentialsProps  <a id="charlesdotfish-smtp-credentials-cdk-construct-smtpcredentialsprops"></a>


This struct provides the configuration required to construct an instance of @see SmtpCredentials.



Name | Type | Description 
-----|------|-------------
**emailAddress** | <code>string</code> | The email address that the generated SMTP credentials will permit emails to be sent from.



