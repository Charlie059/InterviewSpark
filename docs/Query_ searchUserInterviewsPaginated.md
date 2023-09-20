# Query: searchUserInterviewsPaginated

The `searchUserInterviewsPaginated` query takes in an `emailAddress` of type `AWSEmail` and a `keyword` of type `String` as required arguments. It also takes in an optional `limit` of type `Int` and a `nextToken` of type `String`. It returns a `PaginatedInterviewList` object.

* This function is inefficient, and may be replaced in future versions.

## Input

* `emailAddress` (required): An email address of the user for whom the interviews are being searched.
* `keyword` (required): The keyword to be used for searching the interviews.
* `limit` (optional): An integer representing the maximum number of items to return in the response.
* `nextToken` (optional): A string token returned in the response of the previous call to the same API, which can be used to retrieve the next page of results.

## Output

* `interviewList`: An array of `Interview` objects containing the details of the interviews matching the given `keyword` search.
* `nextToken`: A string token representing the pagination state for the next page of results.
* `totalRecords`: An integer representing the total number of records returned in the response.

\
Example:

```graphql
query {
  searchUserInterviewsPaginated(emailAddress: "testuser@example.com", keyword: "Python", limit: 10, nextToken: "abc123") {
    interviewList {
      interviewID
      interviewDateTime
      interviewQuestion
      interviewQuestionType
      interviewVideoKey
    }
    nextToken
    totalRecords
  }
}

```

Error:

* If an error occurs, the server will return an error response with an appropriate status code and message.

### Pipeline

searchInterviewPaginatedQuestionsLambda
