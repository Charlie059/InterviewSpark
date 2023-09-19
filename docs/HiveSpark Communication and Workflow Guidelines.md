# Company Communication and Workflow Guidelines

## 1. Slack for Communication in English

**Purpose:** Slack is our primary platform for internal communication. All team members are required to communicate in English on Slack to ensure a unified and clear understanding among team members from different backgrounds.

**Guidelines:**

- **Channels:** Use designated channels for specific discussions. For instance, `#marketing` for marketing-related conversations and `#dev` for development-related topics.
- **Direct Messages:** Use DMs for one-on-one conversations or discussions that don't pertain to the entire team.
- **Response Time:** While instant responses are not expected, please do your best to respond within 24 hours during weekdays.

## 2. Slack Daily Check-In Using Standup Bot / Standup Meeting

**Purpose:** Utilize the Slack Standup Bot to automate and streamline our daily check-in process. This ensures consistent updates and eases the management of daily standups.

**Guidelines:**

- **Set Up:** Ensure every team member has the Standup Bot integrated into their Slack.
- **Frequency:** Every weekday.
- **Time:** The bot will prompt every team member for their updates at 10:30 AM [Your Time Zone] and reminders will be sent every 15 minutes until 10:30 AM for those who haven't responded.
- **Channel:** Standup Bot will consolidate all the updates and post a summarized report in the `#daily-standup` channel by 10:30 AM.
- **Format:** When prompted by the bot, please provide your updates in the following structure:
  - What I did yesterday
  - What I will do today
  - Any blockers or challenges
- **Bot Commands:** Familiarize yourself with the bot commands:
  - `/standup_configure`: Set or change your standup settings.
  - `/standup_status`: Check the status of your standup for the day.
  - (Any other relevant bot commands you wish to include.)

## 3. Weekly Meeting Time

**Purpose:** Weekly meetings serve as a platform to discuss broader team objectives, align on goals, and address any significant challenges.

**Guidelines:**

- **Frequency:** Once a week.
- **Time:** Every Friday at 3:00 PM [Your Time Zone].
- **Platform:** Google Meeting. [Link]
- **Agenda:** To be shared 24 hours before the meeting. Team members are encouraged to add any items they wish to discuss.

## 4. Workflow: GitHub -> Jira (Demo Video)

**Purpose:** Our workflow moves from GitHub, where our codebase resides, to Jira, our project management tool.

**Guidelines:**

- **Code Commits:** All code changes should be committed to GitHub with meaningful commit messages. Every commit should reference the corresponding Jira ticket number.
- **Branch Naming:** Branch names should be structured as `[Jira Ticket Number]-short-description`. E.g., `JIRA-123-fix-login-bug`.
- **Jira Updates:** Upon committing or merging any changes, the corresponding Jira ticket should be updated with the status and any necessary comments.
- **Reviews and Merges:** Pull requests in GitHub should be reviewed by at least one other team member. Once reviewed and approved, changes can be merged to the main branch.

## 5. Code Requirements

**Purpose:** To ensure the quality, maintainability, and consistency of our codebase, we've set forth the following coding standards and practices:

**Guidelines:**

- **Coding Style:** Adhere to the style guide provided for the specific programming language. E.g., for Python, follow PEP 8.
- **Documentation:**
  - **Inline Comments:** Use them sparingly to explain complex pieces of code or algorithms.
  - **Docstrings:** Required for all functions, methods, and classes to describe their purpose and any parameters/returns.
- **Testing:**
  - Every piece of new functionality must come with relevant unit tests or E2E test.
  - Ensure that all tests pass before pushing code or creating a pull request.
- **Commit Messages:**
  - Write clear and concise commit messages that explain the purpose and context of the change.
  - If related to a Jira ticket, include the ticket number at the beginning of the commit message.
- **Error Handling:**
  - Always handle potential errors or exceptions gracefully.
  - Provide informative error messages to help in debugging.
- **Dependencies:**
  - Avoid adding unnecessary libraries or packages.
  - If a new dependency is essential, ensure it is added to the relevant dependency management file (e.g., `requirements.txt` for Python) and provide justification in your pull request.
- **Performance:**
  - Write efficient code. Avoid nested loops or recursive functions where they can impact performance.
  - Profile and optimize resource-intensive sections of the codebase.
- **Security:**
  - Never hard-code sensitive information like passwords or API keys.
  - Be wary of potential security vulnerabilities, especially when dealing with user input.
  - Never upload `.env` file to git
- **Code Reviews:**
  - Every pull request should be reviewed by at least one other developer.
  - Address all feedback and concerns before merging.

## 6. Documentation in GitBook

**Purpose:** Leveraging GitBook for our project documentation ensures a centralized, user-friendly platform where team members can easily find, contribute to, and edit documentation.

**Guidelines:**

- **Structure:** Organize documentation in a clear hierarchy. Begin with high-level topics and break them down into detailed subtopics.
- **Versioning:** When significant changes are made to the system, ensure that the documentation reflects the current version of the software.
- **Contribution:**
  - All team members are encouraged to contribute to the documentation.
  - Changes to documentation should be reviewed by at least one other member before publishing.
- **Linking:** Integrate links within the documentation to guide readers to relevant information and external resources.
- **Updating:** Regularly review and update the documentation to ensure accuracy and relevance.
- **Access:** Ensure all team members have appropriate access levels to view and/or edit the documentation.

## 7. Frontend Component Documentation & Reusing Components with Storybook

**Purpose:** Using Storybook for frontend documentation enables the team to visualize and interact with individual UI components outside of the application. This ensures consistency, reusability, and easier testing of components.

**Guidelines:**

- **Component Isolation:** Each UI component should be documented in isolation within Storybook. This means every component should be showcased independently, without the need for its parent or child components.
- **Prop Variations:** Use knobs or controls in Storybook to allow users to interactively adjust props and see their effects on the component.
- **Documentation:**
  - Each component in Storybook should be accompanied by a brief description explaining its purpose and usage.
  - Include details about different prop configurations, expected behavior, and any other relevant notes.
- **Consistency:** Use a consistent structure and styling for all components in Storybook.
- **Testing:** Utilize the Storybook environment to test components across different states and prop configurations.
- **Sharing:** Use Storybook's sharing features to allow team members (especially non-developers) to view and interact with components. This can be beneficial for designers, product managers, and other stakeholders.
- **Reuse:**
