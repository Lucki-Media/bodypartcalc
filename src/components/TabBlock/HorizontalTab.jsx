import React from 'react';
import MainDesc from '../MainContent/MainDesc';
import styles from './horizontalTab.module.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ImageMap from '../BaldingZones/ImageMap/ImageMap';


const HorizontalTab = () => {
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
                                <Tab className={styles.zone_title}>01. Select Your Balding Zones</Tab>
                                <div className={styles.side_arrow}></div>
                                <Tab className={styles.zone_title}>02. Select Your Body</Tab>
                            </TabList>

                            <TabPanel className={styles.tab_one}>
                                <div>
                                    <ImageMap/>
                                </div>
                            </TabPanel>
                            <TabPanel className={styles.tab_two}>
                                <h3>Any content 2</h3>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HorizontalTab;
