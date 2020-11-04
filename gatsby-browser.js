require('tailwindcss/dist/base.min.css');
require('./src/styles/css/line-awesome.min.css');
require('./src/styles/css/main.css');

const React = require('react');
const Layout = require('./src/components/layout').default;

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
