import React, { useState } from 'react'
import { Box, Grid, IconButton, TextField } from '@mui/material'
import { Box, Grid, IconButton, TextField } from '@mui/material'
import MuiTypography, { TypographyProps } from '@mui/material/Typography'
import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// import {
//   InterviewQuestionList,
//   InterviewQuestion
// } from 'src/components/interview/createInterview/interview-question-selection-result-list'
// import Logo from 'src/components/interview/createInterview/logo'
// import InterviewQuestionSummary from 'src/components/interview/createInterview/interview-question-summary'
// import QuestionList from 'src/components/interview/createInterview/question-list'
// import router from 'next/router'
// import { API, graphqlOperation } from 'aws-amplify'
// import { createUserInterviewWithQuestion } from 'src/graphql/mutations'
// import QuickViewQuestion from 'src/components/interview/createInterview/quick-view-question'

import { NavBar } from 'src/components/interview/createInterview/navigation-bar'
import { NavBar} from 'src/components/interview/createInterview/navigation-bar'
import MockInterviewCard from 'src/components/interview/createInterview/mock-interview-card'
import AlphabeticSelectList from 'src/components/interview/createInterview/alphabetic-select-list'
import StartInterviewDialog from 'src/components/interview/createInterview/start-interview-dialog'

import Avatar from '@mui/material/Avatar'
import Icon from 'src/@core/components/icon'

import { styled } from '@mui/material/styles'

// ! Placeholder data
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 }
]

const Typography = styled(MuiTypography)<TypographyProps>(({}) => ({
const Typography = styled(MuiTypography)<TypographyProps>(() => ({
  fontFamily: 'Montserrat',
  color: 'black',
  fontWeight: 600
}))

interface CardItem {
  jobTitle: string
  imageSrc: string
}

const CreateQuestionsPage = () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // TODO: Replace this with actual recommendations and job titles

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recommendations, setRecommendations] = useState<CardItem[]>([
    { jobTitle: 'Software Engineer', imageSrc: '/images/cards/orange-candy.png' },
    { jobTitle: 'Data Science Engineer', imageSrc: '/images/cards/orange-candy.png' },
    { jobTitle: 'Mechanic Engineer', imageSrc: '/images/cards/analog-clock.jpg' },
    { jobTitle: 'Math Teacher', imageSrc: '/images/cards/orange-candy.png' }
  ])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allJobTitles, setAllJobTitles] = useState<{ name: string }[]>(
    top100Films.map(item => {
      return { name: item.label }
    })
  )
  const [searchKeyWord, setSearchKeyWord] = useState<string>('')
  const [startDialogOpen, setStartDialogOpen] = useState(false)
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>('')

  const handleChooseJobTitle = (jobTitle: string) => {
    // TODO: Link to the next step
    console.log(jobTitle)
    setSelectedJobTitle(jobTitle)
    setStartDialogOpen(true)
  }

  return (
    <Box sx={{ mx: 15, my: 7 }}>
      <NavBar
        navBarElements={[
          { name: 'HomePage', path: '/interview' },
          { name: 'Create Mock Interview', path: undefined }
        ]}
        closeNavLink='/interview'
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
        <Typography sx={{ fontSize: 36, mt: 2 }}>Mock Interview Topic</Typography>
        {/* // TODO: Replace actual user avatar */}
        <Avatar src='/images/avatars/1.png' sx={{ width: '3.5rem', height: '3.5rem' }} />
      </Box>
      <TextField
        size='small'
        value={searchKeyWord}
        onChange={e => setSearchKeyWord(e.target.value)}
        placeholder='Search by Job Title'
        autoComplete={'search-job-title'}
        id={'search-job-title'}
        InputProps={{
          startAdornment: (
            <Box sx={{ mr: 2, display: 'flex' }}>
              <Icon icon='mdi:magnify' fontSize={20} />
            </Box>
          ),
          endAdornment: (
            <IconButton size='small' title='Clear' aria-label='Clear' onClick={() => setSearchKeyWord('')}>
              <Icon icon='mdi:close' fontSize={20} />
            </IconButton>
          ),
          sx: { bgcolor: 'background.paper' }
        }}
        sx={{ mt: 9, mb: 0, width: '100%' }}
      />
      <Typography sx={{ fontSize: 20, mt: 6 }}>Recommendations</Typography>
      <Grid container spacing={6} sx={{ mt: 0 }}>
        {recommendations
          .filter(item => item.jobTitle.toLowerCase().includes(searchKeyWord.toLowerCase()))
          .map((item, index) => (
            <Grid item xs={6} md={4} lg={3} xl={2} key={index}>
              <MockInterviewCard jobTitle={item.jobTitle} imageSrc={item.imageSrc} onClick={handleChooseJobTitle} />
            </Grid>
          ))}
      </Grid>
      <Typography sx={{ fontSize: 20, mt: 6, mb: 2 }}>Sort by Job Title</Typography>
      {/* // TODO: Replace actual image */}
      <AlphabeticSelectList
        list={allJobTitles.filter(item => item.name.toLowerCase().includes(searchKeyWord.toLowerCase()))}
        onClickItem={handleChooseJobTitle}
        imageSrc={[
          ...Array.from({ length: 27 }, () => '/images/cards/orange-candy.png'),
          '/images/cards/analog-clock.jpg'
        ]}
      />
      <StartInterviewDialog open={startDialogOpen} setOpen={setStartDialogOpen} interviewTopic={selectedJobTitle} />
    </Box>
  )
}

CreateQuestionsPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

CreateQuestionsPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default CreateQuestionsPage
