import React from 'react';
import { Slide } from 'react-slideshow-image';
import iphoneMockup from '../img/iPhoneX.png';
import iphoneMockup2 from '../img/iPhoneX2.png';
const slideImages = [
  iphoneMockup,
  iphoneMockup2,
];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: false,
  arrows: false,
}
const Slideshow = () => {
  return (
    <Slide {...properties}>
      <div className="each-slide">
        <div className="image-container">
            <img className="phone-mockup" src={slideImages[0]}/>
        </div>
      </div>
      <div className="each-slide">
        <div className="image-container">
            <img className="phone-mockup" src={slideImages[1]}/>
        </div>
      </div>
    </Slide>
  )
}

export default Slideshow;