# Query: getQuestionsPaginated

## getQuestionsPaginated(limit: Int, nextToken: String): PaginatedQuestionList!

The `getQuestionsPaginated` query retrieves a paginated list of interview questions.

### Input

* `limit` (optional): An integer representing the maximum number of items to return in the response. If not provided, a default limit will be used.
* `nextToken` (optional): A string token returned from a previous paginated query. Use this to retrieve the next set of results.

### Output

* `questionList`: An array of `Question` objects.
* `nextToken` (optional): A string token used to retrieve the next set of results.
* `totalRecords`: An integer representing the total number of interview questions in the system.

\
Example:

Input:

```JSON
{
  "limit": 5,
  "nextToken": "eyJib3RvX3R5cGUiOiJzZWFyY2hfcGFnZSIsInN0YXRlIjoiMjAyMy0xMi0wNVQwMDo1NDo1MC4wMDAwMDArMDA6MDAiLCJkYXRlIjoiMjAyMy0xMi0wNVQwMDo1NDo1MC4wMDAwMDArMDA6MDAiLCJzdWNjZXNzIjoiMTIzNDU2Nzg5MCJ9"
}

```

Output:

```JSON
{
  "questionList": [
    {
      "GSI1PK": "question#80b774f0-1c56-11ec-9826-41ca3e61e3f7",
      "interviewQuestion": "What experience do you have working in a team environment?",
      "interviewQuestionSampleAns": "I have worked in teams throughout my academic and professional career. My most recent experience was working on a team project for a client where I had to collaborate with team members in different departments. We had to coordinate our work and ensure that we met our deadlines. I was able to successfully communicate and delegate tasks to team members and we delivered the project on time.",
      "interviewQuestionType": "text",
      "QuestionID": "80b774f0-1c56-11ec-9826-41ca3e61e3f7",
      "difficulty": "Intermediate",
      "estimatedSecond": 60
    },
    {
      "GSI1PK": "question#5a09f5f0-1c56-11ec-9826-41ca3e61e3f7",
      "interviewQuestion": "Tell me about a project you worked on that required you to be innovative or creative.",
      "interviewQuestionSampleAns": "I once worked on a project for a client who was launching a new product. They wanted an innovative way to promote it, so I suggested creating a social media campaign that included interactive elements such as quizzes and polls. The campaign was very successful and the client was very happy with the results. We were able to generate a lot of buzz around the product and it helped to increase sales.",
      "interviewQuestionType": "text",
      "QuestionID": "5a09f5f0-1c56-11ec-9826-41ca3e61e3f7",
      "difficulty": "Intermediate",
      "estimatedSecond": 90
    },
    {
      "GSI1PK": "question#6c4cb5c0-1c56-11ec-9826-41ca3e61e3f7",
      "interviewQuestion": "What motivated you to apply for this job?",
    }
  ]
}

```

Error:

* `InternalServerError`: An internal server error occurred while processing the request.

#### Pipeline

[getQuestionListWithPagedHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/2puwxshnjrcrtgwwn34wasrye4/edit?referrer=/schema/Query/getQuestionsPaginated/pipelineResolver)

[getNumOfQuestionHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/4sjtniqjtzamtckofohnjkl2wi/edit?referrer=/schema/Query/getQuestionsPaginated/pipelineResolver)
