import React, { Component, PureComponent, PropTypes } from 'react';

function Header({ heading }) {
  return (
    <div>{heading}</div>
  );
}

Header.propTypes = {
  heading: React.PropTypes.string.isRequired,
  footer: React.PropTypes.string.isRequired
};

export default Header;
