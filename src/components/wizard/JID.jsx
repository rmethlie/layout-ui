import React from 'react';

export default ({ step, onChange, data }) =>
  <div>
    <input
      style={{ width: '100%' }}
      placeholder={step.placeholder}
      value={data[step.id] || ''}
      onChange={onChange}
    ></input>
  </div>;
