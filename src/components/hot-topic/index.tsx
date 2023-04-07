import React, { useState, useEffect } from 'react'
import { Topic as HotTopicType } from '../../types/types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import { generateFakeTopics } from 'src/@mock-data/posts'

const HotTopic = () => {
  const [hotTopics, setHotTopics] = useState<HotTopicType[]>([])

  useEffect(() => {
    const fetchHotTopics = async () => {
      const topics = await generateFakeTopics(1, 100, ' ', 100) // Replace 100 with the total topics count from the server
      const sortedTopics = topics.topics.sort((a, b) => b.replies - a.replies).slice(0, 5)

      setHotTopics(sortedTopics)
    }

    fetchHotTopics()
  }, [])

  return (
    <Box>
      <Paper sx={{ padding: 2, borderRadius: 1.2 }}>
        <Typography variant='subtitle1' fontWeight='bold' sx={{ margin: 1 }}>
          Hot Topics 🚀
        </Typography>
        <Divider />
        {hotTopics.map((topic: HotTopicType, index) => (
          <Box key={topic.id} sx={{ marginBottom: index !== hotTopics.length - 1 ? 3 : 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ fontSize: '0.75rem', marginRight: 2 }}>{topic.author[0]}</Avatar>
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant='subtitle2' fontWeight='bold'>
                    {topic.title}
                  </Typography>
                  <Typography variant='caption' color='text.secondary' noWrap>
                    {topic.excerpt}
                  </Typography>
                </Box>
              </div>
            </Box>
            {index !== hotTopics.length - 1 && <Divider sx={{ marginTop: 3, marginBottom: 3 }} />}
          </Box>
        ))}
      </Paper>
    </Box>
  )
}

export default HotTopic
