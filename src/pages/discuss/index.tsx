import React, { useState, useEffect } from 'react'
import { Topic } from '../../types/types'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Post from 'src/components/post-overview/post-overview'
import HotTopic from 'src/components/hot-topic/hot-topic'
import Pagination from '@mui/lab/Pagination'
import { generateFakeTopics } from 'src/@mock-data/posts'
import Button from '@mui/material/Button'
import TopicTag from 'src/components/topic-tag/topic-tag'

const tags = [
  {
    name: 'Interview',
    imageUrl: 'https://static.leetcode.cn/cn-mono-assets/production/assets/interview-active.ebee91f1.png'
  },
  {
    name: 'Software Engineering',
    imageUrl: 'https://static.leetcode.cn/cn-mono-assets/production/assets/jobs-promote.04e3a3ef.png'
  },
  {
    name: 'Remote Work',
    imageUrl: 'https://static.leetcode.cn/cn-mono-assets/production/assets/general-topic.66326b21.png'
  },
  {
    name: 'Productivity',
    imageUrl: 'https://static.leetcode.cn/cn-mono-assets/production/assets/general-topic.66326b21.png'
  }
]

const DiscussPage = () => {
  const [searchInput, setSearchInput] = useState('')
  const [activePage, setActivePage] = useState(1)
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const itemsCountPerPage = 10

  const fetchTopics = async (pageNumber: number) => {
    // Replace this with your API call to fetch topics based on the page number
    const { topics, totalPages } = await generateFakeTopics(pageNumber, itemsCountPerPage, searchInput, 20) // Replace 100 with the total topics count from the server
    setFilteredTopics(topics)
    setTotalPages(totalPages)
  }

  useEffect(() => {
    fetchTopics(activePage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage])

  const handlePageChange = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
    setActivePage(pageNumber)
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', paddingBottom: 1 }}>
            {tags.map((tag, index) => (
              <Box key={index} sx={{ flex: '1 1 auto', marginRight: 1, marginBottom: 1 }}>
                <TopicTag text={tag.name} imageUrl={tag.imageUrl} />
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item xs={15} sm={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              size='small'
              fullWidth
              label='🔎 Search Topics'
              value={searchInput}
              onChange={event => setSearchInput(event.target.value)}
              sx={{
                height: '48px'
              }}
            />

            {/* <Box sx={{ width: '10px', backgroundColor: 'transparent' }} /> */}

            <Button
              variant='contained'
              sx={{
                backgroundColor: '#1877f2',
                color: '#fff',
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 600,
                marginLeft: '10px',
                height: '40px'
              }}
            >
              🖊️&nbsp;New&nbsp;Post
            </Button>
          </Box>
        </Grid>

        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12} md={8}>
            {filteredTopics.map((topic: Topic) => (
              <Paper key={topic.id} sx={{ marginBottom: 2, borderRadius: 2 }}>
                <Post topic={topic} />
              </Paper>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <Pagination
                count={totalPages}
                page={activePage}
                onChange={handlePageChange}
                color='primary'
                shape='rounded'
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <HotTopic />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

DiscussPage.acl = {
  action: 'read',
  subject: 'discuss-page'
}

export default DiscussPage
