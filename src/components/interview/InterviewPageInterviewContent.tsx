import {Box, Card, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, {useEffect, useRef, useState } from 'react';
import UserProfileHeader from 'src/components/profile/UserProfileHeader'
import InterviewUsageSummaryThisMonth from 'src/components/interview/interviewProfile/Interview-monthly-summary-card'
import InterviewTotalSummaryCard from 'src/components/interview/interviewProfile/interview-total-summary-card/index'
import InterviewPromotion from 'src/components/interview/interviewProfile/interview-promotion'
import InterviewList from 'src/components/interview/interviewProfile/interview-list'

import { UserDataType } from 'src/context/types';
import RectangularCard from '../BaseUI/RectangularCard/RectangularCard';

interface InterviewContentProps{
  userProfile: UserDataType
}


const InterviewPageInterviewContent:React.FC<InterviewContentProps> = ({userProfile}) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const squareAspectRatio = isSmallScreen?2:1
  const rectangleAspectRatio = isXSmallScreen?1.5:7.2/2.3

  return (
    <>
      <UserProfileHeader data={userProfile} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={2.4} lg={2.4} >
          <RectangularCard aspectRatio={squareAspectRatio}>
            <InterviewUsageSummaryThisMonth/>
          </RectangularCard>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4} lg={2.4}>
          <RectangularCard aspectRatio={squareAspectRatio}>
          <InterviewTotalSummaryCard />
          </RectangularCard>
        </Grid>

        <Grid item xs={12} sm={12}  md={7.2} lg={7.2}>
          <RectangularCard aspectRatio={rectangleAspectRatio}>
            <InterviewPromotion/>
          </RectangularCard>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <InterviewList />
        </Grid>
      </Grid>
    </>
  );
};

export default InterviewPageInterviewContent;
