import React, { useEffect, useContext, useState } from 'react';

import JobsContext from '../../context/JobsContext';
import SEO from '../seo';

const JobDetails = ({ jobId }) => {
  const {
    jobsState: { jobs },
  } = useContext(JobsContext);
  const [job, setJob] = useState({});

  useEffect(() => {
    const currentJob = jobs.filter?.((job) => job.id === jobId)[0];

    if (currentJob) {
      setJob(currentJob);
    } else {
      // request that job
    }
  }, []);

  return (
    <>
      <SEO title={job.title || 'Job'} />
      <h3>{job.title}</h3>
      <div>{job.location}</div>
      <button>Apply Now</button>
      <div dangerouslySetInnerHTML={{ __html: job.description }} />
    </>
  );
};

export default JobDetails;
