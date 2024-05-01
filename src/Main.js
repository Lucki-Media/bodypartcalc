import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MainDesc from './components/MainContent/MainDesc';
// import Counter from './components/CounterNo/Counter';
// import BodyZones from './components/BodyZones/BodyZones';
import HorizontalTab from './components/TabBlock/HorizontalTab';
import Skintone from './components/BaldingZones/SkinTones/Skintone';
import HairTypeSection from './components/BaldingZones/HairTypeSection/HairTypeSection';
import HairColor from './components/BaldingZones/HairColorSection/HairColor';
import HtContactForm from './components/HtContactForm/HtContactForm';

function Main() {
  return (
    <>
    {/* <HorizontalTab/> */}
    {/* <MainDesc/> */}
    {/* <Counter/> */}
    {/* <Skintone/> */}
    {/* <HairTypeSection/> */}
    {/* <BodyZones/> */}
    {/* <HairColor/> */}
    {/* <HtContactForm/> */}
    <Router basename={process.env.REACT_APP_BASE}>
    <Routes>
          <Route path="/" element={<HorizontalTab />} />
          <Route path="/horizontalTab" element={<HorizontalTab />} />
          <Route path="/skintone" element={<Skintone/>} />
          <Route path="/hairTypeSection" element={<HairTypeSection/>} />
          <Route path="/hairColor" element={<HairColor/>} />
          <Route path="/htContactForm" element={<HtContactForm/>} />
        </Routes>
      </Router>

    </>
  )
}

export default Main;
