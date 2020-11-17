import React from 'react';
import PropTypes from 'prop-types';
import 'twin.macro';
import styled from 'styled-components';

const Checkbox = styled.input`
  visibility: hidden;
`;

const Label = styled.label`
  cursor: pointer;
  padding: 0;

  &::before {
    content: '';
    margin-right: 1.6rem;
    display: inline-block;
    width: 2.4rem;
    height: 2.4rem;
    background-color: ${({ theme }) => theme.textColor};
    opacity: 0.1;
    border-radius: 3px;

    ${Checkbox}:hover + &, ${Checkbox}:checked + & {
      background-color: ${({ theme }) => theme.colors.violet};
    }

    ${Checkbox}:hover + & {
      opacity: 0.25;
    }

    ${Checkbox}:checked + & {
      opacity: 1;
    }
  }
`;

const CheckMark = styled.i`
  top: 50%;
  left: 0.4rem;
  transform: translateY(-50%);

  ${Checkbox}:checked + ${Label} & {
    opacity: 1;
  }
`;

const CustomCheckbox = ({
  labelName,
  checkboxName,
  checkboxId,
  checked,
  setChecked,
}) => {
  return (
    <>
      <Checkbox
        type="checkbox"
        name={checkboxName}
        id={checkboxId}
        tw="opacity-0"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <Label tw="relative flex items-start" htmlFor={checkboxId}>
        <span tw="font-bold">{labelName}</span>
        <CheckMark
          tw="absolute text-white opacity-0"
          className="las la-check"
        ></CheckMark>
      </Label>
    </>
  );
};

CustomCheckbox.propTypes = {
  labelName: PropTypes.string.isRequired,
  checkboxName: PropTypes.string.isRequired,
  checkboxId: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
};

export default CustomCheckbox;
