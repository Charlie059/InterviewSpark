/***********************************************************************************************
 * This is Illustration image for /appsumo page
 *
 * It contains two part: Logo and Picture, Logo part contains InterviewSpark logo,
 * heart, and Appsumo logo.Picture part contains a key-lock picture
 * When windows size is smaller than sm, the Picture part will disappear to create
 * a neater appearance
 *
 * Author: Yuxuan Yang
 * Contact: yyx980325@hotmail.com
 * Create Date: 11/08/2023
 * Update Date: 11/08/2023
 * Copyright: © 2023 HireBeat Inc. All rights reserved.
 ************************************************************************************************/

import React from 'react';
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const AppsumoIllustration = () => {
  const theme = useTheme()
  const isSMDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box display="flex"
         flexDirection="column"
         alignItems="center"
         justifyContent="center">

      {/**************LOGO**************/}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <Box>
          <img
            src={process.env.NEXT_PUBLIC_S3_BUCKET_PUBLIC_URL + 'Logo.svg'}
            alt='First Logo'
            width={200}
            style={{maxWidth: '100%', height: 'auto'}}
          />
        </Box>
        <Box mb={2} mr={1}> {/* mb is margin-bottom */}
          <img
            src="/images/icons/appsumo-icons/heart.svg"
            alt='Heart'
            width={30}
            style={{maxWidth: '100%', height: 'auto'}}
          />
        </Box>
        <Box mb={2} ml={1}>  {/* ml is margin-left */}
          <img
            src="/images/icons/appsumo-icons/appsumo-logo.svg"
            alt='Second Logo'
            width={150}
            style={{maxWidth: '100%', height: 'auto'}}
          />
        </Box>
      </Box>
      {/**************Picture**************/}
      {
        !isSMDown && (
          <Box mb={2}>
            <img
              src="/images/icons/appsumo-icons/locks-and-keys.png"
              alt='Second Logo'
              width={380}
              style={{maxWidth: '100%', height: 'auto', marginTop:'-80px'}}
            />
          </Box>
        )
      }
    </Box>
  );
};

export default AppsumoIllustration;
