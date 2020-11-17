import { useState } from 'react';

export default (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const bind = {
    value,
    onChange: (e) => setValue(e.target.value),
  };

  const reset = () => setValue('');

  return [value, setValue, bind, reset];
};
