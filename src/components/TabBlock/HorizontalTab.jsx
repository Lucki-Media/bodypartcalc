import React from "react";
import { useNavigate } from "react-router-dom";
import MainDesc from "../MainContent/MainDesc";
import styles from "./horizontalTab.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import HairMapping from "../BaldingZones/HairMapping/HairMapping";
import BodyZones from "../BodyZones/BodyZones";

const HorizontalTab = () => {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/skintone");
  };
  return (
    <>
      <div class="global_container">
        <div className={styles.zones_block}>
          <div className={styles.left_zone}>
            <MainDesc />
          </div>
          <div className={styles.right_zone}>
            <Tabs>
              <TabList className={styles.tab_group}>
                <Tab className={styles.zone_title}>
                  01. Select Your Balding Zones
                </Tab>
                <div className={styles.side_arrow}></div>
                <Tab className={styles.zone_title}>02. Select Your Body</Tab>
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
        <div className="bb_redirect_next_btn">
          <button className="bb_button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default HorizontalTab;
