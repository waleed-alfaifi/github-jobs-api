import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import 'twin.macro';

import JobContext from '../context/JobsContext';
import CustomCheckbox from './CustomCheckbox';

import locationIcon from '../images/desktop/icon-location.svg';

const Modal = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  margin: 50% 2.4rem;
  height: 21.7rem;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const LocationContainer = styled.div`
  padding-left: 5.7rem;
  padding-top: 2.4rem;
  padding-bottom: 2.4rem;
`;

const LocationIcon = styled.img`
  margin-left: 2.4rem;
`;

const LocationInput = styled.input`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
`;

const InputContainer = styled.div`
  padding-left: 2.4rem;
  padding-bottom: 2.4rem;

  label {
    color: ${({ theme }) => theme.textColor};
  }
`;

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.violet};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.lightViolet};
  }
`;

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
      <Modal onClick={() => setIsModalShown(false)} tw="md:hidden">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <ModalContent tw="rounded-md" onClick={(e) => e.stopPropagation()}>
          <LocationContainer tw="relative pr-10">
            <LocationIcon
              src={locationIcon}
              alt="Filter jobs"
              tw="absolute left-0"
            />
            <LocationInput
              type="text"
              placeholder="Filter by location..."
              tw="focus:outline-none"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              autoFocus
            />
          </LocationContainer>
          <hr style={{ border: '1px solid #6E8098', opacity: '0.2' }} />
          <InputContainer tw="pr-10">
            <CustomCheckbox
              labelName="Full Time Only"
              checkboxName="full_time"
              checkboxId="full_time_mobile"
              getCheckedValue={(checked) => setIsFulltime(checked)}
              checked={isFulltime}
              setChecked={setIsFulltime}
            />
            <SearchButton
              tw="px-12 pt-6 pb-5 mt-8 w-full text-white rounded-md transition transition-all
                         duration-100 transform focus:translate-y-1 focus:outline-none"
              type="submit"
            >
              Search
            </SearchButton>
          </InputContainer>
        </ModalContent>
      </Modal>
    </form>
  );
};

export default FilterModal;
