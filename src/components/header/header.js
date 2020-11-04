import React from 'react';
import 'twin.macro';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import sunIcon from '../../images/desktop/icon-sun.svg';
import moonIcon from '../../images/desktop/icon-moon.svg';

import './header.css';

const Header = ({ siteTitle }) => {
  return (
    <header className="header" tw="h-56 px-10 pt-12 flex items-baseline">
      <h1 tw="flex-grow text-white">
        <Link to="/">{siteTitle}</Link>
      </h1>
      <div tw="flex items-center">
        <img src={sunIcon} alt="Light theme" />
        <label
          htmlFor="theme-switcher"
          className="custom-switch"
          tw="relative inline-block mx-6"
        >
          <input
            type="checkbox"
            name="theme-switcher"
            id="theme-switcher"
            tw="opacity-0 w-0 h-0"
          />
          <span
            tw="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-white transition-all duration-500"
            className="slider"
          ></span>
        </label>
        <img src={moonIcon} alt="Dark theme" />
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
