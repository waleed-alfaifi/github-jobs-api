import React from 'react';

import SEO from '../components/seo';
import JobContainer from '../components/JobContainer';
import SearchInput from '../components/SearchInput';
import SearchInputDesktop from '../components/SearchInputDesktop';

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" />
      <SearchInput />
      <SearchInputDesktop />
      <JobContainer />
    </>
  );
};

export default IndexPage;
