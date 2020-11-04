import React from 'react';
import 'twin.macro';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const JobDetailsMeta = ({ created_at, type, title, location, applyLink }) => {
  return (
    <div tw="mb-12">
      <p tw="mb-3" className="job-card-metadata">
        <span tw="mr-2">{dayjs(created_at).fromNow()}</span> &#183;
        <span tw="ml-4">{type}</span>
      </p>
      <h3 tw="mb-3" className="job-title">
        {title}
      </h3>
      <div tw="font-bold" className="job-location">
        {location}
      </div>
      <a
        tw="inline-block text-center px-12 pt-6 pb-5 mt-8 w-full text-white rounded-md transition transition-all
                         duration-100 transform focus:translate-y-1 focus:outline-none"
        className="filter-modal-search-button"
        href={applyLink}
        target="_blank"
        rel="noreferrer"
      >
        Apply Now
      </a>
    </div>
  );
};

export default JobDetailsMeta;
