# Query: getUserProfile

## `getUserProfile(emailAddress: AWSEmail!)`

This query returns a `Profile` object associated with the given email address.

### Input

* `emailAddress: AWSEmail!`: The email address of the user whose profile should be retrieved.

### Output

* `Profile`: An object representing the user's profile.

**`Profile` Fields**

* `fName: String`: The first name of the user.
* `lName: String`: The last name of the user.
* `photoImgURL: AWSURL`: The key to the photo of the user's profile.
* `coverImgURL: AWSURL`: The key to the cover image of the user's profile.
* `resumeKey: String`: The key to the resume of the user's profile.
* `addressLine1: String`: The first line of the user's address.
* `addressLine2: String`: The second line of the user's address.
* `city: String`: The city of the user's address.
* `state: String`: The state of the user's address.
* `postalCode: String`: The postal code of the user's address.
* `country: String`: The country of the user's address.
* `joiningDate: AWSDate`: The date the user joined the platform.
* `contact: AWSPhone`: The phone number of the user.

#### Example

```graphql
query GetProfile {
  getUserProfile(emailAddress: "user@example.com") {
    fName
    lName
    photoImgKey
    coverImgKey
    resumeKey
    addressLine1
    addressLine2
    city
    state
    postalCode
    country
    joiningDate
    contact
  }
}
```

#### Errors

This query may return the following errors:

* `UserNotFoundError`: The user with the given email address was not found.
* `ArgumentMissingError`: The query is missing argument
* `ProfileNotFoundError`: The profile for the user with the given email address was not found.
* `InternalServerError`: An internal server error occurred while processing the request.

#### Pipeline

[getUserHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/e3vcju3pdzgbdozlqovta3v2ni/edit?referrer=/schema/Query/getProfile/pipelineResolver)

[getProfileHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/lme7uzmcwrespnyqn3bpswleny/edit?referrer=/schema/Query/getProfile/pipelineResolver)
