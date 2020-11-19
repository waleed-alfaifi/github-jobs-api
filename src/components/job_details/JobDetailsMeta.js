import React from 'react';
import styled from 'styled-components';
import 'twin.macro';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Metadata = styled.p`
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const Title = styled.h3`
  line-height: 2.4rem;
  color: ${({ theme }) => theme.textColor};
`;

const Location = styled.div`
  color: ${({ theme }) => theme.colors.violet};
  font-size: 1.4rem;
  line-height: 1.7rem;
`;

const ApplyNowLink = styled.a`
  background-color: ${({ theme }) => theme.colors.violet};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.lightViolet};
  }
`;

const JobDetailsMeta = ({ created_at, type, title, location, applyLink }) => {
  return (
    <div tw="grid md:grid-cols-3 items-center mb-12">
      <div tw="md:col-span-2">
        <Metadata tw="mb-3">
          <span tw="mr-2">{dayjs(created_at).fromNow()}</span> &#183;
          <span tw="ml-4">{type}</span>
        </Metadata>
        <Title tw="mb-3">{title}</Title>
        <Location tw="font-bold">{location}</Location>
      </div>
      <ApplyNowLink
        tw="inline-block text-center px-12 pt-6 pb-5 mt-8 md:mt-0 md:ml-auto md:mr-4 w-full md:w-auto text-white rounded-md transition transition-all
                         duration-100 transform focus:translate-y-1 focus:outline-none"
        href={applyLink}
        target="_blank"
        rel="noreferrer"
      >
        Apply Now
      </ApplyNowLink>
    </div>
  );
};

export default JobDetailsMeta;
