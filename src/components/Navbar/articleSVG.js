import React from 'react';

const ArticleSVG = (props) => (
  <svg
    className={props.className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fillRule="evenodd" // Use fillRule instead of fill-rule
      d="M9.412 2.34A10 10 0 0 1 20.66 7l-1.732 1A8 8 0 0 0 4.23 10.096l.755-.453 1.03 1.714L2 13.768V12a10 10 0 0 1 7.412-9.66ZM22 10.234V12a10 10 0 0 1-18.66 5l1.732-1a8 8 0 0 0 14.698-2.096l-.755.454-1.03-1.716L22 10.235Z"
      clipRule="evenodd" // Use clipRule instead of clip-rule
    ></path>
    <path
      fill="currentColor"
      fillRule="evenodd" // Use fillRule instead of fill-rule
      d="M10.323 7h3.354L16 12.807V16.5h-2V14h-4v2.5H8v-3.693L10.323 7Zm.154 5h3.046l-1.2-3h-.646l-1.2 3Z"
      clipRule="evenodd" // Use clipRule instead of clip-rule
    ></path>
  </svg>
);

export default ArticleSVG;
