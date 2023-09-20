# Mutation: updateUserResumeScanURL

## updateUserResumeScanURL(emailAddress: AWSEmail!, resumeID: String!, resumeUrl: AWSURL!): ResumeScan!

* This mutation updates the resume URL for the specified user's resume scan, identified by their email address and resume ID. The updated resume scan will be stored in the database.

### Input Arguments

* emailAddress (required): The email address of the user for whom the resume scan is being updated.
* resumeID (required): The ID of the resume scan to be updated.
* resumeUrl (required): The new URL of the resume to be scanned.

### Return Value

The mutation returns a ResumeScan object containing the following fields:

displayName: The display name of the user.

jobName: The name of the job for which the resume is being scanned.

resumeName: The name of the resume.

resumeResults: The results of the resume scan.

resumeUrl: The URL of the resume to be scanned.

resumeScanID: Id

#### Example

```javascript
mutation {
  updateUserResumeScanURL(emailAddress: "charlie@catting.co.uk", resumeID: "1234", resumeUrl: "https://s3.example.com/resumes/charlie_updated_resume.pdf") {
    displayName
    jobName
    resumeName
    resumeResults
    resumeUrl
    resumeScanID
  }
}
```

#### Pipeline

updateUserResumeScanURLLambda
