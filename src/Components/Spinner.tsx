import React from 'react';

const Spinner = () => {
  return (
    <div className="mx-auto my-12 flex size-16 items-center justify-center">
      <div className="relative size-full">
        <div className="absolute inset-0 animate-spin rounded-full border-t-2 border-blue-600"></div>
      </div>
    </div>
  );
};

export default Spinner;