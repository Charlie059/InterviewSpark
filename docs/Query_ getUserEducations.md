# Query: getUserEducations

Input:

* emailAddress (required): AWSEmail! - The email address of the user whose education details are being retrieved.

Output:

* Educations - The education details of the user.

Description: The getUserEducations function retrieves the education details of the user with the given email address. It returns an Educations object that contains an array of Education objects. Each Education object contains the following fields:

* eduDegree: String - The degree earned by the user.
* eduFieldStudy: String - The field of study in which the degree was earned.
* eduSchool: String - The name of the school where the degree was earned.
* eduStartDate: AWSDate - The start date of the education program.
* eduEndDate: AWSDate - The end date of the education program.

If the specified user does not exist or has no education details associated with their account, an empty Educations object is returned.

Example Usage:

```graphql
codequery {
  getUserEducations(emailAddress: "user@example.com") {
    educations {
      eduDegree
      eduFieldStudy
      eduSchool
      eduStartDate
      eduEndDate
    }
  }
}
```

Example Response:

```json
jsonCopy code{
  "data": {
    "getUserEducations": {
      "educations": [
        {
          "eduDegree": "Bachelor's degree",
          "eduFieldStudy": "Computer Science",
          "eduSchool": "XYZ University",
          "eduStartDate": "2014-09-01",
          "eduEndDate": "2018-05-15"
        },
        {
          "eduDegree": "Master's degree",
          "eduFieldStudy": "Business Administration",
          "eduSchool": "ABC University",
          "eduStartDate": "2019-09-01",
          "eduEndDate": "2021-05-15"
        }
      ]
    }
  }
}
```

## Errors

This query may return the following errors:

* `UserNotFoundError`: The user with the given email address was not found.
* `ArgumentMissingError`: The query is missing argument
* `InternalServerError`: An internal server error occurred while processing the request.

* There is no EducationsNotFoundError, if no work histories, query will return empty array

### Pipeline

[getUserHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/e3vcju3pdzgbdozlqovta3v2ni/edit?referrer=/schema/Query/getWorkHistories/pipelineResolver)

[getWorkHistoriesHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/b4kfmtj7tffsrams37tzcrkwa4/edit?referrer=/schema/Query/getWorkHistories/pipelineResolver)
