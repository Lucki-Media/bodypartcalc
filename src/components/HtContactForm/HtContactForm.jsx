import React, { useState } from 'react';
import styles from './HtContactForm.module.css';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HtContactForm = ({ onNext }) => {
    const [gethairZonecookies, sethairZonecookies] = useCookies([
        "hairZone",
    ]);
    const [getSkinTonecookies, setSkinTonecookies] = useCookies([
        "skinTone",
    ]);
    const [gethairTypecookies, sethairTypecookies] = useCookies([
        "hairType",
    ]);
    const [gethairColorcookies, sethairColorcookies] = useCookies([
        "hairColor",
    ]);
    //console.log(gethairZonecookies.hairZone);

    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        HairZone: gethairZonecookies.hairZone,
        SkinTone: getSkinTonecookies.skinTone,
        HairType: gethairTypecookies.hairType,
        HairColor: gethairColorcookies.hairColor
    });

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateEmail = (email) => {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(String(email).toLowerCase());
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            if (!validateEmail(value)) {
                setEmailError('Please enter a valid email address');
            } 
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate Name
        if (!formData.name.trim()) {
            setNameError('Please enter Your Name');
        } 
    
        // Validate Phone Number
        if (!formData.phoneNumber.trim()) {
            setPhoneNumberError('Please enter Your Phone Number');
        } 
    
        // Validate Email
        if (!validateEmail(formData.email)) {
            setEmailError('Please enter a valid email address');
        }
    
        // Check if all fields are filled and no errors exist
        if (formData.name && formData.phoneNumber && validateEmail(formData.email)) {
            // If all validations pass, continue with form submission         

            const requestOptions = {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
    
            try {
                const apiUrl = `${process.env.REACT_APP_URL}` + "/wp-json/bmh-hair-calculator/v1/email_data";
                const res = await fetch(apiUrl, requestOptions);
                const data = await res.json();
                console.log(data);
    
                // Show success message
              
                toast.success("Email sent successfully");
    
                // Trigger onNext function
             
                setTimeout(() => {
                    onNext();
                }, 1000);
            } catch (error) {
                console.log(error);
                toast.error("Failed to send email");
            }
        }
    };

    return (
        <>
            <div className={styles.ht_contactBlock}>
                <div className={styles.description_block}>
                    <div className={styles.form_container}>
                        <h2 className={styles.heading}>Fill the form to<br />get the price</h2>
                        <p className={styles.description}>Praesent scelerisque viverra tempor. Integer felis leo, dignissim eu est ac, interdum condimentum lacus. Duis laoreet felis bibendum metus dapibus elementum.</p>
                    </div>
                </div>
                <div className={styles.ht_contactform}>
                    <div className={styles.form_container}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.ht_formField}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                />
                                {nameError && <p className={styles.error}>{nameError}</p>}
                            </div>
                            <div className={styles.ht_formField}>
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                />
                                {phoneNumberError && <p className={styles.error}>{phoneNumberError}</p>}
                            </div>
                            <div className={styles.ht_formField}>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                />
                                {emailError && <p className={styles.error}>{emailError}</p>}
                            </div>
                            <div className={styles.ht_formBtn}>
                                <button type="submit" className="bb_button" >Click here to see grafts and price</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default HtContactForm;

// onClick={onNext}