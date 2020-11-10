import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import 'twin.macro';
import JobsContext from '../context/JobsContext';
import FilterIcon from './FilterIcon';
import FilterModal from './FilterModal';

const SearchForm = styled.form`
  top: -4.4rem;
`;

const StyledSearchInput = styled.input`
  border-radius: 0.6rem;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
`;

const FilterButton = styled.button`
  top: 50%;
  right: 8.2rem;
  transform: translateY(-50%);

  &:active {
    transform: translateY(-46%);
  }
`;

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.violet};
  border-radius: 0.5rem;
  top: 50%;
  transform: translateY(-50%);

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.lightViolet};
  }

  &:active {
    transform: translateY(-48%);
  }
`;

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
      <SearchForm tw="relative w-full h-32" onSubmit={queryTitle}>
        <label htmlFor="title-filter">
          <StyledSearchInput
            type="text"
            name="Title filter"
            id="title-filter"
            placeholder="Filter by title..."
            tw="w-full h-full px-8 focus:outline-none focus:shadow-md hover:shadow-md"
            value={titleQuery}
            onChange={onChangeTitleQuery}
          />
        </label>
        <FilterButton
          tw="absolute transition-all duration-200 focus:outline-none"
          onClick={() => setIsModalShown(true)}
          type="button"
        >
          <FilterIcon />
        </FilterButton>
        <SearchButton
          tw="absolute right-0 mr-8 
        flex justify-center items-center h-16 w-16 text-white 
        transition-all duration-200 focus:outline-none focus:shadow-md 
        hover:shadow-md"
          type="submit"
        >
          <i tw="transform -rotate-90 scale-125" className="las la-search"></i>
        </SearchButton>
      </SearchForm>

      {isModalShown && (
        <FilterModal
          setIsModalShown={(modalShown) => setIsModalShown(modalShown)}
        />
      )}
    </>
  );
};

export default SearchInput;
