import * as React from 'react';
import { PropagateLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-96'>
      <PropagateLoader color='#22B357' />
    </div>
  );
};

export default Loader;
