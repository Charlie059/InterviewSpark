# Mutation: createUserResumeScan

## createUserResumeScan( emailAddress: AWSEmail!, resumeUrl: AWSURL!, displayName: String!, jobName: String!, resumeName: String!, resumeResults: String! ): ResumeScan!

* This mutation creates a resume scan for the specified user, identified by their email address. The resume scan will be stored in the database.

### Input Arguments

* emailAddress (required): The email address of the user for whom the resume scan is being created.
* resumeUrl (required): The URL of the resume to be scanned. displayName (required): The display name of the user.
* jobName (required): The name of the job for which the resume is being scanned. resumeName (required): The name of the resume.
* resumeResults (required): The results of the resume scan.

### Return Value

The mutation returns a ResumeScan object containing the following fields:

displayName: The display name of the user.

jobName: The name of the job for which the resume is being scanned.

resumeName: The name of the resume.

resumeResults: The results of the resume scan.

resumeUrl: The URL of the resume to be scanned.

resumeScanID: Id

### Errors

If any of the input arguments are missing or invalid, the mutation will throw an error. Possible errors include: Error creating resume scan: An error occurred while creating the resume scan in the database.

### Example

To create a resume scan for the user with the email address [charlie@catting.co.uk](mailto:charlie@catting.co.uk), call the mutation like this:

```javascript
mutation {
  createUserResumeScan(emailAddress: "charlie@catting.co.uk", resumeUrl: "https://s3.example.com/resumes/charlie_resume.pdf", displayName: "Charlie Catting", jobName: "Software Engineer", resumeName: "Charlie's Resume", resumeResults: "XXX") {
    displayName
    jobName
    resumeName
    resumeResults
    resumeUrl
    resumeScanID
  }
}
```

### Pipeline

createUserResumeScanLambda
