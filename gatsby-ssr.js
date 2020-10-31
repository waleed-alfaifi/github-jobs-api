/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it

// import Layout from './src/components/layout';

// export const wrapPageElement = ({ element, props }) => {
//   return <Layout {...props}>{element}</Layout>;
// };

const React = require('react');
const Layout = require('./src/components/layout').default;

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
