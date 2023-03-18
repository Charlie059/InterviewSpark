// pages/post/[postId].tsx

import React from 'react'
import { useRouter } from 'next/router'

const PostDetail = () => {
  const router = useRouter()
  const { postId } = router.query

  // Fetch post data using the postId here

  return (
    <div>
      <h1>Post Detail: {postId}</h1>
      {/* Render the post detail here */}
    </div>
  )
}
PostDetail.acl = {
  action: 'read',
  subject: 'discuss-page'
}

export default PostDetail
