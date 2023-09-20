# Mutation: createUserInterviewWithQuestion

## createUserInterviewWithQuestion(emailAddress: AWSEmail!, questionID: String!): Interview!

* This mutation creates an interview for the specified user, identified by their email address, using a specified question ID. The interview will be stored in the database, and the user's interview metadata will be updated accordingly.

### Input Arguments

* emailAddress (required): The email address of the user for whom the interview is being created.
* questionID (required): The ID of the question to be used for the interview.

### Return Value

The mutation returns an Interview object containing the following fields:

* interviewID: A unique identifier for the interview, generated based on the current timestamp.
* interviewDateTime: The date and time the interview was created, in ISO 8601 format.
* interviewQuestionID: The ID of the question used for the interview.
* interviewVideoKey: An empty string, which will later be populated with the video key after the user uploads their video response.
* interviewQuestion: The text of the question used for the interview.
* interviewQuestionTitle: The title of the question used for the interview.
* interviewQuestionType: The type of the question used for the interview.

### Errors

If any of the input arguments are missing or invalid, the mutation will throw an error. Possible errors include:

* QuestionNotFoundException: The question with the specified question ID could not be found.
* Error creating interview with question: An error occurred while creating the interview or updating the user's interview metadata.

### Example

To create an interview with the question ID "123" for the user with the email address "[charlie@catting.co.uk](mailto:charlie@catting.co.uk)", call the mutation like this:

```javascript
mutation {
  createUserInterviewWithQuestion(emailAddress: "charlie@catting.co.uk", questionID: "123") {
    interviewID
    interviewDateTime
    interviewQuestionID
    interviewVideoKey
    interviewQuestion
    interviewQuestionTitle
    interviewQuestionType
  }
}

```

### Pipeline

createUserInterviewWithQuestionLambda
