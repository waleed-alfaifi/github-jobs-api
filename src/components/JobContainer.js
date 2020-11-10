import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import 'twin.macro';
import JobCard from './JobCard';

import JobsContext from '../context/JobsContext';

const LoadMoreButton = styled.button`
  background-color: #5964e0;
  &:hover,
  &:focus {
    background-color: #939bf4;
  }
`;

const JobContainer = () => {
  const [loadingMore, setLoadingMore] = useState(false);

  const {
    jobsState: {
      jobs,
      apiPage,
      titleQuery,
      location_query,
      is_fulltime_query,
      fetchedAllJobs,
      failedFetching,
    },
    dispatch,
  } = useContext(JobsContext);

  useEffect(() => {
    if (jobs <= 0) {
      fetchJobs();
    }
  }, []);

  const fetchJobs = async () => {
    const githubJobsUrl = `https://jobs.github.com/positions.json?page=${apiPage}`;
    // const proxyUrl = '';
    // const proxyUrl = 'https://cors-anywhere.herokuapp.net/';
    const proxyUrl = 'https://cors-anywhere-84.herokuapp.com/';

    try {
      const requestUrl = proxyUrl + githubJobsUrl;
      const res = await fetch(requestUrl);
      const data = await res.json();

      dispatch({ type: 'update_jobs', payload: data });
      dispatch({ type: 'update_page' });

      if (data.length === 0) {
        dispatch({ type: 'fetched_all_jobs' });
      }

      return true;
    } catch (err) {
      console.error(err);
      await fetchJobsAlternative();
      dispatch({ type: 'failed_fetching' });

      return false;
    }
  };

  const fetchJobsAlternative = async () => {
    try {
      const requestUrl = '/data.json';
      const res = await fetch(requestUrl);
      const data = await res.json();

      dispatch({ type: 'update_jobs', payload: data });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const loadMore = async () => {
    setLoadingMore(true);
    await fetchJobs();
    setLoadingMore(false);
  };

  const filterBy = (jobPropery, query) =>
    jobPropery.toLowerCase().includes(query.toLowerCase()) || query === '';

  const filterByType = (jobType, isFullTime = false) =>
    isFullTime ? jobType.toLowerCase().includes('full time') : true;

  return (
    <div>
      {failedFetching && (
        <div tw="bg-red-600 p-8 mb-16 -mt-8 rounded-md text-white">
          <p>
            <strong>Warning</strong>: If you are seeing this message, that means
            there is something wrong with the Jobs API, the sadness 😢.
          </p>
          <p>
            No one knows when it will come back to work but you can try
            reloading the page. Until then I have put some old jobs data for you
            to try out the website, but bear in mind they might be outdated.
          </p>
        </div>
      )}
      {jobs.map((job, index) => {
        if (
          filterBy(job.title, titleQuery) &&
          filterBy(job.location, location_query) &&
          filterByType(job.type, is_fulltime_query)
        ) {
          return (
            <JobCard
              jobId={job.id}
              key={job.id}
              imgSource={job.company_logo}
              creationDate={job.created_at}
              type={job.type}
              title={job.title}
              companyName={job.company}
              location={job.location}
              className={index === jobs.length - 1 ? 'last' : ''}
            />
          );
        }

        return '';
      })}

      {jobs.length > 0 && !fetchedAllJobs && !failedFetching && (
        <div tw="text-center mt-16 mb-24">
          <LoadMoreButton
            tw="px-12 pt-6 pb-5 text-white rounded-md transition transition-all duration-100 transform focus:translate-y-1 focus:outline-none"
            onClick={() => loadMore()}
          >
            Load More
            {loadingMore && (
              <i tw="ml-2 animate-spin" className="las la-spinner"></i>
            )}
          </LoadMoreButton>
        </div>
      )}
    </div>
  );
};

export default JobContainer;
