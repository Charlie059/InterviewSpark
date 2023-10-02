/***********************************************************************************************
  Name: FinishView.styled.tsx
  Description: FinishView component styled-components
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/10/02
  Update Date: 2023/10/02
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import styled from 'styled-components'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const StyledFinishView = styled.div`
  text-align: center;
  padding: 20px;
`

const SuccessIcon = styled(CheckCircleOutlineIcon)`
  font-size: 100px;
  color: #4caf50;
`

export { StyledFinishView, SuccessIcon }
