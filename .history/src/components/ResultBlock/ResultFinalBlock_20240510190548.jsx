import React, { useState, useEffect } from 'react';
import styles from "../ResultBlock/Result_block.module.css";
import apiFetch from '@wordpress/api-fetch';


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
    cartItems.forEach(item => {     
      fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': myScriptData.nonce,
        },
        body: JSON.stringify({
            action: 'add_to_cart', // AJAX action name
            product_id: item.id, // Replace with actual product ID
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    //   apiFetch({
    //     path: '/build-my-hair/wp-admin/admin-ajax.php',
    //     method: 'POST',
    //     data: { action: 'add_product_to_cart', product_id: item.id, quantity: 1 }
    // }).then((response) => {
      
    //     if (response.success) {
    //         setSuccess(true);
    //         setError('');
    //         console.log('Product added:', response.data.cart);
    //     } else {
    //         setSuccess(false);
    //         setError(response.data.message);
    //     }
    // }).catch((error) => {
        
    //     setError('Error adding product: ' + error.message);
    // });
    });
  };
  
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

                          <p>{item.description}</p>

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
