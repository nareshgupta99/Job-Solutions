import React, { useEffect, useState } from 'react'
import Category from '../category/Category'
import Fotter from '../footer/Fotter'
import Slider from '../slider/Slider'
import Preloader from '../preloader/Preloader'
import useDelayedRender from '../../hooks/useDelayedRender'
import ApplyProcess from '../process/ApplyProcess'

function Home() { 
 const showComponent=useDelayedRender(100);

  
  return showComponent ? (
    <div>
      <Slider />
      <Category />
      <ApplyProcess />
      <Fotter/>
    </div>
  ) : (
    <Preloader />
  );
}

export default Home