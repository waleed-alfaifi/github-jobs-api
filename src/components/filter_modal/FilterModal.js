import React, { useState, useEffect, useContext } from 'react';
import 'twin.macro';

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
          tw="bg-white rounded-md"
          className="filter-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div tw="relative pr-10 py-8" className="location-container">
            <img
              src={locationIcon}
              alt="Filter jobs"
              tw="absolute left-0"
              className="location-icon"
            />
            <input
              type="text"
              placeholder="Filter by location..."
              tw="focus:outline-none"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              autoFocus
            />
          </div>
          <hr />
          <div tw="pr-10" className="modal-input-container">
            <input
              type="checkbox"
              name="full_time"
              id="full_time"
              tw="opacity-0"
              className="full-time-checkbox"
              checked={isFulltime}
              onChange={(e) => setIsFulltime(e.target.checked)}
            />
            <label
              htmlFor="full_time"
              tw="relative flex items-start"
              className="full-time-label"
            >
              <span tw="font-bold">Full Time Only</span>
              <i
                tw="absolute text-white opacity-0"
                className="full-time-check-mark las la-check"
              ></i>
            </label>

            <button
              tw="px-12 pt-6 pb-5 mt-8 w-full text-white rounded-md transition transition-all
                         duration-100 transform focus:translate-y-1 focus:outline-none"
              className="filter-modal-search-button"
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
