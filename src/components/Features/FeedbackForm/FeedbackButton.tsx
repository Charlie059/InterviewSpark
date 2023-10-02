import React, { FC } from 'react'
import { StyledFeedbackButton } from './FeedbackButton.styled'

interface FeedbackButtonProps {
  text: string
  onClick: () => void
}

const FeedbackButton: FC<FeedbackButtonProps> = ({ text, onClick }) => (
  <StyledFeedbackButton onClick={onClick} sx={{ mb: '10px' }}>
    {text}
  </StyledFeedbackButton>
)

export default FeedbackButton
