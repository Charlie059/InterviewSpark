export type AmplifyDependentResourcesAttributes = {
  "api": {
    "hirebeatjobseeker": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    },
    "resumeScanAPI": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    }
  },
  "auth": {
    "HireBeatJobSeeker": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "resumeScanAPINewAmp": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "predictions": {
    "transcription5847e459": {
      "language": "string",
      "region": "string"
    }
  },
  "storage": {
    "s382ae0ffc": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}