import React, { useState, useEffect, useContext } from 'react';

import JobContext from '../../context/JobsContext';

import './filter_modal.css';
import locationIcon from '../../images/desktop/icon-location.svg';

const FilterModal = ({ setIsModalShown }) => {
  const {
    jobsState: { location_query, is_fulltime_query },
    dispatch,
  } = useContext(JobContext);

  const [locationQuery, setLocationQuery] = useState('');
  const [isFulltime, setIsFulltime] = useState(false);

  useEffect(() => {
    setLocationQuery(location_query);
    setIsFulltime(is_fulltime_query);
  }, []);

  const submitFilter = (e) => {
    e.preventDefault();

    dispatch({ type: 'location_query', payload: locationQuery.trim() });
    dispatch({ type: 'is_fulltime_query', payload: isFulltime });
    setIsModalShown(false);
  };

  return (
    <form onSubmit={submitFilter}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="filter-modal" onClick={() => setIsModalShown(false)}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className="filter-modal-content bg-white rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="location-container relative pr-10 py-8">
            <img
              src={locationIcon}
              alt="Filter jobs"
              className="location-icon absolute left-0"
            />
            <input
              type="text"
              placeholder="Filter by location..."
              className="focus:outline-none"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              autoFocus
            />
          </div>
          <hr />
          <div className="modal-input-container pr-10">
            <input
              type="checkbox"
              name="full_time"
              id="full_time"
              className="full-time-checkbox opacity-0"
              checked={isFulltime}
              onChange={(e) => setIsFulltime(e.target.checked)}
            />
            <label
              htmlFor="full_time"
              className="full-time-label relative flex items-start"
            >
              <span className="font-bold">Full Time Only</span>
              <i className="full-time-check-mark las la-check absolute left-0 top-0 text-white opacity-0"></i>
            </label>

            <button
              className="filter-modal-search-button px-12 pt-6 pb-5 mt-8 w-full text-white rounded-md transition transition-all
                         duration-100 transform focus:translate-y-1 focus:outline-none"
              type="submit"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FilterModal;
