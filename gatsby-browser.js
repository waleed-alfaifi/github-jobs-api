/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// import './src/styles/css/output.css';
// import './src/styles/css/line-awesome.min.css';
// import './src/styles/css/main.css';
// import React from 'react';
// import Layout from './src/components/layout';
// export const wrapPageElement = ({ element, props }) => {
//   return <Layout {...props}>{element}</Layout>;
// };

require('./src/styles/css/output.css');
require('./src/styles/css/line-awesome.min.css');
require('./src/styles/css/main.css');

const React = require('react');
const Layout = require('./src/components/layout').default;

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
