import React ,{useState} from 'react';
import styles from './bodyZones.module.css';
import rightArrow from "../../image/rightArrow.svg"
const BodyZones = () => {
    const [currentComponent, setCurrentComponent] = useState('ResultFinalBlock');
    const showNextComponent = (componentName) => {
        setCurrentComponent(componentName);
      };

      const handlepageRedirect= (value) =>  {
        props.
      };
    return (
        <>
            <div className={styles.selectBody_section}>
                <div className={styles.Body_section}>
                    <div className={styles.female_bodysection}>
                        <div className={styles.bodyPart}>
                            <a href="#javascript:;" className={styles.body_part_link} onClick={() => handlepageRedirect('Female-Face')}>
                                <h3 className={styles.heading}>01. Face</h3>
                                <h5 className={styles.sub_heading}>read more <img src={rightArrow} alt="" /></h5>
                            </a>
                        </div>
                        <div className={styles.bodyPart}>
                            <ul className={styles.bodyPart_center}>
                                <li>
                                    <a href="javascript:;" className={styles.body_part_link} onClick={() => handlepageRedirect('Female-Arms')}>
                                        <h3 className={styles.heading}>02. Arms</h3>
                                        <h5 className={styles.sub_heading}>read more <img src={rightArrow} alt="" /></h5>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;" className={styles.body_part_link} onClick={() => handlepageRedirect('Female-Breast')}>
                                        <h3 className={styles.heading}>03. Breast</h3>
                                        <h5 className={styles.sub_heading}>read more <img src={rightArrow} alt="" /></h5>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;" className={styles.body_part_link} onClick={() => handlepageRedirect('Female-Abdomen')}>
                                        <h3 className={styles.heading}>04. Abdomen</h3>
                                        <h5 className={styles.sub_heading}>read more <img src={rightArrow} alt="" /></h5>
                                    </a>
                                </li>
                            </ul>

                        </div>
                        <div className={styles.bodyPart}>
                            <a href="javascript:;" className={styles.body_part_link} onClick={() => handlepageRedirect('Female-Legs')}>
                                <h3 className={styles.heading}>05. Legs/knees</h3>
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
                            <a href="javascript:;" className={styles.body_part_link} onClick={() => handlepageRedirect('Male-Face')} >
                                <h3 className={styles.heading}>Face .01</h3>
                                <h5 className={styles.sub_heading}>read more <img src={process.env.REACT_APP_URL + '/' + process.env.REACT_APP_PLUGIN_MEDIA_PATH_URL + 'rightArrow.svg'} alt="" /></h5>

                            </a>
                        </div>
                        <div className={styles.bodyPart}>
                            <ul className={styles.bodyPart_center}>
                                <li>
                                    <a href="javascript:;" className={styles.body_part_link} onClick={() => handlepageRedirect('Male-Arms')} >
                                        <h3 className={styles.heading}>Arms .02</h3>
                                        <h5 className={styles.sub_heading}>read more <img src={rightArrow} alt="" /></h5>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;" className={styles.body_part_link} onClick={() => handlepageRedirect('Male-Breast')} >
                                        <h3 className={styles.heading}>Breast .03</h3>
                                        <h5 className={styles.sub_heading}>read more <img src={rightArrow} alt="" /></h5>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;" className={styles.body_part_link} onClick={() => handlepageRedirect('Male-Abdomen')} >
                                        <h3 className={styles.heading}>Abdomen .04</h3>
                                        <h5 className={styles.sub_heading}>read more <img src={rightArrow} alt="" /></h5>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.bodyPart}>
                            <a href="javascript:;" className={styles.body_part_link} onClick={() => handlepageRedirect('Male-Legs')} >
                                <h3 className={styles.heading}>Legs/knees .05</h3>
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
