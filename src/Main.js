import React, { useState, useEffect } from "react";
import HorizontalTab from './components/TabBlock/HorizontalTab';
import Skintone from './components/BaldingZones/SkinTones/Skintone';
import HairTypeSection from './components/BaldingZones/HairTypeSection/HairTypeSection';
import HairColor from './components/BaldingZones/HairColorSection/HairColor';
import HtContactForm from './components/HtContactForm/HtContactForm';

function Main() {
  const [currentComponent, setCurrentComponent] = useState('HorizontalTab');

  const showNextComponent = (componentName) => {
    setCurrentComponent(componentName);
  };

  const showPrevComponent = (componentName) => {
    setCurrentComponent(componentName);
  };

  return (
    <>
      {/* <div className="HairZone">
    <HorizontalTab/>   
    </div>  
    <Skintone/>
    <HairTypeSection/>
    <HairColor/>
    <HtContactForm/> */}

      <div className="Main">
        {currentComponent === 'HorizontalTab' && <HorizontalTab onNext={() => showNextComponent('Skintone')} />}
        {currentComponent === 'Skintone' && <Skintone onNext={() => showNextComponent('HairTypeSection')} onPrev={() => showPrevComponent('HorizontalTab')}  />}
        {currentComponent === 'HairTypeSection' && <HairTypeSection onNext={() => showNextComponent('HairColor')} onPrev={() => showPrevComponent('Skintone')}  />}
        {currentComponent === 'HairColor' && <HairColor onNext={() => showNextComponent('HtContactForm')} onPrev={() => showPrevComponent('HairTypeSection')} />}
        {currentComponent === 'HtContactForm' && <HtContactForm />}

      </div>
    </>
  )
}

export default Main;
