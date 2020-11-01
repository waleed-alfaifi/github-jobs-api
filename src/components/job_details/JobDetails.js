import React, { useEffect, useContext, useState } from 'react';

import JobsContext from '../../context/JobsContext';
import SEO from '../seo';
import JobDetailsHeader from './JobDetailsHeader';
import JobDetailsMeta from './JobDetailsMeta';

import './job_details.css';

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
      fetchJob(jobId);
    }
  }, []);

  const fetchJob = async (jobId) => {
    const githubJobUrl = `https://jobs.github.com/positions/${jobId}.json`;
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    try {
      const res = await fetch(proxyUrl + githubJobUrl);
      // const res = await fetch('/data.json');
      const data = await res.json();

      setJob(data);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <div>
      <SEO title={job.title || 'Job'} />
      <JobDetailsHeader job={job} />

      <div className="bg-white px-10 py-16 text-left">
        <JobDetailsMeta
          created_at={job.created_at}
          type={job.type}
          title={job.title}
          location={job.location}
        />

        <div
          dangerouslySetInnerHTML={{ __html: job.description }}
          className="job-detail-html-description"
        />
      </div>
    </div>
  );
};

export default JobDetails;
