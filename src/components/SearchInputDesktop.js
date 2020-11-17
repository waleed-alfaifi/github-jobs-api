import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import 'twin.macro';
import JobsContext from '../context/JobsContext';
import searchIcon from '../images/desktop/icon-search.svg';
import locationIcon from '../images/desktop/icon-location.svg';
import CustomCheckbox from './CustomCheckbox';
import useInput from '../hooks/useInput';

const SearchForm = styled.form`
  top: -4.4rem;
`;

const FlexBox_1 = styled.label`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 0.6rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  flex-basis: 223px;
`;

const StyledSearchInput = styled.input`
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  background-color: inherit;
  color: ${({ theme }) => theme.textColor};
  width: 100%;
`;

const FlexBox_2 = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-left: 1px solid rgba(110, 128, 152, 0.2);
  border-right: 1px solid rgba(110, 128, 152, 0.2);
  flex-basis: 214px;
`;

const LocationInput = styled.input`
  background-color: inherit;
  color: ${({ theme }) => theme.textColor};

  // To prevent input from overflowing
  width: 100%;
`;

const FlexBox_3 = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 0.6rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  flex-basis: 300px;
  flex-grow: 0.5;
`;

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.violet};
  border-radius: 0.5rem;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.lightViolet};
  }
`;

const InputContainer = styled.div`
  label {
    color: ${({ theme }) => theme.textColor};
  }
`;

const SearchInput = () => {
  const {
    jobsState: {
      titleQuery: globalTitleQuery,
      location_query,
      is_fulltime_query,
    },
    dispatch,
  } = useContext(JobsContext);

  const [titleQuery, , bindTitle] = useInput(globalTitleQuery);
  const [locationQuery, , bindLocation] = useInput(location_query);
  const [isFulltime, setIsFulltime] = useState(is_fulltime_query);

  const submitForm = (e) => {
    e.preventDefault();

    dispatch({ type: 'title_query', payload: titleQuery });
    dispatch({ type: 'location_query', payload: locationQuery.trim() });
    dispatch({ type: 'is_fulltime_query', payload: isFulltime });
  };

  return (
    <>
      <SearchForm
        tw="hidden relative w-full h-32 md:flex justify-center"
        onSubmit={submitForm}
      >
        <FlexBox_1 tw="lg:flex-grow flex items-center pl-10">
          <img src={searchIcon} alt="Search title" />
          <StyledSearchInput
            type="text"
            name="Title filter"
            placeholder="Filter by title..."
            tw="h-full px-6 focus:outline-none"
            {...bindTitle}
          />
        </FlexBox_1>
        <FlexBox_2 tw="lg:flex-grow relative flex items-center pl-8">
          <img src={locationIcon} alt="Locaton" />
          <LocationInput
            type="text"
            placeholder="Filter by location..."
            tw="h-full px-6 focus:outline-none"
            {...bindLocation}
          />
        </FlexBox_2>
        <FlexBox_3 tw="flex items-center">
          <InputContainer tw="flex-grow flex items-center justify-center">
            <CustomCheckbox
              labelName="Full Time Only"
              checkboxName="full_time"
              checkboxId="full_time_desktop"
              checked={isFulltime}
              setChecked={setIsFulltime}
            />
          </InputContainer>
          <SearchButton
            tw="flex-grow text-white w-32 mx-4 py-4 transition-all duration-200 focus:outline-none focus:shadow-md hover:shadow-md"
            type="submit"
          >
            Search
          </SearchButton>
        </FlexBox_3>
      </SearchForm>
    </>
  );
};

export default SearchInput;
