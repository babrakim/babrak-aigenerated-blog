import React from 'react';

const ChatSVG = (props) => (

  <svg
    className={props.className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.586 3h14.828L22 5.586v10.828L19.414 19H18v4l-5.333-4H4.586L2 16.414V5.586L4.586 3Zm.828 2L4 6.414v9.172L5.414 17h7.92L16 19v-2h2.586L20 15.586V6.414L18.586 5H5.414Z"
      clipRule="evenodd"
    ></path>
    <path
      fill="currentColor"
      d="m10 6.5.866 2.634L13.5 10l-2.634.866L10 13.5l-.866-2.634L6.5 10l2.634-.866L10 6.5ZM14.5 11l.619 1.881L17 13.5l-1.881.619L14.5 16l-.619-1.881L12 13.5l1.881-.619L14.5 11Z"
    ></path>
  </svg>

);

export default ChatSVG;
