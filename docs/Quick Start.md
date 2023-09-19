# Quick Start with InterviewSpark and AWS Amplify

**InterviewSpark** is an AI-enhanced mock interview tool that aids job seekers in refining their interview skills, offering them a confidence boost. Utilizing React and fortified by AWS Amplify, it combines an extensive array of UI components, pages, and plugins to simulate an all-encompassing mock interview.

## Before You Begin

1. Ensure you have `Node.js` and `npm` installed on your computer. If not, you can download and install them from the [official Node.js website](https://nodejs.org/).
2. An active AWS account is crucial. If you don't have one, sign up at the [AWS Management Console](https://aws.amazon.com/console/).
3. Familiarize yourself with AWS Amplify. It will be instrumental in deploying and managing InterviewSpark.

## Setting Up InterviewSpark

1. **Clone the InterviewSpark Repository**: This is the first step to get all the necessary files on your local machine.

   ```bash
   git clone https://github.com/Charlie059/InterviewSpark.git
   ```

2. **Install Required Dependencies**: Navigate into the cloned directory and install the necessary dependencies.

   ```bash
   cd InterviewSpark
   npm install
   ```

3. **Initialize AWS Amplify**: Pull the Amplify configurations from the cloud.

   ```bash
   amplify pull --appId d38e770jlxdzpa --envName staging
   ```

4. **Start the Development Server**: This command fires up the server.

   ```bash
   npm run dev
   ```

5. **Access InterviewSpark**: Open a browser and navigate to:
   ```
   http://localhost:3000
   ```

That's it! Follow the instructions, and you'll have InterviewSpark running on your machine in no time.
