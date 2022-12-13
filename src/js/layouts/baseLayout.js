import React, { Component } from "react";
import NavBar from "../components/NavBar";

function BaseLayout({ children, ...props }) {
  return (
    <>
      <NavBar {...props} />
      {children}
    </>
  );
}

export default BaseLayout;

function getComponentName() {
  return Component.displayName || Component.name || "Component";
}

export const withBaseLayout = (Component, params) => {
  const compName = getComponentName(Component);

  return (props) => {
    return (
      <>
        <NavBar {...params} view={compName} />
        <Component {...props} />
      </>
    );
  };
};
