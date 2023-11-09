// types.ts
export interface Topic {
  id: number
  title: string
  author: string
  replies: number
  lastReply: string
  excerpt: string
  tags: string[]
  imageUrl: string
}

export interface Interview {
  interviewDateTime: string
  interviewFeedback: string
  interviewID: string
  interviewAnalysis: string
  interviewQuestion: string
  interviewQuestionID: string
  interviewQuestionTitle: string
  interviewQuestionType: string
  interviewVideoKey: string
  interviewEstimatedSeconds: number
}


export interface AppsumoFormType {
  code: string;
}
