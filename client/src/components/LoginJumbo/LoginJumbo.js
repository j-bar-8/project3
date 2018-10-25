import React from "react";

const LoginJumbo = ({ children }) => (
  <div
    style={{ height: 600, clear: "both", paddingTop: 120, textAlign: "center" }}
    className="login"
  >
    {children}
  </div>
);

export default LoginJumbo;
