/***********************************************************************************************
 * This is/appsumo page
 *
 * For UI layout, please refer to AssembledUI/AppsomoAssembled.tsx
 *
 * Author: Yuxuan Yang
 * Contact: yyx980325@hotmail.com
 * Create Date: 11/08/2023
 * Update Date: 11/08/2023
 * Copyright: © 2023 HireBeat Inc. All rights reserved.
 ************************************************************************************************/

import {ReactNode} from "react";
import BlankLayout from "../../@core/layouts/BlankLayout";
import AppsomoAssembled from "../../components/AssembledUI/AppsomoAssembled";

const AppsumoPage = () => {
  return <AppsomoAssembled/>
}

AppsumoPage.guestGuard = true
AppsumoPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default AppsumoPage;
