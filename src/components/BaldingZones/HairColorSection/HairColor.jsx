import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styles from "./HairColor.module.css";
import Main_desc from "../../MainContent/MainDesc";
import Select2 from "react-select2-wrapper";
import "../../../../node_modules/select2-component/dist/select2.min.css";
import "./hairColor.css";

const HairColor = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['hairColor']);
  const [skinTypecookies, setskinTypeCookie] = useCookies(['skinType']);
  const [hairColorMoreOption, setHairColorMoreOption] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dynamicValue, setDynamicValue] = useState({}); // New state for dynamic value

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/wp-json/bmh-hair-calculator/v1/data`)
      .then((response) => response.json())
      .then((data) => {
        setHairColorMoreOption(data.more_options);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Set default options in cookies when component mounts
    hairColorMoreOption.forEach((item) => {
      const defaultOption = JSON.parse(item.nested_repeater)[0];
      if (item.heading === 'Hair Color' && !cookies.hairColor) {
        setCookie("hairColor", defaultOption, {
          path: "/",
          maxAge: 604800,
        });
      }
      if (item.heading === 'Skin Type' && !skinTypecookies.skinType) {
        setskinTypeCookie("skinType", defaultOption, {
          path: "/",
          maxAge: 604800,
        });
      }
    });
  }, [hairColorMoreOption, cookies.hairColor, setCookie, skinTypecookies.skinType, setskinTypeCookie]);

  const handleOnChange = (item, selectedValue) => {
    if (selectedValue) {
      if (item.heading === 'Hair Color') {
        setCookie("hairColor", selectedValue, {
          path: "/",
          maxAge: 604800,
        });
      }
      if (item.heading === 'Skin Type') {
        setskinTypeCookie("skinType", selectedValue, {
          path: "/",
          maxAge: 604800,
        });
      }
    } else {
      const defaultOption = JSON.parse(item.nested_repeater)[0];
      if (item.heading === 'Hair Color') {
        setCookie("hairColor", defaultOption, {
          path: "/",
          maxAge: 604800,
        });
      }
      if (item.heading === 'Skin Type') {
        setskinTypeCookie("skinType", defaultOption, {
          path: "/",
          maxAge: 604800,
        });
      }
    }
  };

  return (
    <div>
      {loading ? (
        <div className={styles.loader}>Loading...</div>
      ) : (
        <>
          <div className="global_container">
            <div className={styles.hair_color_section}>
              <div className={styles.left_zone}>
                <Main_desc />
              </div>
              <div className={styles.right_zone}>
                <h3 className={styles.heading}>04. Select Other Options</h3>
                {hairColorMoreOption.map((item, index) => (
                  <div className={styles.hair_color_block} key={index}>
                    <h4 className={styles.sub_heading}>{item.heading}</h4>
                    <div className={`hair_color_selector ${styles.hair_color_selector}`}>
                      <Select2 defaultValue={{ label: "Select Dept", value: 0 }}
                        data={JSON.parse(item.nested_repeater)}
                        value={dynamicValue[item.heading] || JSON.parse(item.nested_repeater)[0]}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDynamicValue(prevState => ({
                            ...prevState,
                            [item.heading]: value
                          }));
                          handleOnChange(item, value);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bb_btn_block">
              <div className="bb_redirect_prev_btn">
                <button className="bb_button" onClick={() => navigate("/hairTypeSection")}>Prev</button>
              </div>
              <div className="bb_redirect_next_btn">
                <button className="bb_button" onClick={() => navigate("/htContactForm")}>Next</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HairColor;

