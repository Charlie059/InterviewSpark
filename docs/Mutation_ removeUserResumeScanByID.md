# Mutation: removeUserResumeScanByID

## removeUserResumeScanByID(emailAddress: AWSEmail!, resumeScanID: String!): OperationResult!

* This mutation removes a user's resume scan, identified by their email address and resume scan ID. The resume scan will be deleted from the database.

### Input Arguments

* email A emailAddress (required): The email address of the user for whom the resume scan is being removed.
* resumeScanID (required): The ID of the resume scan to be removed.

### Return Value

The mutation returns an OperationResult object containing the following fields:

isSuccessful: A boolean value indicating whether the operation was successful or not.

error: An optional string describing the error, if the operation failed.

#### Errors

If any of the input arguments are missing or invalid, the mutation will throw an error.

Possible errors include: Error removing user resume scan by ID: An error occurred while removing the user's resume scan from the database.

#### Example

```javascript
mutation {
  removeUserResumeScanByID(emailAddress: "charlie@catting.co.uk", resumeScanID: "1234") {
    isSuccessful
    error
  }
}
```

#### Pipeline

removeUserResumeScanByID
