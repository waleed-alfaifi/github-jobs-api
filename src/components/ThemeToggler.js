import React from 'react';
import 'twin.macro';
import styled from 'styled-components';

import sunIcon from '../images/desktop/icon-sun.svg';
import moonIcon from '../images/desktop/icon-moon.svg';

const CustomSiwtchLabel = styled.label`
  width: 4.8rem;
  height: 2.4rem;
  border-radius: 1.2rem;
`;

const Slider = styled.span`
  border-radius: 1.2rem;
  &::before {
    position: absolute;
    content: '';

    height: 1.5rem;
    width: 1.5rem;
    left: 0.5rem;
    top: 50%;
    border-radius: 50%;
    background-color: #5964e0;
    transform: translateY(-50%);
    transition: 0.5s;
  }

  #theme-switcher:checked + &::before {
    transform: translate(2.3rem, -50%);
  }

  #theme-switcher:hover + &::before {
    background-color: #939bf4;
  }
`;

const ThemeToggler = ({ toggleTheme, theme }) => {
  return (
    <div tw="flex items-center">
      <img src={sunIcon} alt="Light theme" />
      <CustomSiwtchLabel
        htmlFor="theme-switcher"
        tw="relative inline-block mx-6"
      >
        <input
          type="checkbox"
          name="theme-switcher"
          id="theme-switcher"
          tw="opacity-0 w-0 h-0"
          onChange={toggleTheme}
          checked={theme === 'dark' ? true : false}
        />
        <Slider tw="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-white transition-all duration-500" />
      </CustomSiwtchLabel>
      <img src={moonIcon} alt="Dark theme" />
    </div>
  );
};

export default ThemeToggler;
