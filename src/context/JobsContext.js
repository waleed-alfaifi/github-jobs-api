import React, { createContext, useReducer } from 'react';

const initialState = {
  jobs: [],
  titleQuery: '',
  location_query: '',
  is_fulltime_query: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'update_jobs':
      return { ...state, jobs: [...state.jobs, ...payload] };
    case 'title_query':
      const triemmedQuery = payload?.trim?.();
      return { ...state, titleQuery: triemmedQuery };
    case 'location_query':
      return { ...state, location_query: payload };
    case 'is_fulltime_query':
      return { ...state, is_fulltime_query: payload };
    default:
      return state;
  }
};

const JobsContext = createContext(initialState);

export const JobsProvider = ({ children }) => {
  const [jobsState, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <JobsContext.Provider
        value={{
          jobsState,
          dispatch,
        }}
      >
        {children}
      </JobsContext.Provider>
    </>
  );
};

export default JobsContext;
