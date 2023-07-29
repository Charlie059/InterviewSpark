import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** React Imports
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { getQuestionUsageMetaData } from '../../graphql/queries'
import { useForm } from 'react-hook-form'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface topicItem {
  title: string
}

interface TutorialTopicPropsInterface {
  setSelectedTopic: Dispatch<SetStateAction<string>>
}

const TutorialTopicCard = (tutorialTopicProps: TutorialTopicPropsInterface) => {
  const { setSelectedTopic } = tutorialTopicProps

  // States
  const [topicsList, setTopicsList] = useState<topicItem[]>([])
  const { handleSubmit } = useForm()

  const handleEditSubmit = async (formData: any) => {
    console.log('formData', formData)
    setSelectedTopic(formData.topicsInterested)
  }

  useEffect(() => {
    const fetchInterviewTags = async () => {
      const result = await API.graphql(graphqlOperation(getQuestionUsageMetaData, {}))
      if ('data' in result) {
        const tags = result.data.getQuestionUsageMetaData.questionTags
        const allTagsFromDB = tags.map((item: { tag: string }) => {
          return { title: item.tag }
        })

        // Sort the job titles by alphabetical order
        allTagsFromDB.sort((a: any, b: any) => {
          if (a.title < b.title) {
            return -1
          }
          if (a.title > b.title) {
            return 1
          }

          return 0
        })
        console.log(allTagsFromDB)
        setTopicsList(allTagsFromDB)
      }
    }
    fetchInterviewTags()
  }, [])

  const handleInputChange = (event: SelectChangeEvent) => {
    const { value } = event.target
    setSelectedTopic(value)
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ mr: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h6'>Topic Interested</Typography>
        </Box>
        <form onSubmit={handleSubmit(handleEditSubmit)}>
          <Grid container spacing={6} sx={{ p: 5 }}>
            <Grid item xs={12} sm={12}>
              <Select fullWidth defaultValue='Adaptability' onChange={handleInputChange}>
                {topicsList.map(topic => (
                  <MenuItem key={topic.title} value={topic.title}>
                    {topic.title}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default TutorialTopicCard
