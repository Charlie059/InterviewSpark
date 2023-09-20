# Mixpanel API Integration for InterviewSpark

## Table of Contents

- [Mixpanel API Integration for InterviewSpark](#mixpanel-api-integration-for-interviewspark)
  - [Table of Contents](#table-of-contents)
    - [Introduction](#introduction)
    - [Standard Mixpanel Usage](#standard-mixpanel-usage)
      - [Event Tracking](#event-tracking)
      - [User Profile Management](#user-profile-management)
    - [Wrapper by Lambda + GraphQL](#wrapper-by-lambda--graphql)
      - [Lambda function](#lambda-function)
      - [GraphQL for Invocation](#graphql-for-invocation)
    - [User Profile for Mixpanel Integration](#user-profile-for-mixpanel-integration)
    - [Event List for Mixpanel Integration](#event-list-for-mixpanel-integration)

### Introduction

At the core, Mixpanel is an advanced analytics platform allowing companies to understand user interactions within web and mobile applications. It provides two main functions: `mixpanel.track` for event tracking and `mixpanel.people.set` for user profile management.

### Standard Mixpanel Usage

#### Event Tracking

This function captures specific user interactions or events.

```javascript
mixpanel.track('event_name', {
    property1: 'value1',
    property2: 'value2'
});
```

#### User Profile Management

This allows you to manage and update user-specific data.

```javascript
mixpanel.people.set('unique_id', {
    $first_name: 'Name',
    $last_name: 'Surname',
    custom_attribute: 'value'
});
```

The `$`-prefixed properties are Mixpanel's reserved properties, ensuring consistent data analytics.

### Wrapper by Lambda + GraphQL

To integrate Mixpanel into InterviewSpark and achieve serverless scalability and ease of invocation, we encapsulated Mixpanel's functionalities within an AWS Lambda function. This provides a decoupled, efficient, and scalable way of integrating Mixpanel without directly embedding it into our primary application.

#### Lambda function

```javascript
// handleMixpanelEventLambda
const MIX_PANEL_TOKEN = process.env.MIX_PANEL_TOKEN;

const Mixpanel = require('mixpanel');
const util = require('util');

const mixpanel = Mixpanel.init(MIX_PANEL_TOKEN);

const trackAsync = util.promisify(mixpanel.track);

const peopleSetAsync = (id, data) => {
  return new Promise((resolve, reject) => {
    mixpanel.people.set(id, data, function (err) {
      if (err) throw err;
      resolve();
    });
  });
};

exports.handler = async (event) => {
  const email = event.userEmail;
  const data = event.data;
  const eventType = event.eventType;
  
  console.log(email);
  console.log(data);
  console.log(eventType);
  console.log(data.eventName);
  
  const response = {
        isSuccessful: true,
        error: null,
        info: null
  };
  
  if (eventType === 'trackEvent'){
    await trackAsync(data.eventName, {
      distinct_id: email,
      ...data.eventParams
    });
  } else if (eventType === 'setPeople') {
    await peopleSetAsync(email, {
      ...data,
      $distinct_id:email
    });
  }
  
  
  return response;
};

```

#### GraphQL for Invocation

Instead of direct API calls, we utilize GraphQL to interact with our Lambda function. This ensures a more structured and predictable way of fetching or updating data.

Here's the code:

```graphql
type OperationResult {
isSuccessful: Boolean!
error: String
info: AWSJSON
}

handleMixpanelEvent(userEmail: AWSEmail!, data: AWSJSON!, eventType: String!): OperationResult!
```

By doing this, we abstract away the underlying complexities of direct Mixpanel API interactions and provide developers with a streamlined and unified GraphQL interface.

### User Profile for Mixpanel Integration

| Prop                   | Description                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| **$first\_name**       | The first name of the user.                                                 |
| **$last\_name**        | The last name of the user.                                                  |
| **$email**             | The email address of the user.                                              |
| **user\_name**         | The chosen username or handle for the user on the platform.                 |
| **address\_line1**     | The primary line of the user's address, usually the street name and number. |
| **address\_line2**     | The secondary line of the user's address, like apartment or suite number.   |
| **city**               | The city in which the user resides.                                         |
| **contact**            | The primary contact number or mobile number of the user.                    |
| **country**            | The country of the user's residence.                                        |
| **postal\_code**       | The postal or ZIP code associated with the user's address.                  |
| **state**              | The state, province, or region of the user's residence.                     |
| **is\_public**         | Boolean indicating whether the user's profile is public or private.         |
| **user\_industry**     | The industry in which the user works or is interested in.                   |
| **user\_dream\_job**   | The user's aspirational or dream job position.                              |
| **user\_plan**         | The current subscription or membership plan the user is on.                 |
| **user\_plan\_status** | The status of the user's plan, e.g., active, expired, on hold, etc.         |

### Event List for Mixpanel Integration

| Event Name                  | Description                                  | Params                            | Action                                | Desc                                                             |
| --------------------------- | -------------------------------------------- | --------------------------------- | ------------------------------------- | ---------------------------------------------------------------- |
| **UserRegistrationEvent**   | Triggered when a new user registers.         | *user_Name, first_Name,last_Name* |                                       |                                                                  |
| **UserLoginEvent**          | Triggered when a user logs in or logout.     | desc                              |                                       |                                                                  |
|                             |                                              |                                   |                                       | Login                                                            |
|                             |                                              |                                   |                                       | Logout                                                           |
| **UserProfileUpdateEvent**  | Triggered when a user updates their profile. | action                            |                                       |                                                                  |
|                             |                                              |                                   | Update_Profile                        |                                                                  |
|                             |                                              |                                   | Toggle_Profile_Public_Status          |                                                                  |
|                             |                                              |                                   | Create_Education_History              |                                                                  |
|                             |                                              |                                   | Edit_Education_History                |                                                                  |
|                             |                                              |                                   | Create_Work_History                   |                                                                  |
|                             |                                              |                                   | Update_Work_History                   |                                                                  |
|                             |                                              |                                   | Change_Password                       |                                                                  |
| **InterviewEvent**          | User trigger any interview events            | action, desc                      | Finish_Interview                      | User finished a interview.                                       |
|                             |                                              |                                   | Start_Interview_Dialog                | User clicked on a title and previewed to start the interview.    |
|                             |                                              |                                   | Start_Interview                       | User started a interview.                                        |
|                             |                                              |                                   | Start_interview_button                | User Click Start_interview_button in the main page               |
|                             |                                              |                                   | Interview Video Saved                 | User saved a interview video.                                    |
|                             |                                              |                                   | Start_Interview_Question              | User started a interview question.                               |
|                             |                                              |                                   | Start_Review_Question                 | User started a interview review question.                        |
|                             |                                              |                                   | Finish_Interview_Question             | User finished a interview question and listened to the response. |
|                             |                                              |                                   | Retry_Interview_Question              | User retried a interview question                                |
|                             |                                              |                                   | Interview_Review_Card_Clicked         | User clicked on a card in the interview review page.             |
|                             |                                              |                                   | Interview_Review_Page_Loaded          | User loaded the interview review page.                           |
| **SubscriptionUpdateEvent** | User trigger any subscription events         |                                   | Viewed_Plan                           | User viewed the plan                                             |
|                             |                                              |                                   | Click_Plans_Upgrade                   | User clicked plan upgrade                                        |
|                             |                                              |                                   | Click_Plans_Cancel                    | User clicked plan cancel                                         |
|                             |                                              |                                   | Click_Plans_Resume                    | User clicked plan resume                                         |
|                             |                                              |                                   | Stripe_Subscribe_Successful           | User has triggerd subscribtion event                             |
|                             |                                              |                                   | Stripe_Subscribe_Cancel_Successful    | User has triggerd subscribtion event                             |
|                             |                                              |                                   | Stripe_Subscribe_Renew_Successful     | User has triggerd subscribtion event                             |
|                             |                                              |                                   | Stripe_Subscribe_Terminate_Successful | User has triggerd subscribtion event                             |
|                             |                                              |                                   | Stripe_Subscribe_Resume_Successful    | User has triggerd subscribtion event                             |
|                             |                                              |                                   | User_Cancel_Subscription_Survey       | User cancelled subscription and filled out the survey            |
| **TutorialEvent**           | Triggered on tutorial/training completion.   |                                   | User_Clicked_CTA                      |                                                                  |
|                             |                                              |                                   | User_Clicked_Tutorial                 |                                                                  |
| **UserMouseClickEvent**     | User mouse click event                       |                                   | User_Clicked_On_Left_Navigation_List  | User clicked on left navigation list                             |
| **ResumeScanEvent**         |                                              |                                   |                                       |                                                                  |
