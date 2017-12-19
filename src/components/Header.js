import React from 'react';
import '../styles/header.css'

class Header extends React.Component {

  render() {
    return(
      <div className="header row">
        <img className="header_img" src="../images/logo.png" alt=""/>
        <h1 className="caption">React Music Player</h1>
      </div>
    )
  }
}

export default Header;
