import { Box, Dialog, DialogContent, Fade, FadeProps, IconButton, Typography } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import { ReactElement, Ref, forwardRef } from 'react'
import { InterviewQuestion } from 'src/components/interview/createInterview/interview-question-selection-result-list'

interface QuickViewQuestionProps {
  onOpen: () => boolean
  onClose: () => void
  row: InterviewQuestion[] | null
}

const QuickViewQuestion = ({ onOpen, onClose, row }: QuickViewQuestionProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleClose(event: React.MouseEvent<HTMLButtonElement>): void {
    onClose()
  }

  const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
  ) {
    return <Fade ref={ref} {...props} />
  })

  return (
    <div>
      <Dialog
        fullWidth
        open={onOpen()}
        scroll='body'
        maxWidth='md'
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: '30px'
          }
        }}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pr: { xs: 5, sm: 12 },
            pl: { xs: 4, sm: 11 },
            pt: { xs: 8, sm: 12.5 },
            pb: { xs: 5, sm: 12.5 }
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{
                mb: 3,
                lineHeight: '2rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 'medium',
                fontSize: '20px',
                color: '#4C4E64B2' // 4C4E64 * 87%
              }}
            >
              Question {row![0]?.QuestionID}
            </Typography>

            <Typography
              variant='h3'
              sx={{
                mb: 3,
                lineHeight: '2rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 'bold',
                fontSize: '45px',
                color: '#000000E0' // 000000 * 87%
              }}
            >
              {row![0]?.interviewQuestionTitle}
            </Typography>
            <br />
            <Typography
              sx={{
                mb: 3,
                lineHeight: '2rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 'regular',
                fontSize: '18px',
                color: '#4C4E64A6' // 4C4E64 * 65%
              }}
            >
              {row![0]?.interviewQuestion}
            </Typography>

            <Typography
              sx={{
                mb: 3,
                lineHeight: '2rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 'regular',
                fontSize: '18px',
                color: '#4C4E6480' // 4C4E64 * 50%
              }}
            >
              Hint:
              <br />
              {row![0]?.interviewQuestionSampleAns}
            </Typography>
          </div>

          <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}></Box>
          <Box sx={{ height: '10px' }}></Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}></Box>
          <IconButton
            edge='end'
            color='inherit'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 5,
              right: 20
            }}
          >
            <Close />
          </IconButton>
        </DialogContent>
      </Dialog>
    </div>
  )
}

QuickViewQuestion.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default QuickViewQuestion
