import React, { useState, useEffect, useRef } from 'react';
import ImageMapper from 'react-img-mapper';
import styles from './HairMap.module.css';
import side_img from "../../../image/side_img.png";
import top_img from "../../../image/top_img.png";
import areasJSON from '../HairMapping/data.json';
import areasMap2JSON from '../HairMapping/data-map2.json';

const HairMapping = (props) => {
    const [selectedArea, setSelectedArea] = useState(null);
    const sideMapRef = useRef(null);
    const topMapRef = useRef(null);

    console.log(sideMapRef);
    const initializeAreas = (areas) => {
        // Loop through each area and set the fillColor based on the active state
        return areas.map((area) => ({
            ...area,
            fillColor: area.active ? "red" : area.fillColor || "#ffffff8c", // Set fillColor to "red" if active, or use original fillColor, or default to "#ffffff8c"
        }));
    };

    const [mappedAreas, setMappedAreas] = useState({
        myMap: initializeAreas(areasJSON),
        myMap2: initializeAreas(areasMap2JSON),
    });



    const handleAreaClick = (area, index, event) => {
        area.active = true;
        area.fillColor = "#77c4ffb5";
        setSelectedArea(area);
    };   

    const handlePopupClose = () => {
        setSelectedArea(null);
    };

    const renderPopup = () => {
        if (!selectedArea) return null;

        return (
            <div className={styles.popup}>
                <h2>{selectedArea.name}</h2>
                <p>This is the popup content for {selectedArea.name}.</p>
                <button onClick={handlePopupClose}>Close</button>
            </div>
        );
    };

    return (
        <>
            <div className={styles.horizontal_tab_row}>
                <div className={`${styles.image_left} image-left`} ref={sideMapRef}>
                    <ImageMapper
                        src={side_img}
                        onClick={handleAreaClick}
                        map={{ name: 'myMap', areas: mappedAreas.myMap,alt:"myname" }}
                        fillColor='rgba(255, 255, 255, 0.5)'
                        {...props}
                    />
                </div>
                <div className={`${styles.image_right} image-right`} ref={topMapRef}>
                    <ImageMapper
                        src={top_img}
                        onClick={handleAreaClick}
                        map={{ name: 'myMap2', areas: mappedAreas.myMap2  }}
                        strokeColor={"#000"}
                        mappedAreas={{name: 'myMap2', areas: mappedAreas.myMap2}}
                        {...props}
                    />
                </div>
            </div>

            <div className={styles.selected_popup}>
                {renderPopup()}
            </div>
        </>
    );
};

export default HairMapping;
