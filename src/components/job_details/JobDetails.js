import React, { useEffect, useContext, useState } from 'react';
import 'twin.macro';

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
  const [applyUrl, setApplyUrl] = useState('');

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
      const data = await res.json();

      setJob(data);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    setApplyUrl(getApplyUrl(job.how_to_apply) || job.company_url);
  }, [job]);

  const getApplyUrl = (applyHtml) => {
    const parsedEl = document.createElement('html');
    parsedEl.innerHTML = applyHtml;

    const applyUrlElement = parsedEl.querySelector('a[href]');

    return applyUrlElement?.getAttribute('href');
  };

  return (
    <div className="job-detail-container">
      <SEO title={job.title || 'Job'} />
      <JobDetailsHeader job={job} />

      <div tw="bg-white px-10 py-16 text-left">
        <JobDetailsMeta
          created_at={job.created_at}
          type={job.type}
          title={job.title}
          location={job.location}
          applyLink={applyUrl}
        />

        <div
          dangerouslySetInnerHTML={{ __html: job.description }}
          className="job-detail-html-description"
        />
      </div>
      <section
        tw="p-12 mt-12 mb-8 text-white"
        className="job-detail-how-to-apply"
      >
        <h3 tw="mb-8">How to apply</h3>
        <p
          dangerouslySetInnerHTML={{ __html: job.how_to_apply }}
          className="job-detail-how-to-apply-paragraph"
        ></p>
      </section>

      <div
        tw="bg-white rounded-md p-10"
        className="job-detail-apply-now-footer"
      >
        <a
          tw="inline-block text-center px-12 pt-6 pb-5 w-full text-white rounded-md transition transition-all
                         duration-100 transform focus:translate-y-1 focus:outline-none"
          className="filter-modal-search-button"
          href={applyUrl}
          target="_blank"
          rel="noreferrer"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobDetails;
