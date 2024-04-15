import React, { useEffect, useState } from 'react'
import Category from '../category/Category'
import Fotter from '../footer/Fotter'
import Slider from '../slider/Slider'
import Preloader from '../preloader/Preloader'
import useDelayedRender from '../../hooks/useDelayedRender'

function Home() { 
 const showComponent=useDelayedRender(1000);

  
  return showComponent ? (
    <div>
      <Slider />
      <Category />
      <Fotter/>
    </div>
  ) : (
    <Preloader />
  );
}

export default Home