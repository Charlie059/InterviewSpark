# Mutation: removeUserInterviewsByID

## removeUserInterviewsByID

This mutation removes an interview that belongs to the specified user, identified by their email address. To remove an interview, you must provide the ID of the interview and the ID of the interview question.

* This function is not remove the s3 file, for now, need to use amplify to remove due to security settings

```javascript
coderemoveUserInterviewsByID(
  emailAddress: AWSEmail!,
  interviewID: String!,
  interviewQuestionID: String!
): OperationResult!
```

### Input Arguments

* `emailAddress` (**required**): The email address of the user that owns the interview to be removed.
* `interviewID` (**required**): The ID of the interview to be removed.
* `interviewQuestionID` (**required**): The ID of the interview question within the interview to be removed.

### Return Value

The mutation returns an `OperationResult` object that indicates whether the operation was successful. If the removal is successful, the `isSuccessful` field of the `OperationResult` object will be `true`. Otherwise, it will be `false`.

### Errors

If any of the input arguments are missing or invalid, the mutation will throw an error. Possible errors include:

* `UserNotFoundException`: The user with the specified email address could not be found.
* `OperationFailedException`: The removal operation failed for some other reason.

### Pipeline

removeInterviewLambda
