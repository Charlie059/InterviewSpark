/***********************************************************************************************
 * This is UI Layout for /appsumo page
 *
 * Author: Yuxuan Yang
 * Contact: yyx980325@hotmail.com
 * Create Date: 11/08/2023
 * Update Date: 11/08/2023
 * Copyright: © 2023 HireBeat Inc. All rights reserved.
 ************************************************************************************************/

import AppsumoIllustration from '../appsumo/appsumo_illustration'
import AppsumoForm from '../appsumo/appsumo_form'
import Grid from '@mui/material/Grid'

const AppsumoAssembled = () => {
  return (
    <div>
      <Grid container spacing={2} alignItems='center' style={{ height: '100%' }} justifyContent='center'>
        <Grid item xs={12} sm={6}>
          <AppsumoIllustration />
        </Grid>

        <Grid item xs={12} sm={6}>
          <AppsumoForm />
        </Grid>
      </Grid>
    </div>
  )
}

export default AppsumoAssembled
