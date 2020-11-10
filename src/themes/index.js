import light from './light';
import dark from './dark';

const commonTheme = {
  colors: {
    violet: '#5964E0',
    lightViolet: '#939BF4',
    darkGrey: '#6E8098',
  },
};

export const lightTheme = {
  ...commonTheme,
  ...light,
};

export const darkTheme = {
  ...commonTheme,
  ...dark,
};
