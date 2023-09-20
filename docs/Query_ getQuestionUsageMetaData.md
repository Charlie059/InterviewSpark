# Query: getQuestionUsageMetaData

## getQuestionUsageMetaData: QuestionUsageMetaData!

The `getQuestionUsageMetaData` query retrieves metadata about the usage of interview questions in the system.

## Input

This query does not take any input.

## Output

The query returns a `QuestionUsageMetaData` object.

`QuestionUsageMetaData`:

* `totalNumOfQuestion`: An integer representing the total number of questions in the system.

Example

```graphql
query GetQuestionUsageMetaData {
  getQuestionUsageMetaData {
    totalNumOfQuestion
  }
}

```

Errors This query may return the following errors:

* `DataNotFoundError`: Data was not found.
* `InternalServerError`: An internal server error occurred while processing the request.

### Pipeline

[getUserHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/e3vcju3pdzgbdozlqovta3v2ni/edit?referrer=/schema/Query/getUserInterviewUsageMetaData/pipelineResolver)

[getUserInterviewUsageMetaDataHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/urwkguhfabfgnkmm6i55subgdq/edit?referrer=/schema/Query/getUserInterviewUsageMetaData/pipelineResolver)
