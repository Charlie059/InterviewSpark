import React from 'react'
import { Topic } from '../../types/types'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from 'next/link'

interface PostProps {
  topic: Topic
}

const Post = (props: PostProps) => {
  const { topic } = props

  const avatarSrc =
    'https://robohash.org/1ea23614424de2ac2bae82e1d4ed37e' + topic.author + '?set=set4&bgset=&size=400x400'

  return (
    <Link style={{ textDecoration: 'none' }} href={`/post/${topic.id}`}>
      <Card sx={{ display: 'flex', cursor: 'pointer' }}>
        <Grid container sx={{ flexGrow: 1, mx: 1 }}>
          <Grid item xs={12} sx={{ pr: 1 }}>
            <Box sx={{ width: '100%' }}>
              <CardHeader
                avatar={<Avatar src={avatarSrc} />}
                title={
                  <Stack direction='row' alignItems='center'>
                    <Typography variant='body1' fontWeight='bold' sx={{ mr: 1 }}>
                      {topic.title}
                    </Typography>
                  </Stack>
                }
                subheader={`by ${topic.author}`}
              />
              <CardContent>
                <Typography variant='body2' color='text.secondary' noWrap sx={{ marginBottom: 5 }}>
                  {topic.excerpt}
                </Typography>

                <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ marginTop: 1 }}>
                  <Chip label={`${topic.replies} Replies`} color='primary' variant='outlined' />
                  <Typography variant='body2' color='text.secondary'>
                    Last Reply: {topic.lastReply}
                  </Typography>
                </Stack>
              </CardContent>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Link>
  )
}

export default Post
