# Mutation: createNewGuestUser

## createNewGuestUser(emailAddress: AWSEmail!, userName: String): OperationResult!

> This mutation creates a new guest user with the specified email address and username. It checks if the user already exists and, if not, creates a new user entry in the database, an empty profile entry, and an initial interview metadata entry.

createNewGuestUser( emailAddress: AWSEmail!, userName: String! ): OperationResult!

### Input Arguments

emailAddress (required): The email address of the new guest user.

userName (required): The username of the new guest user.

### Return Value

The mutation returns an OperationResult object that indicates whether the operation was successful. If the creation is successful, the isSuccessful field of the OperationResult object will be true. Otherwise, it will be false.

### Errors

If any of the input arguments are missing or invalid, the mutation will throw an error. Possible errors include: UserAlreadyExistsException: The user with the specified email address already exists. OperationFailedException: The creation operation failed for some other reason.

### Pipeline

### createNewGuestUserLambda
