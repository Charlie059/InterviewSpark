# Query: getUser

## `getUser(emailAddress: AWSEmail!)`

This query returns a `User` object with the given email address.

### Input

* `emailAddress: AWSEmail!`: The email address of the user to retrieve.

### Output

* `User`: An object representing the user with the given email address.
* `userEmailAddress: AWSEmail!`: The email address of the user.
* `userRole: String!`: The role of the user (e.g. "admin", "guest").
* `userName: String!`: The name of the user.
* `hasProfile: Boolean!`: Whether or not the user has created a profile.
* `allowPublicInterview: Boolean!`: Whether or not the user allows public access to their interview responses.

#### Example

```graphql
query GetUser {
  getUser(emailAddress: "user@example.com") {
    userEmailAddress
    userRole
    userName
    hasProfile
    allowPublicInterview
  }
}
```

#### Errors

This query may return the following errors:

* `UserNotFoundError`: The user with the given email address was not found.
* `ArgumentMissingError`: The query is missing argument
* `InternalServerError`: An internal server error occurred while processing the request.

#### Pipeline

[getUserHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/e3vcju3pdzgbdozlqovta3v2ni/edit?referrer=/schema/Query/getWorkHistories/pipelineResolver)
