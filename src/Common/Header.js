import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

function Header({ heading }) {
  return (
    <div>{heading}</div>
  );
}

Header.propTypes = {
  heading: PropTypes.string.isRequired
};

export default Header;
