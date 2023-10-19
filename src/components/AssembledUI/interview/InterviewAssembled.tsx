/***********************************************************************************************
 * This is the Layout of components for Interview Page
 *
 * Author: Yuxuan Yang
 * Contact: yyx980325@hotmail.com
 * Create Date: 19/10/2023
 * Update Date: 19/10/2023
 * Copyright: © 2023 HireBeat Inc. All rights reserved.
 ************************************************************************************************/

import {Box, Card, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, {useEffect, useRef, useState } from 'react';
import UserProfileHeader from '../../profile/UserProfileHeader'
import InterviewUsageSummaryThisMonth from '../../interview/interviewProfile/Interview-monthly-summary-card'
import InterviewTotalSummaryCard from '../../interview/interviewProfile/interview-total-summary-card'
import InterviewPromotion from '../../interview/interviewProfile/interview-promotion'
import InterviewList from '../../interview/interviewProfile/interview-list'

import { UserDataType } from '../../../context/types';
import RectangularCard from '../../BaseUI/RectangularCard/RectangularCard';

const InterviewAssembled= () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const squareAspectRatio = isSmallScreen?2:1
  const rectangleAspectRatio = isXSmallScreen?1.5:7.2/2.3

  return (
    <>
      <UserProfileHeader/>

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

export default InterviewAssembled;
