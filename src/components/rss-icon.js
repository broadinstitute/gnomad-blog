import React from "react";

const RSSIcon = (props) => {
  return (
    <svg height={12} width={12} viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <circle cx="20" cy="80" r="15" fill="#666" />
      <circle cx="0" cy="100" r="58" fill="none" stroke="#666" strokeWidth="10" />
      <circle cx="0" cy="100" r="80" fill="none" stroke="#666" strokeWidth="10" />
    </svg>
  );
};

export default RSSIcon;
