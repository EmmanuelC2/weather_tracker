import React from "react";

/**
 * Provides a centered, padded container so every page shares the same spacing rhythm.
 */
export const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <div className="page-layout__content">{children}</div>
    </div>
  );
};

export default PageLayout;
