import React, { useState, useEffect, useContext } from 'react';
import JobCard from '../job_card/JobCard';

import JobsContext from '../../context/JobsContext';

import './job_container.css';

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
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    try {
      const res = await fetch(proxyUrl + githubJobsUrl);
      // const res = await fetch('/data.json');
      const data = await res.json();

      dispatch({ type: 'update_jobs', payload: data });
      dispatch({ type: 'update_page' });

      if (data.length === 0) {
        dispatch({ type: 'fetched_all_jobs' });
      }

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
      {jobs.length > 0 && !fetchedAllJobs && (
        <div className="text-center mt-16 mb-24">
          <button
            className="load-more-button px-12 pt-6 pb-5 text-white rounded-md transition transition-all duration-100 transform focus:translate-y-1 focus:outline-none"
            onClick={() => loadMore()}
          >
            Load More
            {loadingMore && (
              <i className="las la-spinner ml-2 animate-spin"></i>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default JobContainer;
