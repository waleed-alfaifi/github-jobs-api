import React from 'react';

import SEO from '../components/seo';
import JobContainer from '../components/JobContainer';
import SearchInput from '../components/SearchInput';

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" />
      <SearchInput />
      <JobContainer />
    </>
  );
};

export default IndexPage;
