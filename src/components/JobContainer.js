import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import 'twin.macro';
import Loader from './Loader';
import JobCard from './JobCard';

import JobsContext from '../context/JobsContext';

import { proxiedAPIUrl, alternativeDataUrl } from '../constants/urls';

const LoadMoreButton = styled.button`
  background-color: #5964e0;
  &:hover,
  &:focus {
    background-color: #939bf4;
  }
`;

const JobContainer = () => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      fetchJobs();
    }
  }, []);

  const fetchJobs = async () => {
    try {
      const requestUrl = `${proxiedAPIUrl}?page=${apiPage}`;
      const res = await fetch(requestUrl);
      const data = await res.json();

      setLoading(false);

      dispatch({ type: 'update_jobs', payload: data });
      dispatch({ type: 'update_page' });

      if (data.length === 0) {
        dispatch({ type: 'fetched_all_jobs' });
      }

      return true;
    } catch (err) {
      setLoading(false);
      console.error(err);
      await fetchJobsAlternative();
      dispatch({ type: 'failed_fetching' });

      return false;
    }
  };

  const fetchJobsAlternative = async () => {
    try {
      const res = await fetch(alternativeDataUrl);
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

  if (loading) {
    return (
      <Loader
        blocking={loading}
        message="Please while we are loading your data 😉"
      ></Loader>
    );
  }

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
      <div tw="grid gap-x-4 lg:gap-x-8 xl:gap-x-12 md:gap-y-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-24">
        {jobs.map((job) => {
          if (
            filterBy(job.title, titleQuery) &&
            filterBy(job.location, location_query) &&
            filterByType(job.type, is_fulltime_query)
          ) {
            return (
              <JobCard
                key={job.id}
                jobId={job.id}
                imgSource={job.company_logo}
                creationDate={job.created_at}
                type={job.type}
                title={job.title}
                companyName={job.company}
                location={job.location}
              />
            );
          }

          return '';
        })}
      </div>

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
