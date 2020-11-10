import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import 'twin.macro';

import JobsContext from '../../context/JobsContext';
import SEO from '../seo';
import JobDetailsHeader from './JobDetailsHeader';
import JobDetailsMeta from './JobDetailsMeta';

import applyNowFooterMobile from '../../images/mobile/bg-pattern-detail-footer.svg';

const DescriptionContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const Description = styled.div`
  color: ${({ theme }) => theme.colors.darkGrey};
  line-height: 2.6rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    display: inline-block;
    color: ${({ theme }) => theme.textColor};
    font-size: 2rem;
  }

  > * {
    margin-bottom: 2rem;
  }

  * {
    word-wrap: break-word;
  }

  pre {
    white-space: pre-wrap;
  }
`;

const HowToApply = styled.section`
  background-image: url(${applyNowFooterMobile});
  background-origin: border-box;
  background-position: right;
  background-size: cover;
  border-radius: 0.6rem;

  p {
    word-wrap: break-word;
  }
`;

const ApplyNow = styled.div`
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background-color: ${({ theme }) => theme.backgroundColor};

  a {
    background-color: ${({ theme }) => theme.colors.violet};

    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.colors.lightViolet};
    }
  }
`;

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
    <div>
      <SEO title={job.title || 'Job'} />
      <JobDetailsHeader job={job} />
      <DescriptionContainer tw="px-10 py-16 text-left">
        <JobDetailsMeta
          created_at={job.created_at}
          type={job.type}
          title={job.title}
          location={job.location}
          applyLink={applyUrl}
        />
        <Description dangerouslySetInnerHTML={{ __html: job.description }} />
      </DescriptionContainer>

      <HowToApply tw="p-12 mt-12 mb-8 text-white">
        <h3 tw="mb-8">How to apply</h3>
        <p dangerouslySetInnerHTML={{ __html: job.how_to_apply }}></p>
      </HowToApply>
      <ApplyNow tw="rounded-md rounded-br-none rounded-bl-none p-10">
        <a
          tw="inline-block text-center px-12 pt-6 pb-5 w-full text-white rounded-md transition transition-all
                         duration-100 transform focus:translate-y-1 focus:outline-none"
          href={applyUrl}
          target="_blank"
          rel="noreferrer"
        >
          Apply Now
        </a>
      </ApplyNow>
    </div>
  );
};

export default JobDetails;
