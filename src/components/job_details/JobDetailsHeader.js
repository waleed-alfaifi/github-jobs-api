import React, { useState } from 'react';
import styled from 'styled-components';
import 'twin.macro';

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  min-height: 20.5rem;
  top: -1.4rem;

  h3 {
    color: ${({ theme }) => theme.textColor};
  }

  p {
    color: ${({ theme }) => theme.colors.darkGrey};
  }

  a {
    background-color: ${({ theme }) => theme.buttonSecondary.backgroundColor};
    color: ${({ theme }) => theme.buttonSecondary.textColor};

    &:hover {
      background-color: ${({ theme }) => theme.buttonSecondary.hoverColor};
    }
  }

  @media (min-width: 768px) {
    min-height: 14rem;
  }
`;

const JobDetailsHeader = ({ job }) => {
  const placeholderImg = "/company-placeholder.jpg";
  const [imageUrl, setImageUrl] = useState(job.company_logo || placeholderImg);
  
  return (
    <Container tw="flex flex-col md:flex-row items-center relative rounded-md md:rounded-bl-lg text-center md:text-left pt-20 px-8 pb-8 md:p-0 mb-4">
      <img
        src={imageUrl}
        alt={job.title}
        onError={() => setImageUrl(placeholderImg)}
        tw="md:self-stretch relative -mt-32 mb-8 md:mt-0 md:mb-0 w-20 h-20 md:w-56 md:h-auto bg-white p-2 shadow-xs rounded-3xl md:rounded-none md:rounded-bl-lg object-contain"
      />

      <div tw="md:ml-12">
        <h3>{job.company}</h3>
        <p tw="mb-12 md:mb-0">{job.company}</p>
      </div>
      <a
        href={job.company_url}
        tw="px-10 py-6 mb-6 md:mb-0 md:ml-auto md:mr-12 inline-block rounded-md font-bold"
        target="_blank"
        rel="noreferrer"
      >
        Company Site
      </a>
    </Container>
  );
};

export default JobDetailsHeader;
