import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import JobContainer from '../components/jobs_container/JobContainer';
import SearchInput from '../components/search_input/SearchInput';

import { JobsProvider } from '../context/JobsContext';

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <JobsProvider>
        <SearchInput />
        <JobContainer />
      </JobsProvider>
    </Layout>
  );
};
export default IndexPage;
