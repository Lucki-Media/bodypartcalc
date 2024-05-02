import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import ImageMapper from 'react-img-mapper';
import styles from './HairMap.module.css';
// import { RadioGroup, RadioButton } from 'react-radio-buttons';


const HairMapping = () => {
    const [selectedArea, setSelectedArea] = useState(false);
    const [selectedpopupArea, setselectedpopupArea] = useState('');
    const [activeFirst, setactiveFirst] = useState('');
    const [activesecond, setactivesecond] = useState('');
    const [activeThird, setactiveThird] = useState('');
    const [activeFour, setactiveFour] = useState('');
    const [activeFive, setactiveFive] = useState('');
    const [activeSix, setactiveSix] = useState('');
    const [activeSeven, setactiveSeven] = useState('');
    const [cookies, setCookie] = useCookies(["hairZone"]);
    const [selectedRadioValue, setSelectedRadioValue] = useState('minimal');
    const [hairSeverity, sethairSeverity] = useState([]);

    //FOR FILL COLOR
    // const [activefillFirst, setactivefillFirst] = useState('');
    // const [activefillsecond, setactivefillsecond] = useState('');
    // const [activefillThird, setactivefillThird] = useState('');
    // const [activefillFour, setactivefillFour] = useState('');
    // const [activefillFive, setactivefillFive] = useState('');
    // const [activefillSix, setactivefillSix] = useState('');
    // const [activefillSeven, setactivefillSeven] = useState('');



    const handleRadioChange = (event) => {
        setSelectedRadioValue(event.target.value);
        console.log(event.target.value);
    };

    useEffect(() => {
        setCookie('hairZone', hairSeverity, { path: '/' });
    }, [hairSeverity]);


    const handleAreaClick = (area) => {
        //  setCookie('hairZone', area.name+"-"+selectedRadioValue, { path: '/' }); 
        //console.log('test', area.name);
        // area 1
        //console.log(e);
        setselectedpopupArea(area.name);
        if (area.name === '1' && area.preFillColor === '') {
            setactiveFirst("#77c4ffb5");
            setTimeout(() => {
                setSelectedArea(true);
            }, "500");
        }
        // area 2
        else if (area.name === '2' && area.preFillColor === '') {
            setactivesecond("#77c4ffb5");
            setTimeout(() => {
                setSelectedArea(true);
            }, "500");
        }
        // area 3
        else if (area.name === '3' && area.preFillColor === '') {
            setactiveThird("#77c4ffb5");
            setTimeout(() => {
                setSelectedArea(true);
            }, "500");
        }
        // area 4 
        else if (area.name === '4' && area.preFillColor === '') {
            setactiveFour("#77c4ffb5");
            setTimeout(() => {
                setSelectedArea(true);
            }, "500");

        }
        // area 5
        else if (area.name === '5' && area.preFillColor === '') {
            setactiveFive("#77c4ffb5");
            setTimeout(() => {
                setSelectedArea(true);
            }, "500");
        }
        // area 6
        else if (area.name === '6' && area.preFillColor === '') {
            setactiveSix("#77c4ffb5");
            setTimeout(() => {
                setSelectedArea(true);
            }, "500");

        }
        // area 7
        else if (area.name === '7' && area.preFillColor === '') {
            setactiveSeven("#77c4ffb5");
            setTimeout(() => {
                setSelectedArea(true);
            }, "500");
        }
        else if (area.name === '1' && area.preFillColor !== '') {
            setactiveFirst("");
        }
        else if (area.name === '2' && area.preFillColor !== '') {
            setactivesecond("");
        }
        // area 3
        else if (area.name === '3' && area.preFillColor !== '') {
            setactiveThird("");
        }
        // area 4 
        else if (area.name === '4' && area.preFillColor !== '') {
            setactiveFour("");
        }
        // area 5
        else if (area.name === '5' && area.preFillColor !== '') {
            setactiveFive("");

        }
        // area 6
        else if (area.name === '6' && area.preFillColor !== '') {
            setactiveSix("");
        }
        // area 7
        else if (area.name === '7' && area.preFillColor !== '') {
            setactiveSeven("");
        }
    };


    const handlePopupClose = () => {
        setSelectedArea(false);
        if (selectedpopupArea && selectedRadioValue) {
            var arr = [...hairSeverity]; //copy array by value
            let myObject = { number: selectedpopupArea, value: selectedRadioValue };
            arr.push(myObject)
            sethairSeverity(arr)
        }
    };

    useEffect(() => {
        // Effect code here...
    }, [activeFirst, activesecond, activeThird, activeFour, activeFive, activeSix, activeSeven]);


    // console.log('REACT_APP_URL', process.env.REACT_APP_URL);
    // console.log('REACT_APP_PLUGIN_MEDIA_PATH_URL', process.env.REACT_APP_PLUGIN_MEDIA_PATH_URL);

    const renderPopup = () => {
        if (selectedArea) {
            return (
                <div className={styles.hair_type_popup} >

                    <div className={styles.radio_popup}>
                        <p> Choose zone {selectedpopupArea} Hair loss severity:</p>
                        <form className={styles.popup_block}>
                            <div className={styles.input_style_fiels}>
                                <label htmlFor="Minimal">
                                    <input
                                        type="radio"
                                        name="hairZone"
                                        id="Minimal"
                                        value="Minimal"
                                        onChange={handleRadioChange}
                                        defaultChecked={true}
                                    />
                                    Minimal
                                </label>
                            </div>
                            <div className={styles.input_style_fiels}>
                                <label htmlFor="Moderate">
                                    <input
                                        type="radio"
                                        name="hairZone"
                                        id="Moderate"
                                        value="Moderate"
                                        onChange={handleRadioChange}
                                    />
                                    Moderate
                                </label>
                            </div>
                            <div className={styles.input_style_fiels}>
                                <label htmlFor="Severe">
                                    <input
                                        type="radio"
                                        name="hairZone"
                                        id="Severe"
                                        value="Severe"
                                        onChange={handleRadioChange}
                                    />
                                    Severe
                                </label>
                            </div>
                        </form>
                        <div className={styles.hairMapping_Select_btn}>
                            <button onClick={handlePopupClose} className={`bb_button ${styles.submit_button}`}>Select</button></div>
                        <div>

                        </div>
                    </div>
                </div>
            );

        }
    };






    const MAP = {
        name: "my-map",
        areas: [
            { name: "1", shape: "poly", preFillColor: activeFirst, coords: [109, 101, 121, 100, 130, 99, 140, 97, 148, 95, 156, 93, 152, 101, 151, 106, 146, 113, 143, 119, 141, 125, 137, 130, 133, 118, 128, 110, 120, 105], strokeColor: "#ffffff8c", fillColor: "#ffffff8c" },
            { name: "2", shape: "poly", preFillColor: activesecond, coords: [81, 93, 88, 100, 97, 103, 106, 103, 116, 103, 126, 101, 134, 99, 142, 96, 150, 93, 131, 88, 121, 83, 112, 77, 105, 70, 95, 75, 87, 82], strokeColor: "#ffffff8c", fillColor: "#ffffff8c" },
            { name: "3", shape: "poly", preFillColor: activeThird, coords: [107, 68, 109, 75, 119, 80, 123, 84, 130, 87, 140, 92, 154, 95, 155, 88, 154, 79, 154, 70, 152, 59, 147, 50, 134, 54, 118, 61], fillColor: "#ffffff8c", strokeColor: "#ffffff8c" },
            { name: "4", shape: "poly", preFillColor: activeFour, coords: [140, 131, 148, 124, 156, 117, 166, 111, 175, 107, 184, 103, 194, 99, 205, 96, 216, 95, 227, 95, 235, 95, 242, 95, 250, 97, 233, 89, 222, 83, 212, 76, 206, 68, 198, 60, 191, 48, 182, 48, 173, 48, 163, 49, 151, 50, 154, 60, 157, 69, 157, 79, 157, 89, 154, 102, 149, 113], fillColor: activeFour, strokeColor: "#ffffff8c" },
            { name: "5", shape: "poly", preFillColor: activeFive, coords: [190, 49, 197, 54, 204, 58, 210, 60, 216, 63, 224, 67, 230, 70, 237, 73, 242, 75, 249, 78, 258, 79, 269, 80, 266, 73, 257, 64, 250, 60, 235, 53, 225, 49, 211, 46, 201, 46], fillColor: "#ffffff8c", strokeColor: "#ffffff8c" },
            { name: "6", shape: "poly", preFillColor: activeSix, coords: [190, 49, 202, 56, 214, 62, 223, 67, 231, 70, 239, 74, 251, 77, 261, 78, 270, 79, 277, 85, 281, 89, 284, 94, 288, 100, 292, 106, 277, 101, 267, 99, 255, 96, 243, 92, 232, 89, 222, 84, 211, 76, 201, 66], fillColor: "#ffffff8c", strokeColor: "#ffffff8c" },
            { name: "7", shape: "poly", preFillColor: activeSeven, coords: [302, 156, 288, 158, 277, 161, 261, 161, 247, 157, 240, 155, 229, 150, 222, 143, 216, 137, 206, 131, 198, 127, 191, 124, 180, 122, 168, 121, 159, 124, 148, 127, 153, 120, 161, 116, 167, 109, 179, 106, 186, 103, 199, 100, 206, 98, 214, 97, 225, 98, 236, 97, 247, 97, 258, 99, 270, 102, 281, 104, 287, 106, 294, 109, 299, 119, 302, 132, 301, 142, 302, 149], fillColor: "#ffffff8c", strokeColor: "#ffffff8c" },
        ]
    };
    const MAP2 = {
        name: "my-map2",
        areas: [
            { name: "1", preFillColor: activeFirst, shape: "poly", coords: [86, 233, 98, 230, 106, 230, 115, 232, 122, 235, 124, 224, 124, 212, 124, 202, 114, 204, 105, 210, 96, 219], strokeColor: "#ffffff8c", fillColor: "#ffffff8c" },
            { name: "1", preFillColor: activeFirst, shape: "poly", coords: [227, 200, 226, 211, 224, 218, 224, 227, 224, 233, 233, 230, 240, 228, 248, 229, 253, 230, 261, 232, 266, 233, 258, 224, 248, 216, 238, 209], strokeColor: "#ffffff8c", fillColor: "#ffffff8c" },
            { name: "2", preFillColor: activesecond, shape: "poly", coords: [125, 197, 132, 204, 134, 213, 139, 221, 138, 232, 141, 241, 146, 245, 155, 249, 165, 250, 181, 251, 188, 250, 198, 247, 206, 241, 210, 234, 209, 226, 211, 214, 214, 207, 222, 200, 223, 212, 224, 222, 223, 234, 222, 245, 215, 258, 208, 268, 200, 275, 190, 280, 180, 283, 168, 284, 162, 282, 150, 278, 139, 270, 133, 262, 128, 252, 124, 231, 124, 218, 123, 208], fillColor: "#ffffff8c", strokeColor: "#ffffff8c" },
            { name: "3", preFillColor: activeThird, shape: "poly", coords: [124, 196, 134, 194, 143, 190, 153, 187, 165, 184, 178, 184, 186, 185, 193, 186, 199, 188, 207, 190, 212, 195, 219, 200, 213, 208, 209, 214, 209, 223, 208, 233, 204, 239, 198, 246, 192, 249, 182, 250, 174, 252, 164, 252, 153, 248, 142, 242, 137, 232, 134, 220, 134, 207], fillColor: "#ffffff8c", strokeColor: "#ffffff8c" },
            { name: "4", preFillColor: activeFour, shape: "poly", coords: [89, 224, 99, 219, 108, 211, 119, 204, 130, 198, 142, 193, 156, 189, 164, 187, 171, 186, 179, 186, 188, 187, 199, 189, 206, 190, 212, 193, 219, 196, 225, 199, 236, 206, 246, 212, 252, 219, 262, 226, 254, 214, 250, 204, 243, 190, 240, 180, 235, 165, 232, 158, 229, 147, 224, 130, 217, 139, 210, 146, 203, 151, 194, 154, 184, 156, 170, 156, 160, 155, 151, 151, 142, 146, 134, 139, 126, 127, 123, 141, 121, 148, 118, 162, 113, 171, 109, 184, 104, 194, 97, 208, 93, 214], fillColor: "#ffffff8c", strokeColor: "#ffffff8c" },
            { name: "5", preFillColor: activeFive, shape: "poly", coords: [155, 151, 164, 154, 173, 156, 184, 154, 191, 151, 196, 146, 200, 142, 202, 132, 198, 124, 191, 118, 183, 112, 170, 112, 159, 115, 154, 120, 150, 127, 147, 132, 145, 138, 149, 145], fillColor: "#ffffff8c", strokeColor: "#ffffff8c" },
            { name: "6", preFillColor: activeSix, shape: "poly", coords: [151, 149, 146, 133, 150, 126, 155, 119, 163, 116, 169, 113, 179, 113, 187, 117, 196, 123, 200, 131, 199, 141, 194, 149, 202, 149, 208, 143, 220, 131, 224, 122, 221, 104, 214, 95, 205, 87, 191, 81, 180, 78, 166, 79, 153, 83, 141, 89, 131, 99, 124, 111, 124, 124, 130, 134, 137, 143, 142, 146], fillColor: "#ffffff8c", strokeColor: "#ffffff8c" },
            { name: "7", preFillColor: activeSeven, shape: "poly", coords: [79, 233, 88, 220, 94, 209, 102, 193, 108, 182, 114, 167, 117, 154, 120, 138, 122, 124, 124, 113, 129, 100, 139, 90, 151, 83, 163, 80, 180, 79, 187, 80, 194, 82, 203, 86, 214, 95, 222, 109, 224, 124, 226, 135, 229, 146, 230, 156, 234, 165, 237, 175, 241, 185, 247, 198, 251, 208, 259, 217, 264, 223, 267, 228, 265, 215, 260, 200, 258, 187, 255, 174, 254, 159, 253, 144, 252, 130, 253, 119, 256, 104, 255, 91, 249, 77, 238, 66, 226, 61, 213, 55, 198, 52, 184, 52, 169, 51, 155, 51, 145, 52, 132, 57, 122, 61, 113, 67, 104, 74, 96, 80, 94, 92, 92, 104, 96, 115, 95, 124, 96, 137, 95, 148, 94, 159, 93, 168, 88, 193, 90, 184, 84, 208], fillColor: "#ffffff8c", strokeColor: "#ffffff8c" },
        ]
    };


    return (
        <>
            <div className={styles.horizontal_tab_row}>
                <div className={styles.image_left}>
                    <ImageMapper
                        src={process.env.REACT_APP_URL + '/' + process.env.REACT_APP_PLUGIN_MEDIA_PATH_URL + 'side_img.png'}
                        map={MAP}
                        onClick={handleAreaClick}
                    // onMouseEnter={handleMouse} 
                    // onMouseLeave={handleMouseLeave}

                    />
                </div>
                <div className={styles.image_right}>
                    <ImageMapper
                        src={process.env.REACT_APP_URL + '/' + process.env.REACT_APP_PLUGIN_MEDIA_PATH_URL + 'top_img.png'}
                        map={MAP2}
                        onClick={handleAreaClick}
                    // onMouseEnter={handleMouse} 
                    // onMouseLeave={handleMouseLeave}
                    />
                </div>
            </div>
            <div className={styles.rendered_clickpopup}>
                {renderPopup()}
            </div>
        </>
    );

};

export default HairMapping;
