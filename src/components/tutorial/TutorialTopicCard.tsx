import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// ** React Imports
import {useEffect, useState} from 'react'
import {API, graphqlOperation} from "aws-amplify";
import {getQuestionUsageMetaData} from "../../graphql/queries";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {Controller, useForm} from "react-hook-form";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

interface topicItem {
  title: string
}

const TutorialTopicCard = () => {
  // States
  const[topicsList, setTopicsList] = useState<topicItem[]>([])
  const[selectedTopics, setSelectedTopics] = useState<string>()

  const { control, handleSubmit } = useForm()

  const handleEditSubmit = async (formData: any) => {
    console.log('formData', formData)
    setSelectedTopics(formData)
  }

  useEffect(
    () => {
      const fetchInterviewTags = async () => {
        const result = await API.graphql(graphqlOperation(getQuestionUsageMetaData, {}))
        console.log("Tutorial Care", result)
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
    }, []
  )

  useEffect(
    () => {
      console.log("selected topics", selectedTopics)
    }, [selectedTopics]
  )

  return (
    <Card>
      <CardContent>
        <Box sx={{mr: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography variant='h6'>Topic Interested</Typography>
        </Box>
        <form onSubmit={handleSubmit(handleEditSubmit)}>
          <Grid container spacing={6} sx={{p:5}}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Topics Interested</InputLabel>
                <Controller
                  name='topicsInterested'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label='topics interested'
                      defaultValue=''
                      onChange={onChange}
                      value={value}
                    >
                      {topicsList.map((topic) => (
                        <MenuItem key={topic.title} value={topic.title}>
                          {topic.title}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid container justifyContent="flex-end" sx={{mt:8}}>
              <Grid item>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default TutorialTopicCard
