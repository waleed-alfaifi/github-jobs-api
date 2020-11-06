import React from 'react';
import styled from 'styled-components';
import 'twin.macro';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Link } from 'gatsby';

dayjs.extend(relativeTime);

const StyledJobCard = styled.div`
  min-height: 22.8rem;
`;

const Metadata = styled.p`
  color: #6e8098;
`;

const Title = styled.h3`
  line-height: 2.4rem;
`;

const CompanyName = styled.p`
  color: #6e8098;
`;

const Location = styled.div`
  color: #5964e0;
  font-size: 1.4rem;
  line-height: 1.7rem;
`;

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
    <StyledJobCard
      tw="relative bg-white rounded-lg mb-20 p-12 pt-20 hover:shadow-md"
      className={className}
    >
      <img
        src={
          imgSource ||
          'https://rfqassist.com/wp-content/uploads/2020/03/company-placeholder.png'
        }
        alt={title}
        tw="absolute top-0 left-0 ml-12 -mt-8 w-20 h-20 bg-white p-2 shadow-xs rounded-3xl object-contain"
      />
      <Metadata tw="mb-3">
        <span tw="mr-2">{dayjs(creationDate).fromNow()}</span> &#183;
        <span tw="ml-4">{type}</span>
      </Metadata>
      <Title tw="mb-3">
        <Link to={`/job/${jobId}`}>{title}</Link>
      </Title>
      <CompanyName tw="mb-10">{companyName}</CompanyName>
      <Location tw="font-bold">{location}</Location>
    </StyledJobCard>
  );
};

export default JobCard;
