import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const JobDetailsMeta = ({ created_at, type, title, location }) => {
  return (
    <div className="mb-12">
      <p className="job-card-metadata mb-3">
        <span className="mr-2">{dayjs(created_at).fromNow()}</span> &#183;
        <span className="ml-4">{type}</span>
      </p>
      <h3 className="job-title mb-3">{title}</h3>
      <div className="job-location font-bold">{location}</div>
      <button
        className="filter-modal-search-button px-12 pt-6 pb-5 mt-8 w-full text-white rounded-md transition transition-all
                         duration-100 transform focus:translate-y-1 focus:outline-none"
        type="submit"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetailsMeta;
