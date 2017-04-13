import React, { PureComponent, PropTypes } from 'react';

function Header({ heading }) {
  return (
    <div>{heading}</div>
  );
}

Header.propTypes = {
  heading: PropTypes.string.isRequired
};

export default Header;

import PropTypes from 'prop-types';
