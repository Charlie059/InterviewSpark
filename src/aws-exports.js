/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
  aws_project_region: 'us-east-1',
  aws_cognito_identity_pool_id: 'us-east-1:c8cedbc0-477f-45b0-ad30-83cffb5e77fb',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_ndFPxkTt9',
  aws_user_pools_web_client_id: '30ppesp9kkckpgq19fo50i54f6',
  oauth: {
    domain: 'm9vaaf8flez5-staging.auth.us-east-1.amazoncognito.com',
    scope: ['phone', 'email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
    redirectSignIn: 'http://localhost:3000/profile',
    redirectSignOut: 'http://localhost:3000/profile',
    responseType: 'code'
  },
  federationTarget: 'COGNITO_USER_POOLS',
  aws_cognito_username_attributes: ['EMAIL'],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ['EMAIL'],
  aws_cognito_mfa_configuration: 'OFF',
  aws_cognito_mfa_types: ['SMS'],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: ['REQUIRES_LOWERCASE', 'REQUIRES_NUMBERS']
  },
  aws_cognito_verification_mechanisms: ['EMAIL'],
  aws_user_files_s3_bucket: 'hirebeatjobseeker1113247a97c74b96852b04e522510162908-staging',
  aws_user_files_s3_bucket_region: 'us-east-1'
}

export default awsmobile
