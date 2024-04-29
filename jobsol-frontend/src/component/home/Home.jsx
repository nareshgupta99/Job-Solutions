import React, { useEffect, useState } from 'react'
import Category from '../category/Category'
import Fotter from '../footer/Fotter'
import Slider from '../slider/Slider'
import Preloader from '../preloader/Preloader'
import useDelayedRender from '../../hooks/useDelayedRender'
import ApplyProcess from '../process/ApplyProcess'
import EmployeerBanner from '../employeer/EmployeerBanner'

function Home() { 
//  const showComponent=useDelayedRender(100);

  
  return (
    <div>
      <Slider />
      <Category />
      <ApplyProcess />
      <EmployeerBanner />
      <Fotter/>
    </div>
  ) 
}

export default Home