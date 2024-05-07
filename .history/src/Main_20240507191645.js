import React, { useState } from "react";
import HorizontalTab from "./components/TabBlock/HorizontalTab";
import Skintone from "./components/BaldingZones/SkinTones/Skintone";
import HairTypeSection from "./components/BaldingZones/HairTypeSection/HairTypeSection";
import HairColor from "./components/BaldingZones/HairColorSection/HairColor";
import HtContactForm from "./components/HtContactForm/HtContactForm";
import ResultBlock from "./components/ResultBlock/ResultBlock";
import ResultFinalBlock from "./components/ResultBlock/ResultFinalBlock";

function Main() {
  const [currentComponent, setCurrentComponent] = useState("HorizontalTab");
  const [selectedTabIndex, setSelectedTabIndex] = useState("1");
  const [selectedBodyPart, setSelectedBodyPart] = useState();

  const showNextComponent = (componentName) => {
    setCurrentComponent(componentName);
  };

  const showPrevComponent = (componentName) => {
    setCurrentComponent(componentName);
  };

  const handleTabSelect = (index) => {
    setSelectedTabIndex(index);
    console.log(index);
  };

  const OnClickSelectedBodyPart = (bodypart) => {
    console.log("bodypart");
    console.log(bodypart);
    setSelectedBodyPart(bodypart);
  };

  return (
    <>
      {currentComponent === "HorizontalTab" && (
        {selectedTabIndex === 1 && ()
        <HorizontalTab
          onNext={() => showNextComponent("Skintone")}
          onTabSelect={handleTabSelect}
          bodypartcallback={OnClickSelectedBodyPart} // Pass handleTabSelect function here
        />
      )}
      {currentComponent === "Skintone" && (
        <Skintone
          onNext={() => showNextComponent("HairTypeSection")}
          onPrev={() => showPrevComponent("HorizontalTab")}
        />
      )}
      {currentComponent === "HairTypeSection" && (
        <HairTypeSection
          onNext={() => showNextComponent("HairColor")}
          onPrev={() => showPrevComponent("Skintone")}
        />
      )}
      {currentComponent === "HairColor" && (
        <HairColor
          onNext={() => showNextComponent("HtContactForm")}
          onPrev={() => showPrevComponent("HairTypeSection")}
        />
      )}
      {currentComponent === "HtContactForm" && (
        <HtContactForm onNext={() => showNextComponent("ResultContent")} />
      )}
      {currentComponent === "ResultContent" && (
        <ResultBlock onNext={() => showNextComponent("ResultFinalBlock")} />
      )}
      {currentComponent === "ResultFinalBlock" && (
        <ResultFinalBlock
          selectedBodyPartCB={selectedBodyPart}
          onPrev={() => {
            showPrevComponent("HorizontalTab");
            setSelectedTabIndex(1); // Select the second tab when navigating back
          }}
        />
      )}
    </>
  );
}

export default Main;
