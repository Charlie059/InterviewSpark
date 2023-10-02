
# InterviewSpark with AWS Amplify

InterviewSpark is an AI-powered mock interview tool that assists job seekers in honing their interview skills and boosting their confidence. Developed using React, it's underpinned by AWS Amplify and incorporates a wide range of UI components, pages, and plugins to provide a comprehensive mock interview experience.

## Getting Started

To dive into InterviewSpark, ensure Node.js and npm are installed on your system. Setting up an AWS account is essential, along with initializing an AWS Amplify app. Once set, follow these steps:

1. Clone the repository:
   git clone <https://github.com/Charlie059/InterviewSpark.git>

1. Install dependencies:
   npm install

1. Set up Amplify:

```bash
amplify pull --appId d38e770jlxdzpa --envName staging
```

1. Start the development server:

```bash
npm run dev
```

1. Navigate to `http://localhost:3000` in your web browser.

## Documentation

All backend documentation for InterviewSpark is available on [Github](https://github.com/Charlie059/InterviewSpark/docs). This encompasses installation, setup, customization, FAQs, and troubleshooting advice.

### Frontend Docs in Storybook

Storybook is a powerful tool for developing and documenting UI components in isolation. It allows you to visualize different states of your components, develop them interactively, and organize them hierarchically based on atomic design principles.

#### How to run Storybook?

- **Installation**: If you haven't already set up Storybook in your project, you can add it using npm or yarn:

  ```bash
  npx sb init
  ```

This command sets up the necessary configuration and installs dependencies. Storybook supports various frameworks like React, Vue, Angular, etc. It will try to detect the framework you're using.

- **Running Storybook:**:

  ```bash
  npm run storybook
  ```

  This command will start the Storybook server and open it in your default web browser. By default, it will run on <http://localhost:6006/>.

## Support

For any hiccups with InterviewSpark, please contact our project team. Bug reports and feature suggestions are welcome on the Jira.

## Important Notes

- Ensure sensitive data like passwords or API keys are never hard-coded.
- Exercise caution regarding potential security threats, especially when managing user input.
- Refrain from uploading `.env` files to git.
- Execute a npm build and ensure no errors exist before any push.
- Do not use amplify push unless you have permission

## Code Review and Best Practices

- Every pull request needs scrutiny from at least one other developer.
- Address all feedback before concluding the merge.
- Prefix commit messages with the corresponding Jira ticket number.
- Employ Cypress E2E for frontend tests. To activate in npm, utilize the appropriate command.
- SAM is the chosen tool for backend processes, currently in transition.
