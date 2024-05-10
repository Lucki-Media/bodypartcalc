import { useCookies } from 'react-cookie';
import React,{useState} from "react";

import MainDesc from "../MainContent/MainDesc";
import styles from "./horizontalTab.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import HairMapping from "../BaldingZones/HairMapping/HairMapping";
import BodyZones from "../BodyZones/BodyZones";

const HorizontalTab = ({onNext , onTabSelect , bodypartcallback }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [cookies, setCookie] = useCookies(["hairZone"]);
  const [checkCookie, setCheckCookie] = useCookies(cookies.hairZone);


 
  const handleTabSelect = (index) => {
    setSelectedTabIndex(index);
    onTabSelect(index);
  };

  const onClickSelectedBodyPart = (bodypart) => {
   bodypartcallback(bodypart);
   const nextComponent = "ResultContent"; // Set the next component dynamically based on selected body part
   onNext(nextComponent);
   
  };

  useCookies

  return (
    <>
      <div className="global_container">
        <div className={styles.zones_block}>
          <div className={styles.left_zone}>
            <MainDesc />
          </div>
          <div className={styles.right_zone}>
            <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabSelect}>
              <TabList className={styles.tab_group}>
                <Tab className={`hair_tab_zone_title ${styles.zone_title}`}>
                  01. Select Your Balding Zones
                </Tab>
                <div className={styles.side_arrow}></div>
                <Tab className={`hair_tab_zone_title ${styles.zone_title}`}>02. Select Your Body</Tab>
              </TabList>

              <TabPanel className={styles.tab_one}>
                <div className={styles.hairMapping}>
                  <HairMapping />
                </div>
              </TabPanel>
              <TabPanel className={styles.tab_two}>
                <BodyZones callBack={onClickSelectedBodyPart} />
              </TabPanel>
            </Tabs>
          </div>
        </div>

        {selectedTabIndex === 0 && (
      <div className="bb_navigation_page_button">
        <div className="bb_redirect_next_btn">
          <button className={`bb_button ${checkCookie.hairZone.length === 0 ? styles.check_btn_disabled : '' }`} onClick={onNext}>
            Next 
          </button>
        </div>
      </div>
      )}
      </div>
    </>
  );
};

export default HorizontalTab;
