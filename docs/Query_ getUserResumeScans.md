# Query: getUserResumeScans

This query retrieves all resume scans for the specified user, identified by their email address. The results will be returned as a list of ResumeScan objects.

## Input

* emailAddress (required): The email address of the user for whom the resume scans are being retrieved.

## Output

The query returns a ResumeScanList object containing the following field: resumeScanList: An array of ResumeScan objects, each containing the following fields:

* displayName: The display name of the user.
* jobName: The name of the job for which the resume is being scanned.
* resumeName: The name of the resume.
* resumeResults: The results of the resume scan.
* resumeUrl: The URL of the resume to be scanned.
* resumeScanID: The unique identifier of the resume scan.

### Errors

If the input argument is missing or invalid, the query will throw an error. Possible errors include: Error getting user resume scans: An error occurred while retrieving the user's resume scans from the database.

### Example

```graphql
query {
  getUserResumeScans(emailAddress: "charlie@catting.co.uk") {
    resumeScanList {
      displayName
      jobName
      resumeName
      resumeResults
      resumeUrl
      resumeScanID
    }
  }
}
```

#### Pipeline

getUserResumeScansLambda
