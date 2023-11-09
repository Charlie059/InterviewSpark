# Login and Registration Test

## User Login Test Documentation

---

### Login Overview

This document provides detailed descriptions for end-to-end tests conducted on the User Login functionality. Each test scenario is outlined, detailing its purpose, preconditions, execution steps, expected outcomes, and postconditions.

---

### Test Scenarios

---

#### 1. Successful Login Using Registered Username and Password

- **Purpose:** To ensure that users can successfully login using their registered credentials.

- **Preconditions:** User is registered with email dynamic generated test_email and test_pwd 'Testing1234'.

- **- **Steps:****

1. Navigate to the login page.

2. Enter the email {test_email}.

3. Enter the password {test_pwd}.

4. Click the submit button.

5. Wait for up to 10 seconds.

- **Expected Outcome:** The URL should change to include '/interview'.

- **Postconditions:** User is logged in and redirected to the '/interview' page.

---

#### 2. Error Message with Wrong Email Address

- **Purpose:** To validate that the system correctly identifies an invalid email address and displays an appropriate error message.

- **Preconditions:** User is on the login page.

- **Steps:**

1. Navigate to the login page.

2. Enter the invalid email 'test1234'.

3. Click on the password input field.

- **Expected Outcome:** An error message stating "email must be a valid email" is displayed within the form.

- **Postconditions:** User remains on the login page with an error message displayed.

---

#### 3. Error Message with Space Email Address

- **Purpose:** To validate the system's response to an email address containing only space characters.

- **Preconditions:** User is on the login page.

- **Steps:**

1. Navigate to the login page.

2. Enter a space character for the email.

3. Click on the password input field.

- **Expected Outcome:** An error message stating "email must be a valid email" is displayed within the form.

- **Postconditions:** User remains on the login page with an error message displayed.

---

#### 4. Error Message with Less Length Password

- **Purpose:** To validate that the system identifies passwords that are too short and displays an appropriate error message.

- **Preconditions:** User is on the login page.

- **Steps:**

1. Navigate to the login page.

2. Enter the password '1111'.

3. Click on the email input field.

- **Expected Outcome:** An error message stating "password must be at least 8 characters" is displayed within the form.

- **Postconditions:** User remains on the login page with an error message displayed.

---

#### 5. Error Message with Wrong Password

- **Purpose:** To ensure the system identifies an incorrect password and displays an appropriate error message.

- **Preconditions:** User is registered with test_email.

- **Steps:**

1. Navigate to the login page.

2. Enter the email {test_email}.

3. Enter an incorrect password '11111111'.

4. Click the submit button.

- **Expected Outcome:** An error message stating "Incorrect username or password" is displayed within the form.

- **Postconditions:** User remains on the login page with an error message displayed.

---

# Documentation: User Registration E2E Testing

## Registration Overview

This documentation provides a detailed breakdown of end-to-end tests performed for the user registration process. Each test scenario is covered comprehensively with its purpose, preconditions, steps, expected outcomes, and postconditions.

## Table of Contents

1. Fills out and submits the registration form and fill the code.

2. Shows an error message with short Username.

3. Shows error message with empty value.

4. Shows an error message with invalid email address.

5. Shows an error message with space email address.

6. Test for Valid Email.

7. Test for Checkbox Agreement

8. Test for Short Password

9. Test for Invalid Password

---

### Registration Test Scenarios

#### 1. Fills out and submits the registration form and fill the code

- **Purpose:**

To ensure that users can successfully register, receive a verification code via email, input the code, and subsequently log in using their credentials.

- **Preconditions:**

- The user is not already registered with the application.

- The registration page is accessible.

- The application's email service is operational.

- **Steps:**

1. Navigate to the registration page.

2. Input the desired username.

3. Input a valid email address.

4. Input first and last names.

5. Input a secure password.

6. Accept the terms and conditions.

7. Submit the form.

8. Wait for the confirmation page to be displayed.

9. Check the given email for a verification code.

10. Input the verification code.

11. Wait for the code to be processed.

12. Verify redirection to the login page.

13. Log in using the registered email and password.

- **Expected Outcome:**

- A verification code is sent to the given email.

- After inputting the code, the user is redirected to the login page.

- The user can successfully log in using the registered credentials.

