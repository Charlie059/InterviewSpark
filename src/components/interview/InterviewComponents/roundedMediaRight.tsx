/***********************************************************************************************
  Name: RoundedMediaRight.tsx
  Description: This file contains the custom hook for interview.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/16
  Update Date: 2023/06/16
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring' // 引入react-spring
import SkipNextSharpIcon from '@mui/icons-material/SkipNextSharp'
import CaptionIconButton from './captionButton'
import DynamicWave from './DynamicWave'

enum InterviewStatus {
  Interviewing = 'INTERVIEWING',
  FinishedQuestion = 'FINISHED_QUESTION',
  Reviewing = 'REVIEWING',
  SavedQuestion = 'SAVED_QUESTION',
  FinishedInterview = 'FINISHED_INTERVIEW',
  Loading = 'LOADING',
  NotStarted = 'NOT_STARTED'
}

interface RoundedMediaRightProps {
  status: InterviewStatus
  questionText: string
  questionTitle: string
  skipQuestion: () => void
  caption: string
  isReading: boolean
}

interface FrostedGlassEffectProps {
  blurValue: string
  status: InterviewStatus
  showQuestion: boolean
}

const FrostedGlassEffect = styled.a<FrostedGlassEffectProps>`
  backdrop-filter: blur(${props => props.blurValue});
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  font-size: 20px;
`

const RoundedDiv = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 70%;
  border-radius: 25px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
  font-size: 20px;
  user-select: none;
`

const WaveContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 85%;
  justify-content: flex-start;
  margin: 5% 10% 0 10%;
  align-items: flex-start;
  overflow: hidden;
`

const UnselectableSpan = styled(animated.span)`
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 28px;
  color: #cacaca;
  user-select: none;
  text-align: center;
  display: inline-block;
`

const QuestionTagSpan = styled.span`
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 35px;
  color: #000;
  user-select: none;
  text-align: left;
  display: block;
`

const QuestionTitleSpan = styled.span`
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 18px;
  color: #000;
  user-select: none;
  text-align: left;
  display: block;
`

const CaptionSpan = styled.span`
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 18px;
  color: #000;
  user-select: none;
  text-align: center;
  display: block;
  overflow-y: none;
  flex-grow: 1;
  max-height: 60%;
  min-height: 0;
  margin: 10%;
`

const SkipButtonText = styled.span`
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  user-select: none;
  text-align: left;
  display: block;
`

const QuestionSpan = styled.span`
  font-family: 'Poppins';
  font-weight: 200;
  font-size: 17px;
  color: #000;
  user-select: none;
  text-align: left;
  display: block;
  margin-top: 3%;
  overflow-y: auto;
  flex-grow: 1;
  max-height: 60%;
  min-height: 0;
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
`

const ActionButton = styled(animated.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #787eff;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 8px;
  font-size: 16px;
  box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.3);
  margin: 10px;
  cursor: pointer;
`

const ActionButtonContainer = styled.div`
  position: absolute;
  top: 92%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  width: 100%;
`

const CenteredTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const Layer = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 3;
`

export const RoundedMediaRight: React.FC<RoundedMediaRightProps> = ({
  status,
  questionTitle,
  questionText,
  skipQuestion,
  caption,
  isReading
}) => {
  const [showQuestion, setShowQuestion] = useState(false)
  const [openTranscript, setOpenTranscript] = useState(false)

  // 添加动画状态
  const tapAnimation = useSpring({
    transform: showQuestion ? 'scale(1.2)' : 'scale(1)',
    config: { tension: 100, friction: 50 }
  })

  const skipAnimation = useSpring({
    opacity: showQuestion ? 1 : 0,
    config: { tension: 100, friction: 50 }
  })

  useEffect(() => {
    if (status === InterviewStatus.FinishedQuestion) {
      setShowQuestion(false)
    }
  }, [status])

  const blurValue = status === InterviewStatus.SavedQuestion || status === InterviewStatus.Reviewing ? '0px' : '35px'

  return (
    <RoundedDiv onClick={() => status === InterviewStatus.NotStarted && !showQuestion && setShowQuestion(true)}>
      <WaveContainer>
        <DynamicWave paused={!isReading} />
      </WaveContainer>
      {status === InterviewStatus.NotStarted && (
        <FrostedGlassEffect blurValue={blurValue} status={status} showQuestion={showQuestion}>
          {!showQuestion && (
            <CenteredTextContainer>
              <UnselectableSpan style={tapAnimation}>Tap to display question</UnselectableSpan>
            </CenteredTextContainer>
          )}
          {showQuestion && (
            <QuestionContainer>
              <QuestionTagSpan>Question</QuestionTagSpan>
              <QuestionTitleSpan>{questionTitle}</QuestionTitleSpan>
              <QuestionSpan>{questionText}</QuestionSpan>
              <ActionButtonContainer>
                <ActionButton
                  style={skipAnimation}
                  onClick={() => {
                    skipQuestion()
                  }}
                >
                  <SkipNextSharpIcon />
                  <SkipButtonText> Skip this question </SkipButtonText>
                </ActionButton>
              </ActionButtonContainer>
            </QuestionContainer>
          )}
        </FrostedGlassEffect>
      )}
      {(status === InterviewStatus.Interviewing || status === InterviewStatus.FinishedQuestion) && (
        <>
          {openTranscript && (
            <FrostedGlassEffect blurValue={blurValue} status={status} showQuestion={showQuestion}>
              <CaptionSpan>{caption}</CaptionSpan>
            </FrostedGlassEffect>
          )}
          <Layer>
            <CaptionIconButton
              onButtonClick={function (): void {
                setOpenTranscript(!openTranscript)
              }}
            />
          </Layer>
        </>
      )}
      {(status === InterviewStatus.SavedQuestion || status === InterviewStatus.Reviewing) && <></>}
    </RoundedDiv>
  )
}

export default RoundedMediaRight
