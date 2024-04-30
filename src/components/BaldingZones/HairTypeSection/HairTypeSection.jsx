import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'; // Import useCookies hook
import styles from "./HairType.module.css";
import Main_desc from "../../MainContent/MainDesc";

const HairTypeSection = () => {
  const navigate = useNavigate();
  const [hairTypeData, setHairTypeData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [cookies, setCookie] = useCookies(['hairType']); // Define a cookie named 'hairType'

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch(`${process.env.REACT_APP_URL}` + "/build-my-hair/wp-json/bmh-hair-calculator/v1/data")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHairTypeData(data.hair_type);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []); 

  // Function to set the hair type cookie
  const setHairTypeCookie = (hairType) => {
    setCookie('hairType', hairType, { path: '/' }); // Set the cookie named 'hairType' with the value 'hairType'
  }

  const handleNext = () => {
    navigate("/hairColor");
  };
  const handlePrev = () => {
    navigate("/skintone");
  };

  return (
    <div>
    {loading ? (
      <div className={styles.loader}>Loading...</div>
    ) : (
    <>
    <div className="global_container">
      <div className={styles.hair_type_section}>
        <div className={styles.left_zone}>
          <Main_desc />
        </div>
        <div className={styles.right_zone}>
          <h3 className={styles.heading}>03. Select Your Hair Type</h3>
          <div className={styles.hair_type_block}>
            {hairTypeData.map((item, index) => (
              <div className={styles.hair_type_inner} id={item.text_f} key={index}>
                <div className={styles.hairBlock}>
                  <div className={styles.tone_img_block}>
                    <img
                      className={styles.tone_img}
                      src={item.img_f}
                      alt={item.text_f} // Use hair type text as alt text
                    />
                  </div>
                  <div className={styles.title_group}>
                    <input
                      type="radio"
                      name="hairType"
                      value={item.text_f} // Use hair type text as value
                      defaultChecked={index === 0} // Set defaultChecked for the first item
                      onChange={() => setHairTypeCookie(item.text_f)} // Call setHairTypeCookie on change
                    />
                    <h6 className={styles.title}>{item.text_f}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bb_btn_block">
        <div className="bb_redirect_prev_btn">
          <button className="bb_button" onClick={handlePrev}>Prev</button>
        </div>
        <div className="bb_redirect_next_btn">
          <button className="bb_button" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
    </>
  )}
  </div>
  );
};

export default HairTypeSection;
