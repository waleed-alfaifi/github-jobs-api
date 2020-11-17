import React from 'react';
import 'twin.macro';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import ThemeToggler from './ThemeToggler';

import bgPatternHeaderMobile from '../images/mobile/bg-pattern-header.svg';
import bgPatternHeaderDesktop from '../images/desktop/bg-pattern-header.svg';

const StyledHeader = styled.header`
  background-image: url(${bgPatternHeaderMobile});
  background-size: cover;

  @media (min-width: 768px) {
    background-image: url(${bgPatternHeaderDesktop});
  }

  @media (min-width: 1440px) {
    border-bottom-left-radius: 9rem;
  }
`;

const Header = ({ siteTitle, toggleTheme, theme }) => {
  return (
    <>
      <StyledHeader tw="h-56 md:h-64">
        <div tw="container mx-auto px-10 pt-12 flex items-baseline">
          <h1 tw="flex-grow text-white">
            <Link to="/">{siteTitle}</Link>
          </h1>
          <ThemeToggler toggleTheme={toggleTheme} theme={theme} />
        </div>
      </StyledHeader>
    </>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
