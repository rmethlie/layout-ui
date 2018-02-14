import React from 'react';
import { keyGenerator } from '../component.util.js';

export default ({ step, onChange, data }) =>
  <div>
    <span style={{marginRight: '5px'}}>Type:</span>
    <select value={data[step.id]} onChange={onChange}>
      {step.choices.map((choice) =>
        <option
          key={keyGenerator()}
          value={choice.value}
          onChange={onChange}
        >{choice.label}</option>
      )}
    </select>
  </div>;
