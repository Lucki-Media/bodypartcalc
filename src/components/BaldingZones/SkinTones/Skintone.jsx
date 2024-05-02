import React, { useState, useEffect } from "react";

import { useCookies } from 'react-cookie'; // Import useCookies hook
import styles from "./skintone.module.css";
import Main_desc from "../../MainContent/MainDesc";

const Skintone = ({onNext , onPrev}) => {
 
  const [cookies, setCookie] = useCookies(['skinTone']); // Define skinTone cookie
  const [skinToneData, setSkinToneData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch(`${process.env.REACT_APP_URL}` + "/wp-json/bmh-hair-calculator/v1/data")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSkinToneData(data.skin_tone);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Set default selected skin tone value in the cookies when component mounts
    if (skinToneData && skinToneData.length > 0 && !cookies.skinTone) {
      const defaultSkinTone = skinToneData[0].text_f;
      setCookie('skinTone', defaultSkinTone, { path: '/' }); // Set the skinTone cookie
    }
  }, [skinToneData, cookies.skinTone, setCookie]);

  // Function to handle radio button change
  const handleSkinToneChange = (event) => {
    const selectedSkinTone = event.target.value;
    setCookie('skinTone', selectedSkinTone, { path: '/' }); // Set the skinTone cookie
  };



  return (
    <div>
      {loading ? (
        <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
      ) : (
        <>
          <div className="global_container">
            <div className={styles.skin_tones_section}>
              <div className={styles.left_zone}>
                <Main_desc />
              </div>
              <div className={styles.right_zone}>
                <h3 className={styles.heading}>02. Select Your Skin Tone</h3>
                <div className={styles.skin_tones_block}>
                  {skinToneData.map((item, index) => (
                    <div className={styles.tone_inner} id={item.text_f} key={index}>
                      <div className={styles.SkinBlock}>
                        <div className={styles.tone_img_block}>
                          <img
                            className={styles.tone_img}
                            src={item.img_f}
                            alt="top image"
                          />
                        </div>
                        <div className={styles.title_group}>
                          <input
                            type="radio"
                            name="skinTone"
                            value={item.text_f}
                            defaultChecked={index === 0} // Set defaultChecked for the first item
                            onChange={handleSkinToneChange} // Add onChange event handler
                          />
                          <h6 className={styles.title}>{item.text_f}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bb_navigation_page_button">
            <div className="bb_btn_block">
              <div className="bb_redirect_prev_btn">
                <button className="bb_button" onClick={onPrev}>
                  Prev
                </button>
              </div>
              <div className="bb_redirect_next_btn" onClick={onNext}>
                <button className="bb_button">
                  Next
                </button>
              </div>
            </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Skintone;
