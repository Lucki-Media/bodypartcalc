import React from 'react';
import styles from './imageMap.module.css';
import side_img from "../../../image/side_img.png";
import top_img from "../../../image/top_img.png";
const ImageMap = () => {
    return (
        <>
            <div className={styles.img_group}>
                <div className={styles.side_img_block}>
                    <img className={styles.side_img} src={side_img} alt="side image" />
                </div>
                <div className={styles.top_img_block}>
                    <img className={styles.top_img} src={top_img} alt="top image" />
                </div>
            </div>
        </>
    )
}

export default ImageMap;
