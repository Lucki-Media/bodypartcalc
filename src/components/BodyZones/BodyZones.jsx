import React, {useState} from 'react';
import styles from './bodyZones.module.css';
import rightArrow from "../../image/rightArrow.svg"
const BodyZones = () => {
    const [currentComponent, setCurrentComponent] = useState('ResultFinalBlock');
    const showNextComponent = (componentName) => {
        setCurrentComponent(componentName);
      };

      const handlepageRedirect= (value) =>  {
        console.log(value);
      };
    return (
        <>
            <div className={styles.selectBody_section}>
                <div className={styles.Body_section}>
                    <div className={styles.female_bodysection}>
                        <div className={styles.bodyPart}>
                            <a href="#" className={styles.body_part_link} onClick={() => handlepageRedirect('Female-Face')} >
                                <h3 className={styles.heading}>01. Face</h3>
                                <h5 className={styles.sub_heading}>read more <img src={rightArrow} alt="" /></h5>
                            </a>
                        </div>
                        <div className={styles.bodyPart}>
                            <a href="#" className={styles.body_part_link} onClick={() => handlepageRedirect('Female-Chest')}>
                                <h3 className={styles.heading}>02. Chest</h3>
                                <h5 className={styles.sub_heading}>read more <img src={rightArrow} alt="" /></h5>
                            </a>
                        </div>
                        <div className={styles.bodyPart}>
                            <a href="#" className={styles.body_part_link} onClick={() => handlepageRedirect('Female-Hip')}>
                                <h3 className={styles.heading}>03. Hip</h3>
                                <h5 className={styles.sub_heading}>read more <img src={rightArrow} alt="" /></h5>
                            </a>
                        </div>
                        <div className={styles.bodyPart}>
                            <a href="#" className={styles.body_part_link} onClick={() => handlepageRedirect('Female-Foot')}>
                                <h3 className={styles.heading}>04. Foot</h3>
                                <h5 className={styles.sub_heading}>read more <img src={rightArrow} alt="" /></h5>
                            </a>
                        </div>
                    </div>
                    <div className={styles.bodyImg_section}>
                        <img
                            className={styles.bodyZoneimg}
                            src={process.env.REACT_APP_URL + '/' + process.env.REACT_APP_PLUGIN_MEDIA_PATH_URL + 'bodyZoneimg.png'}
                            alt="bodyZone img"
                        />
                    </div>
                    <div className={styles.male_bodysection}>
                        <div className={styles.bodyPart}>
                            <a href="#" className={styles.body_part_link} onClick={() => handlepageRedirect('Male-Face')} >
                                <h3 className={styles.heading}>Face .01</h3>
                                <h5 className={styles.sub_heading}>read more <img src={process.env.REACT_APP_URL + '/' + process.env.REACT_APP_PLUGIN_MEDIA_PATH_URL + 'rightArrow.svg'} alt="" /></h5>
                                
                            </a>
                        </div>
                        <div className={styles.bodyPart}>
                            <a href="#" className={styles.body_part_link} onClick={() => handlepageRedirect('Female-Chest')}>
                                <h3 className={styles.heading}>Chest .02</h3>
                                <h5 className={styles.sub_heading}>read more <img src={process.env.REACT_APP_URL + '/' + process.env.REACT_APP_PLUGIN_MEDIA_PATH_URL + 'rightArrow.svg'} alt="" /></h5>
                            </a>
                        </div>
                        <div className={styles.bodyPart}>
                            <a href="#" className={styles.body_part_link} onClick={() => handlepageRedirect('Male-Hip')}>
                                <h3 className={styles.heading}>Hip .03</h3>
                                <h5 className={styles.sub_heading}>read more <img src={process.env.REACT_APP_URL + '/' + process.env.REACT_APP_PLUGIN_MEDIA_PATH_URL + 'rightArrow.svg'} alt="" /></h5>
                            </a>
                        </div>
                        <div className={styles.bodyPart}>
                            <a href="#" className={styles.body_part_link} onClick={() => handlepageRedirect('Male-Foot')}>
                                <h3 className={styles.heading}>Foot .04</h3>
                                <h5 className={styles.sub_heading}>read more <img src={process.env.REACT_APP_URL + '/' + process.env.REACT_APP_PLUGIN_MEDIA_PATH_URL + 'rightArrow.svg'} alt="" /></h5>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BodyZones;
