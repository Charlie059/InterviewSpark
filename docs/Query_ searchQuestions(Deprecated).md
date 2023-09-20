# Query: searchQuestions(Deprecated)

## searchQuestions(keyword: String!): QuestionList!

The `searchQuestions` query takes a required `keyword` argument of type `String` and returns a list of `Question` objects that match the provided keyword in their `interviewQuestion` field.

Input:

* `keyword`: (required) A `String` representing the keyword to search for.

Output:

* `QuestionList`: A list of `Question` objects that match the provided keyword in their `interviewQuestion` field.

\
Example:

```graphql
query {
  searchQuestions(keyword: "leadership") {
    questionList {
      GSI1PK
      interviewQuestion
      interviewQuestionSampleAns
      interviewQuestionType
      QuestionID
      difficulty
      estimatedSecond
    }
  }
}

```

```javascript
{
  "data": {
    "searchQuestions": {
      "questionList": [
        {
          "GSI1PK": "Question#1",
          "interviewQuestion": "Can you describe a time when you demonstrated leadership?",
          "interviewQuestionSampleAns": "Yes, I led a team of 10 people during a software development project...",
          "interviewQuestionType": "STAR",
          "QuestionID": "q1",
          "difficulty": "Intermediate",
          "estimatedSecond": 90
        },
        {
          "GSI1PK": "Question#2",
          "interviewQuestion": "How do you define leadership and what qualities do you think are important for a leader?",
          "interviewQuestionSampleAns": "Leadership is the ability to guide, motivate and inspire people to achieve a common goal...",
          "interviewQuestionType": "Open Ended",
          "QuestionID": "q2",
          "difficulty": "Advanced",
          "estimatedSecond": 120
        },
        {
          "GSI1PK": "Question#5",
          "interviewQuestion": "What are some of the most effective leadership techniques you have used?",
          "interviewQuestionSampleAns": "One technique that has worked well for me is to set clear goals and expectations...",
          "interviewQuestionType": "Open Ended",
          "QuestionID": "q5",
          "difficulty": "Advanced",
          "estimatedSecond": 120
        }
      ]
    }
  }
}

```

Error:

* `InternalServerError`: An internal server error occurred while processing the request.

### Pipeline

searchInterviewQuestionsLambda
