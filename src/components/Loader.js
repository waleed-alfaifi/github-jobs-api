import styled from 'styled-components';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

const StyledLoader = styled(BlockUi)`
  height: 50vh;

  .block-ui-overlay {
    background-color: transparent;
  }
`;

export default StyledLoader;
