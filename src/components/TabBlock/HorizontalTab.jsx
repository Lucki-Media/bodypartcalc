import React from "react";

import MainDesc from "../MainContent/MainDesc";
import styles from "./horizontalTab.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import HairMapping from "../BaldingZones/HairMapping/HairMapping";
import BodyZones from "../BodyZones/BodyZones";

const HorizontalTab = ({onNext}) => {

  return (
    <>
      <div className="global_container">
        <div className={styles.zones_block}>
          <div className={styles.left_zone}>
            <MainDesc />
          </div>
          <div className={styles.right_zone}>
            <Tabs>
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
                <BodyZones />
              </TabPanel>
            </Tabs>
          </div>
        </div>

      <div className="bb_navigation_page_button">
        <div className="bb_redirect_next_btn">
          <button className="bb_button" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default HorizontalTab;
