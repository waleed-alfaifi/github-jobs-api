import React from 'react';

import SEO from '../components/seo';
import JobContainer from '../components/jobs_container/JobContainer';
import SearchInput from '../components/search_input/SearchInput';

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
