/***********************************************************************************************
  Name: FinishView.tsx
  Description: FinishView component
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/10/02
  Update Date: 2023/10/02
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import React, { FC } from 'react'
import { Typography } from '@mui/material'
import { StyledFinishView, SuccessIcon } from './FinishView.styled'

const TITLE = 'Thank you!'
const SUBTITLE = 'Your feedback has been submitted.'
const Title: FC = () => <Typography variant={'h5'}>{TITLE}</Typography>
const Subtitle: FC = () => <Typography variant={'body2'}>{SUBTITLE}</Typography>

const FinishView: FC = () => (
  <StyledFinishView>
    <SuccessIcon />
    <Title />
    <Subtitle />
  </StyledFinishView>
)

export default FinishView
