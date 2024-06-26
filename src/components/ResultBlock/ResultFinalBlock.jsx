import React, { useState, useEffect } from 'react';
import styles from "../ResultBlock/Result_block.module.css";
//import apiFetch from '@wordpress/api-fetch';
//import { createNonceMiddleware } from '@wordpress/api-fetch';
import axios from 'axios';



const ResultFinalBlock = ({ onPrev, selectedBodyPartCB }) => {
  const [isFilterPopupVisible, setIsFilterPopupVisible] = useState(false);
  const [isToggled, setToggled] = useState(false);
  const [ProductData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bodypartFilters, setBodypartFilters] = useState([]);
  const [tagFilters, setTagFilters] = useState([]);
  const [checkedBodypart, setCheckedBodypart] = useState({});
  const [checkedTag, setCheckedTag] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  //wp.apiFetch.nonceMiddleware = createNonceMiddleware("57096a48a5");
  //const productCartData = []; // Assuming this is your existing array of cart items
  const productCartData = [];

  useEffect(() => {
    const [tag, bodypart] = selectedBodyPartCB.split('-');
    setTagFilters([tag]);
    setBodypartFilters([bodypart]);
    setToggled(tag === 'Male');
  }, [selectedBodyPartCB]);

  useEffect(() => {
    // Update checked state for bodypart checkboxes
    const checkedBodypartState = {};
    bodypartFilters.forEach((filter) => {
      checkedBodypartState[filter] = true;
    });
    setCheckedBodypart(checkedBodypartState);

    // Update checked state for tag checkboxes
    const checkedTagState = {};
    tagFilters.forEach((filter) => {
      checkedTagState[filter] = true;
    });
    setCheckedTag(checkedTagState);
  }, [bodypartFilters, tagFilters]);

  const handleToggle = () => {
    setToggled(!isToggled);
    const selectedTag = isToggled ? 'Female' : 'Male';
    setTagFilters([selectedTag]);
  };

  const handleFilterIconClick = () => {
    setIsFilterPopupVisible(!isFilterPopupVisible);
  };

  const handleCloseButtonClick = () => {
    setIsFilterPopupVisible(false);
  };

  const handleAppliedFilter = () => {
    setIsFilterPopupVisible(false);
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === 'bodypart') {
      setCheckedBodypart({ ...checkedBodypart, [value]: checked });
      if (checked) {
        if (!bodypartFilters.includes(value)) {
          setBodypartFilters([...bodypartFilters, value]);
        }
      } else {
        setBodypartFilters(bodypartFilters.filter(filter => filter !== value));
      }
    } else if (name === 'tag') {
      setCheckedTag({ ...checkedTag, [value]: checked });
      if (checked) {
        if (!tagFilters.includes(value)) {
          setTagFilters([...tagFilters, value]);
        }
      } else {
        setTagFilters(tagFilters.filter(filter => filter !== value));
      }
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getProductData = async () => {
    const tagParam = tagFilters.filter(Boolean).join(',');
    const bodypartParam = bodypartFilters.filter(Boolean).join(',');

    fetch(`${process.env.REACT_APP_URL}/wp-json/bmh-get-product-list-api/v1/data?bodypart=${bodypartParam}&tag=${tagParam}&search=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Check if filters have been initialized
    if (bodypartFilters.length > 0 && tagFilters.length > 0) {
      getProductData();
    }
  }, [bodypartFilters, tagFilters, searchQuery]);

  const addToCart = (item) => {
    // Check if the item is already in the cart
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      // If the item is already in the cart, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };
  
  
  const handleCheckout = () => {
    // Call the API to add the products to the WooCommerce cart
    setLoading(true);
    cartItems.forEach((item, index) => {
      const productId  = item.id;
      const quantity  = 1;
      productCartData.push({ productId, quantity });
    });
    newaddToCart(0);
  };


  function newaddToCart(index) {
    if (index < productCartData.length) {
      const { productId, quantity } = productCartData[index];
      const url = `${process.env.REACT_APP_URL}/?add-to-cart=${productId}&quantity=${quantity}`;
      
      // Create a temporary iframe to load the URL
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      iframe.src = url;
  
      // Wait for the iframe to load, then remove it and proceed to the next product
      iframe.onload = () => {
        document.body.removeChild(iframe);
        newaddToCart(index + 1);
      };
    } else {
      // Redirect to the cart page after all products are added
      setTimeout(() => {
        window.location.href = `${process.env.REACT_APP_URL}/cart/`;
       // setLoading(false);
      }, 1000); // Adjust the delay as needed
    }
  }
  
  // Start adding products from index 0
  
  const removeFromCart = (itemId) => {
    // Filter out the item with the given itemId from the cart
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };


  const removeHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  

  return (
    <div>
      {loading ? (
        <div id="loading-bar-spinner" className="spinner"><div className="spinner-icon"></div></div>
      ) : (
        <>
          <div className={styles.finalresult_module}>
            <div className="global_container">
              <div className={styles.filter_row}>
                <div className={styles.back_btn} onClick={onPrev}>
                  <span> <img src={process.env.REACT_APP_URL + '/' + process.env.REACT_APP_PLUGIN_MEDIA_PATH_URL + 'arrow-back.svg'} alt="" />
                    Back</span>
                </div>

                <div className={styles.filter_module}>
                  <div className={styles.search_box}>
                    <input type="search" className={styles.search} placeholder="Search here" value={searchQuery} onChange={handleSearchInputChange} />
                    <span className={styles.icon}>
                      <img src={process.env.REACT_APP_URL + '/' + process.env.REACT_APP_PLUGIN_MEDIA_PATH_URL + 'icons-search.svg'} alt="" />
                    </span>
                  </div>
                  <div className={styles.filter_final_row}>
                    <div className={`filter_pop_icon ${styles.filter_icon}`} onClick={handleFilterIconClick} > <img src={process.env.REACT_APP_URL + '/' + process.env.REACT_APP_PLUGIN_MEDIA_PATH_URL + 'menu.svg'}></img><span>Filter</span></div>
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
                          </div>
                        </div>
                        <div className={styles.filter_category}>
                          <h4 className={styles.popup_filter_heading}>Category</h4>
                          <div className={styles.category_row}>
                            <div className={styles.category_section}>
                              <p> Face</p>
                              <label htmlFor="eyes"> <input type="checkbox" id="eyes" name="bodypart" value="Eyes" onChange={handleCheckboxChange} checked={checkedBodypart["Eyes"]} /> Eyes</label>
                              <label htmlFor="hair_restoration"> <input type="checkbox" id="hair_restoration" name="bodypart" value="Hair Restoration" onChange={handleCheckboxChange} checked={checkedBodypart["Hair Restoration"]} />  Hair Restoration</label>
                              <label htmlFor="lips"> <input type="checkbox" id="lips" name="bodypart" value="lips" onChange={handleCheckboxChange} checked={checkedBodypart["lips"]} /> Lips</label>
                              <label htmlFor="Neck"> <input type="checkbox" id="Neck" name="bodypart" value="Neck" onChange={handleCheckboxChange} checked={checkedBodypart["Neck"]} /> Neck</label>
                            </div>
                            <div className={styles.category_section}>
                              <p> Arms</p>
                              <label htmlFor="Hands"> <input type="checkbox" id="Hands" name="bodypart" value="Hands" onChange={handleCheckboxChange} checked={checkedBodypart["Hands"]} /> Hands</label>
                            </div>
                            <div className={styles.category_section}>
                              <p> Breast</p>
                              <label htmlFor="Chest"> <input type="checkbox" id="Chest" name="bodypart" value="Chest" onChange={handleCheckboxChange} checked={checkedBodypart["Chest"]} />  Chest</label>
                            </div>
                            <div className={styles.category_section}>
                              <p> Legs/knees</p>
                              <label htmlFor="Buttocks"> <input type="checkbox" id="Buttocks" name="bodypart" value="Buttocks" onChange={handleCheckboxChange} checked={checkedBodypart["Buttocks"]} /> Buttocks</label>
                            </div>
                          </div>
                        </div>

                        <div className={styles.filter_apply_btn}>
                          <button className={`bb_button ${styles.bb_btns}`} onClick={handleAppliedFilter} >
                            Apply Filter
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={`${styles.finalresult_row} ${isFilterPopupVisible ? styles.overlay : ''}`}>
                <div className={styles.finalresult_left}>
                  <div className={styles.result_heading}>
                    Hair Restoration
                  </div>
                  <div className={styles.final_product_listing}>
                    {ProductData.map((item) => (
                      <div className={styles.product_list} key={item.id}>
                        <div className={styles.product_box} id={item.sku}>
                          <span>  Hair loss</span>
                          <h4 className={styles.product_name}>
                            {item.name}
                          </h4>

                          <p>{removeHtmlTags(item.description)}</p> {/* Render cleaned description */}


                          <a href={item.permalink} target='__blank' >Read More</a>
                        </div>
                        <div className={styles.product_add_remove} onClick={() => addToCart(item)}>
                          {cartItems.some((cartItem) => cartItem.id === item.id) ? (
                            // If the item is already in the cart, show the minus icon
                            <div className='minus'>
                              <span className='m_verticle'></span>
                            </div>
                          ) : (
                            // If the item is not in the cart, show the plus icon
                            <div className='plus_minus'>
                              <span className='p_verticle'></span>
                              <span className='p_horizontal'></span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.finalresult_right}>
                  <div className={styles.cart_produc_box}>
                    <div className={styles.result_heading}>
                      Your Cart
                    </div>
                    {cartItems.length === 0 ? (
                       <div className={styles.cart_row}>
                      <div className={styles.cart_P_name}>
                        Cart is empty
                      </div>
                      </div>
                    ) : (
                      <div className={styles.cart_product_listing}>
                        {cartItems.map((item, index) => (
                          <div className={styles.cart_row} key={index}>
                            <div className={styles.cart_product_add_remove}>
                              <div className={styles.remove_circle} onClick={() => removeFromCart(item.id)}>x</div>
                              <div className={styles.cart_P_name}>{item.name}</div>
                            </div>
                            <div className={styles.cart_price}>${item.price}</div>
                          </div>
                        ))}
                        <div className={styles.cart_total_row}>
                          <div className={styles.cart_product_add_remove}>
                            <div className={styles.cart_P_name}>Total</div>
                          </div>
                          <div className={styles.cart_price}>${getTotalPrice()}</div>
                        </div>
                      </div>
                      )}
                  </div>
                
                  <div className={styles.process_checkout_btn}>
                    <div className={styles.process_formBtn}>
                    <button type="submit"  className={`bb_button ${cartItems.length === 0 ? styles.check_btn_disabled : styles.check_btn }`} onClick={() => handleCheckout()} >Proceed To checkout</button>
                    </div>
                    <button className="bb_button"> Contact Us</button>
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
