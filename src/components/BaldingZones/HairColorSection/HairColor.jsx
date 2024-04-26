import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./HairColor.module.css";
import Main_desc from "../../MainContent/MainDesc";
import Select2 from "react-select2-wrapper";
import "../../../../node_modules/select2-component/dist/select2.min.css";
import "./hairColor.css";


const options = {
  data: [
    { id: "BlackHair", text: "Black Hair" },
    { id: "BrownHair", text: "Brown Hair" },
    { id: "BlondHair", text: "Blond Hair" },
    { id: "RedHair", text: "Red Hair" },
    { id: "Grey", text: "Grey Hair" },
    { id: "White Hair", text: "White Hair" },
  ],
};
const HairColor = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/htContactForm");
  };
  const handlePrev = () => {
    navigate("/hairTypeSection");
  };
  return (
    <>
      <div className="global_container">
        <div className={styles.hair_color_section}>
          <div className={styles.left_zone}>
            <Main_desc />
          </div>
          <div className={styles.right_zone}>
            <h3 className={styles.heading}>04. Select Other Options</h3>
            <div className={styles.hair_color_block}>
              <h4 className={styles.sub_heading}>Hair Color</h4>
              <div className={`hair_color_selector ${styles.hair_color_selector}`}>
                <Select2
                    data={options.data}
                    value={options.data[0].id}
                />
              </div>
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
  );
};

export default HairColor;
