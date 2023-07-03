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
