import React, { useState, useEffect, useContext } from 'react';
import 'twin.macro';

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
        tw="relative w-full h-32"
        className="search-container"
        onSubmit={queryTitle}
      >
        <label htmlFor="title-filter">
          <input
            type="text"
            name="Title filter"
            id="title-filter"
            placeholder="Filter by title..."
            tw="w-full h-full px-8 focus:outline-none focus:shadow-md hover:shadow-md"
            className="search-input"
            value={titleQuery}
            onChange={onChangeTitleQuery}
          />
        </label>

        <button
          tw="absolute transition-all duration-200 focus:outline-none"
          className="filter-button"
          onClick={() => setIsModalShown(true)}
          type="button"
        >
          <img src={filterIcon} alt="Filter jobs" />
        </button>
        <button
          tw="absolute right-0 mr-8 
        flex justify-center items-center h-16 w-16 text-white 
        transition-all duration-200 focus:outline-none focus:shadow-md 
        hover:shadow-md"
          type="submit"
          className="search-button"
        >
          <i tw="transform -rotate-90 scale-125" className="las la-search"></i>
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
