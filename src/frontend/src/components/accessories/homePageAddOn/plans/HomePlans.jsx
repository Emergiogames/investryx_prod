import React, { useEffect, useState } from 'react'
import Subscription from '../../../../pages/subscription/Subscription';

function HomePlans({props}) {
    const planData = props
    console.log('plan data @homepage::', planData);
    
  return (
    <>
    
   <Subscription />
    </>
  )
}

export default HomePlans