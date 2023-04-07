// pages/post/[postId].tsx

import React from 'react'
import { useRouter } from 'next/router'
import Log from 'src/middleware/loggerMiddleware'

const PostDetail = () => {
  const router = useRouter()
  const { postId } = router.query
  Log.info('PostDetail', postId)

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
