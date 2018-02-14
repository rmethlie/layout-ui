import React from 'react';
import toolchain from './toolchain.js';

export function handleToolClick(event) {
  console.log(event.type);
}

export const mapToolsToComponents = (id, tools) =>
  tools.map((tool) => {
    const ToolComponent = toolchain.getTool(tool);
    return (
      <ToolComponent
        key={`${tool}-${id}`}
        id={`${tool}-${id}`}
        handler={handleToolClick}
      ></ToolComponent>
    )
  });

export default ({ id, tools }) =>
  <div className="toolbar">{mapToolsToComponents(id, tools)}</div>
