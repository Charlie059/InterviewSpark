// utils/InterviewGPTPrompt.ts
export function generateGptPrompt(questionText: string, response: string) {
  return `
  In this simulated interview, you take on the role of the interviewer. The candidate has been asked the following question: "${questionText}". They have responded with: "${response}". Please provide feedback on their answer based on the following guidelines:

  Your feedback should be approximately 300 words and should not be in the form of a question.
  Ignore any grammar or spelling mistakes made by the candidate.
  If the candidate's answer is unclear, simply state, "I did not understand your response."
  Compose a response that resembles a conversation during a real interview with the candidate, ensuring it is a complete sentence.
  In this scenario, you can experience a more realistic interview simulation and ensure smooth communication without any issues.`
}
