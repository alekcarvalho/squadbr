import React, { Component } from "react";
import Logo from "components/logo";
import "components/header/style.scss";

class Header extends Component {
  render() {
    return (
      <nav>
        <Logo />
      </nav>
    );
  }
}

export default Header;