- **Postconditions:**

The user is now a registered member of the application and is logged in.

---

#### 2. Shows an error message with short Username

- **Purpose:**

To ensure that the application validates the length of the username and displays an appropriate error message for short usernames.

- **Preconditions:**

- The user is not already registered with the application.

- The registration page is accessible.

- **Steps:**

1. Navigate to the registration page.

2. Input a short username (e.g., "aa").

3. Complete other required fields.

4. Submit the form.

- **Expected Outcome:**

An error message, "Username must be at least 3 characters long," is displayed.

- **Postconditions:**

User registration is not completed due to the invalid username.

---

#### 3. Shows error message with empty value

- **Purpose:**

To verify that the application validates all required fields and displays error messages for any missing or incorrect data.

- **Preconditions:**

- The user is not already registered with the application.

- The registration page is accessible.

- **Steps:**

1. Navigate to the registration page.

2. Without filling any field, directly click the submit button.

- **Expected Outcome:**

Multiple error messages are displayed for each missing or incorrect field.

- **Postconditions:**

User registration is not completed due to the missing or incorrect data.

---

#### 4. Shows an error message with invalid email address

- **Purpose:**

To confirm that the application validates the email format and displays an error for invalid email addresses.

- **Preconditions:**

- The user is not already registered with the application.

- The registration page is accessible.

- **Steps:**

1. Navigate to the registration page.

2. Input an invalid email (e.g., "invalidemail").

3. Complete other required fields.

4. Submit the form.

- **Expected Outcome:**

An error message, "email must be a valid email," is displayed.

- **Postconditions:**

User registration is not completed due to the invalid email address.

---

#### 5. Shows an error message with space email address

- **Purpose:**

To ensure the application detects and invalidates email addresses that contain spaces.

- **Preconditions:**

- The user is not already registered with the application.

- The registration page is accessible.

- **Steps:**

1. Navigate to the registration page.

2. Input an email with a space (e.g., " ").

3. Complete other required fields.

4. Submit the form.

- **Expected Outcome:**

An error message is displayed indicating the email address is not valid.

- **Postconditions:**

User registration is not completed due to the space in the email address.

---

#### 1. Test for Valid Email

- **Purpose:** To ensure the system recognizes invalid email formats and prompts the user with the appropriate error message.

- **Preconditions:** User is on the registration page.

- **Steps:**

1. Navigate to the registration page.
2. Submit the form without entering the email.

- **Postconditions:**

- The form displays an error message stating "email must be a valid email".

Postconditions: The user remains on the registration page.

---

#### 2. Test for Checkbox Agreement

- **Purpose:** To ensure users cannot register without agreeing to the privacy policy & terms.

- **Preconditions:** User is on the registration page.

- **Steps:**

1. Enter valid data for all fields except for the privacy & terms checkbox.
2. Submit the form without clicking the checkbox.

- **Postconditions:**

- The form displays an error message stating "You must accept the privacy policy & terms".

Postconditions: The user remains on the registration page.

---

#### 3. Test for Short Password

- **Purpose:** To validate the system's recognition of a password that doesn't meet the minimum length requirement.

- **Preconditions:** User is on the registration page.

- **Steps:**

1. Enter a password that is shorter than the required length.
2. Fill in the other necessary details.
3. Click the checkbox for terms agreement.
4. Submit the form.

- **Postconditions:**

- The form displays an error message stating "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long".

Postconditions: The user remains on the registration page.

---

#### 4. Test for Invalid Password

- **Purpose:** To check the system's handling of various invalid password formats.

- **Preconditions:** User is on the registration page.

- **Steps:**

1. Enter a password that is missing an uppercase letter, a lowercase letter, or a number.
2. Fill in the other necessary details.
3. Click the checkbox for terms agreement.
4. Submit the form for each of the password types.

- **Postconditions:**

- For each of the password types, the form displays an error message stating "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long".

Postconditions: The user remains on the registration page.

## Changelog

- **Version 1.0 (Date):** Initial set of tests for user registration.

## Notes

- Ensure that the application's email service is operational before running the tests.

- For any issues related to email not being sent, check the server's SMTP configuration.
  
---

This structure should be intuitive for both testers and non-testers. Adjustments can be made as required based on the specifics of the application or the testing environment.
