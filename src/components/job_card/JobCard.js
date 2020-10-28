import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import './job_card.css';

dayjs.extend(relativeTime);

const JobCard = ({
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
      className={`job-card relative bg-white rounded-lg mb-20 p-12 pt-20 hover:shadow-md ${className}`}
    >
      <img
        src={
          imgSource ||
          'https://rfqassist.com/wp-content/uploads/2020/03/company-placeholder.png'
        }
        alt={title}
        className="absolute top-0 left-0 ml-12 -mt-8 w-20 h-20 bg-white p-2 shadow-xs rounded-3xl object-contain"
      />
      <p className="job-card-metadata mb-3">
        <span className="mr-2">{dayjs(creationDate).fromNow()}</span> &#183;
        <span className="ml-4">{type}</span>
      </p>
      <h3 className="job-title mb-3">{title}</h3>
      <p className="job-company-name mb-10">{companyName}</p>
      <div className="job-location font-bold">{location}</div>
    </div>
  );
};

export default JobCard;
