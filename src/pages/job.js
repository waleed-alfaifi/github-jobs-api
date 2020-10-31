import React from 'react';
import { Router } from '@reach/router';
import JobDetails from '../components/job_details/JobDetails';

const JobPage = () => {
  return (
    <>
      <Router basepath="/job">
        <JobDetails path="/:jobId" />
      </Router>
    </>
  );
};
export default JobPage;
