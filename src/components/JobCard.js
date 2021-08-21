import React, { useState } from 'react';
import styled from 'styled-components';
import 'twin.macro';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Link } from 'gatsby';

dayjs.extend(relativeTime);

const StyledJobCard = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  min-height: 22.8rem;
  &:hover {
    box-shadow: 0 4px 6px -1px ${({ theme }) => theme.boxShadow},
      0 2px 4px -1px ${({ theme }) => theme.boxShadow};
  }
`;

const Metadata = styled.p`
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const Title = styled.h3`
  line-height: 2.4rem;
  color: ${({ theme }) => theme.textColor};
`;

const CompanyName = styled.p`
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const Location = styled.div`
  color: ${({ theme }) => theme.colors.violet};
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
}) => {
  const [imageUrl, setImageUrl] = useState(imageSource || 'https://rfqassist.com/wp-content/uploads/2020/03/company-placeholder.png');
  
  return (
    <StyledJobCard tw="relative flex flex-col rounded-lg mb-20 md:mb-0 last:mb-0 p-12 pt-20">
      <div tw="flex-grow">
        <img
          src={imageUrl}
          alt={title}
          onError={() => setImageUrl('https://rfqassist.com/wp-content/uploads/2020/03/company-placeholder.png')}
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
      </div>
      <Location tw="font-bold">{location}</Location>
    </StyledJobCard>
  );
};

export default JobCard;
