import React, { useState , useEffect } from 'react';
import styles from "../ResultBlock/Result_block.module.css";
import Back from "../../image/arrow-back.svg";
import Bar from "../../image/menu.svg";
import Searcicon from "../../image/icons-search.svg";

const ResultFinalBlock = ({onPrev , selectedBodyPartCB}) => {
  const [isFilterPopupVisible, setIsFilterPopupVisible] = useState(false);
  const [isToggled, setToggled] = useState(false);
  const [ProductData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  const handleFilterIconClick = () => {
    setIsFilterPopupVisible(!isFilterPopupVisible);
  };

  const handleCloseButtonClick = () => {
    setIsFilterPopupVisible(false); // Set isFilterPopupVisible to false when close button is clicked
  };

  const getProductData = async () => {
    
    fetch(`${process.env.REACT_APP_URL}` + "/wp-json/bmh-get-product-list-api/v1/data")
      .then((response) => response.json())
      .then((data) => {
        ///console.log('test', data);
       setProductData(data);
      setLoading(false);
     
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
};

log


  useEffect(() => {
    getProductData();
  }, [ProductData]);


  return (
    <div>
    {loading ? (
      <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
    ) : (
    <><style>
        {`  
          .plus_minus{
          background: #fff;
          }
      `}
      </style>
      <div className={styles.finalresult_module}>
        <div className="global_container">
          <div className={styles.filter_row}>
            <div className={styles.back_btn} onClick={onPrev}>
              <span> <img src={Back} alt="" />
                Back</span>
            </div>


            <div className={styles.filter_module}>
              <div className={styles.search_box}>
                <input type="search" className={styles.search} placeholder="Search here" />
                <span className={styles.icon}>
                  <img src={Searcicon} alt="" />
                </span>
              </div>
              <div className={styles.filter_final_row}>
                <div className={`filter_pop_icon ${styles.filter_icon}`} onClick={handleFilterIconClick} > <img src={Bar}></img><span>Filter</span></div>
                {isFilterPopupVisible && (
                  <div className={`filter_popup_col ${styles.filter_popup}`}>
                    <div className={styles.close_btn} onClick={handleCloseButtonClick}>X</div>
                    <div className={styles.toggle_gender}>
                      <h4 className={styles.popup_filter_heading}>Gender</h4>
                      <div className={styles.toggle_on_off}>
                        <span >Female</span>
                        <label className={styles.switch}>
                          <input type="checkbox" checked={isToggled} onChange={handleToggle} />
                          <div className={styles.slider}></div>
                        </label>
                        <span>Male</span>
                        {/* <p>{isToggled ? 'Male' : 'Female'}</p>  */}
                      </div>
                    </div>
                    <div className={styles.filter_category}>
                      <h4 className={styles.popup_filter_heading}>Category</h4>
                      <div className={styles.category_row}>
                        <div className={styles.category_section}>
                          <p> Face</p>
                          <label for="eyes"> <input type="checkbox" id="eyes" name="face" value="Eyes" /> Eyes</label>
                          <label for="hair_restoration"> <input type="checkbox" id="hair_restoration" name="face" value="Eyes" />  Hair Restoration</label>
                          <label for="lips"> <input type="checkbox" id="eyes" name="face" value="lips" /> hair_restoration</label>
                          <label for="Neck"> <input type="checkbox" id="Neck" name="face" value="Neck" /> Neck</label>
                        </div>
                        <div className={styles.category_section}>
                          <p> Arms</p>
                          <label for="Hands"> <input type="checkbox" id="Hands" name="Arms" value="Hands" /> Hands</label>
                        </div>
                        <div className={styles.category_section}>
                          <p> Breast</p>
                          <label for="Chest"> <input type="checkbox" id="Chest" name="Breast" value="Chest" />  Chest</label>
                        </div>

                        <div className={styles.category_section}>
                          <p> Legs/knees</p>
                          <label for="Buttocks"> <input type="checkbox" id="Buttocks" name="Legs" value="Buttocks" /> Buttocks</label>
                        </div>
                      </div>
                    </div>

                    <div className={styles.filter_apply_btn}>
                      <button className={`bb_button ${styles.bb_btns}`}>
                        Apply Filter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={`${styles.finalresult_row} ${isFilterPopupVisible ? styles.overlay : ''}`}>
            {/* <div className={styles.filter_row}>


            </div> */}
            <div className={styles.finalresult_left}>
              <div className={styles.result_heading}>
                Hair Restoration
              </div>
              <div className={styles.final_product_listing}>
                {ProductData.map((item) => ( 
                <div className={styles.product_list}>
                  <div className={styles.product_box} id=''>
                    <span>  Hair loss</span>
                    <h4 className={styles.product_name}>
                      {item.name} 
                    </h4>

                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>

                    <a href='#'>Read More</a>
                  </div>
                  <div className={styles.product_add_remove}>
                    <div className='plus_minus'>
                      <span className='p_verticle'></span>
                      <span className='p_horizontal'></span>
                    </div>
                  </div>
                </div>
                ))}  
                {/* <div className={styles.product_list}>
                  <div className={styles.product_box}>
                    <span>  Hair loss</span>
                    <h4 className={styles.product_name}>
                      product name
                    </h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>

                    <a href='#'>Read More</a>
                  </div>
                  <div className={styles.product_add_remove}>
                    <div className='plus_minus'>
                      <span className='p_verticle'></span>
                      <span className='p_horizontal'></span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className={styles.finalresult_right}>
              <div className={styles.cart_produc_box}>
                <div className={styles.result_heading}>
                  Your Cart
                </div>
                <div className={styles.cart_product_listing}></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
    )}
    </div>
  )
}

export default ResultFinalBlock;