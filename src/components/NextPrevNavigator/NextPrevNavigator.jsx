// import React from 'react';
// import './NextPrevNavigator.css';
// import { useLocation, useNavigate } from 'react-router-dom';

// function NextPrevNavigator() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   const handlePrevClick = () => {
//     let prevPath = '/';
//     switch (location.pathname) {
//       case '/skintone':
//         prevPath = '/horizontalTab';
//         break;
//       case '/hairTypeSection':
//         prevPath = '/skintone';
//         break;
//       case '/hairColor':
//         prevPath = '/hairTypeSection';
//         break;
//       case '/htContactForm':
//         prevPath = '/hairColor';
//         break;
//       default:
//         break;
//     }
//     navigate(prevPath); 
//   };

//   const handleNextClick = () => {
//     let nextPath = '/';
//     switch (location.pathname) {
//       case '/horizontalTab':
//         nextPath = '/skintone';
//         break;
//       case '/skintone':
//         nextPath = '/hairTypeSection';
//         break;
//       case '/hairTypeSection':
//         nextPath = '/hairColor';
//         break;
//       case '/hairColor':
//         nextPath = '/htContactForm';
//         break;
//       default:
//         break;
//     }
//     navigate(nextPath);
//   };

//   return (
// <></>
//   );
// }

// export default NextPrevNavigator;
