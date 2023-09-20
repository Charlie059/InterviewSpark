# Query: getQuestionMetaData

## getQuestionMetaData(questionID: String!): Question!

The `getQuestionMetaData` query retrieves metadata about a specific interview question identified by its ID. Here are the details:

Input:

* `questionID` (required): The ID of the interview question to retrieve metadata for.

Output:

* `GSI1PK`: The partition key for the global secondary index.
* `interviewQuestion`: The text of the interview question.
* `interviewQuestionSampleAns`: A sample answer to the interview question.
* `interviewQuestionType`: The type of the interview question (e.g., behavioral, technical).
* `QuestionID`: The ID of the interview question.
* `difficulty`: The difficulty level of the interview question.
* `estimatedSecond`: The estimated duration in seconds for the interview question.

\
Example:

```javascript
query {
  getQuestionMetaData(questionID: "abc123") {
    GSI1PK
    interviewQuestion
    interviewQuestionSampleAns
    interviewQuestionType
    QuestionID
    difficulty
    estimatedSecond
  }
}

{
  "data": {
    "getQuestionMetaData": {
      "GSI1PK": "question#abc123",
      "interviewQuestion": "What is your experience with React?",
      "interviewQuestionSampleAns": "I have worked with React for 2 years on a number of projects, including ...",
      "interviewQuestionType": "technical",
      "QuestionID": "abc123",
      "difficulty": "intermediate",
      "estimatedSecond": 120
    }
  }
}

```

Error:

* `InvalidQuestionID`: The provided question ID is not valid.
* `InternalServerError`: An internal server error occurred while processing the request.

### Pipeline

[getQuestionMetaDataHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/qr7b7du3gfd5dcyt2tov4abofy/edit?referrer=/schema/Query/getQuestionMetaData/pipelineResolver)
