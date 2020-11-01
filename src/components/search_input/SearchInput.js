import React, { useState, useEffect, useContext } from 'react';

import JobsContext from '../../context/JobsContext';

import './search_input.css';
import filterIcon from '../../images/mobile/icon-filter.svg';
import FilterModal from '../filter_modal/FilterModal';

const SearchInput = () => {
  const [titleQuery, setTitleQuery] = useState('');
  const [isModalShown, setIsModalShown] = useState(false);

  const {
    jobsState: { titleQuery: globalTitleQuery },
    dispatch,
  } = useContext(JobsContext);

  useEffect(() => {
    setTitleQuery(globalTitleQuery);
  }, []);

  const queryTitle = (e) => {
    e.preventDefault();
    dispatch({ type: 'title_query', payload: titleQuery });
  };

  const onChangeTitleQuery = (e) => {
    setTitleQuery(e.target.value);
  };

  return (
    <>
      <form
        className="search-container relative w-full h-32"
        onSubmit={queryTitle}
      >
        <label htmlFor="title-filter" className="">
          <input
            type="text"
            name="Title filter"
            id="title-filter"
            placeholder="Filter by title..."
            className="search-input w-full h-full px-8 focus:outline-none focus:shadow-md hover:shadow-md"
            value={titleQuery}
            onChange={onChangeTitleQuery}
          />
        </label>

        <button
          className="filter-button absolute transition-all duration-200 focus:outline-none"
          onClick={() => setIsModalShown(true)}
          type="button"
        >
          <img src={filterIcon} alt="Filter jobs" />
        </button>
        <button
          className="search-button absolute right-0 mr-8 
        flex justify-center items-center h-16 w-16 text-white 
        transition-all duration-200 focus:outline-none focus:shadow-md 
        hover:shadow-md"
          type="submit"
        >
          <i className="las la-search transform -rotate-90 scale-125"></i>
        </button>
      </form>

      {isModalShown && (
        <FilterModal
          setIsModalShown={(modalShown) => setIsModalShown(modalShown)}
        />
      )}
    </>
  );
};

export default SearchInput;
