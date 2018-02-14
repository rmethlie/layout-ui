import React from 'react';
import toolchain from './toolchain.js';

export const mapToolsToComponents = (id, tools) =>
  tools.map((tool) => {
    const ToolComponent = toolchain[tool];
    return <ToolComponent key={`${tool}-${id}`} id={id}></ToolComponent>
  });

// RosterTools
export default ({ id, tools }) =>
  <div className="roster-tools">{mapToolsToComponents(id, tools)}</div>
