import React from 'react';
import 'twin.macro';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header/header';

import { JobsProvider } from '../context/JobsContext';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      {/* <GlobalStyles /> */}
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <JobsProvider>
        <div tw="container mx-auto px-10">
          <main>{children}</main>
        </div>
      </JobsProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
