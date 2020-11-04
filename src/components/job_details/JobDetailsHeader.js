import React from 'react';
import 'twin.macro';

const JobDetailsHeader = ({ job }) => {
  return (
    <div
      tw="relative bg-white rounded-md text-center pt-20 px-8 pb-8 mb-4"
      style={{ minHeight: '20.5rem', top: '-1.4rem' }}
    >
      <img
        src={
          job.company_logo ||
          'https://rfqassist.com/wp-content/uploads/2020/03/company-placeholder.png'
        }
        alt={job.title}
        tw="absolute w-20 h-20 bg-white p-2 shadow-xs rounded-3xl object-contain"
        style={{
          top: '-25%',
          left: '50%',
          transform: 'translate(-50%, 50%)',
        }}
      />
      <h3>{job.company}</h3>
      <p tw="mb-12" className="job-company-name">
        {job.company}
      </p>
      <a
        href={job.company_url}
        tw="px-10 py-6 mb-6 inline-block rounded-md font-bold"
        className="job-detail-company-url"
        target="_blank"
        rel="noreferrer"
      >
        Company Site
      </a>
    </div>
  );
};

export default JobDetailsHeader;
