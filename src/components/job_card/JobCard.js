import React from 'react';
import 'twin.macro';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import './job_card.css';
import { Link } from 'gatsby';

dayjs.extend(relativeTime);

const JobCard = ({
  jobId,
  imgSource,
  creationDate,
  type,
  title,
  companyName,
  location,
  className,
}) => {
  return (
    <div
      tw="relative bg-white rounded-lg mb-20 p-12 pt-20 hover:shadow-md"
      className={`job-card ${className}`}
    >
      <img
        src={
          imgSource ||
          'https://rfqassist.com/wp-content/uploads/2020/03/company-placeholder.png'
        }
        alt={title}
        tw="absolute top-0 left-0 ml-12 -mt-8 w-20 h-20 bg-white p-2 shadow-xs rounded-3xl object-contain"
      />
      <p tw="mb-3" className="job-card-metadata">
        <span tw="mr-2">{dayjs(creationDate).fromNow()}</span> &#183;
        <span tw="ml-4">{type}</span>
      </p>
      <h3 tw="mb-3" className="job-title">
        <Link to={`/job/${jobId}`}>{title}</Link>
      </h3>
      <p tw="mb-10" className="job-company-name">
        {companyName}
      </p>
      <div tw="font-bold" className="job-location">
        {location}
      </div>
    </div>
  );
};

export default JobCard;
