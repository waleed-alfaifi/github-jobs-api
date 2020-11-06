import React from 'react';
import styled from 'styled-components';
import 'twin.macro';

const Container = styled.div`
  min-height: 20.5rem;
  top: -1.4rem;

  p {
    color: #6e8098;
  }

  a {
    color: #5964e0;
    background-color: rgba(89, 100, 224, 0.1);

    &:hover {
      background-color: rgba(89, 100, 224, 0.35);
    }
  }
`;

const CompanyLogo = styled.img`
  top: -25%;
  left: 50%;
  transform: translate(-50%, 50%);
`;

const JobDetailsHeader = ({ job }) => {
  return (
    <Container tw="relative bg-white rounded-md text-center pt-20 px-8 pb-8 mb-4">
      <CompanyLogo
        src={
          job.company_logo ||
          'https://rfqassist.com/wp-content/uploads/2020/03/company-placeholder.png'
        }
        alt={job.title}
        tw="absolute w-20 h-20 bg-white p-2 shadow-xs rounded-3xl object-contain"
      />
      <h3>{job.company}</h3>
      <p tw="mb-12">{job.company}</p>
      <a
        href={job.company_url}
        tw="px-10 py-6 mb-6 inline-block rounded-md font-bold"
        target="_blank"
        rel="noreferrer"
      >
        Company Site
      </a>
    </Container>
  );
};

export default JobDetailsHeader;
