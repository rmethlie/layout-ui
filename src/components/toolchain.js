import React from 'react';
import RosterAddTool from './tools/RosterAddTool.jsx';
import RosterRemoveTool from './tools/RosterRemoveTool.jsx';
import CloseContainerTool from './tools/CloseContainerTool.jsx';

const tools = {
  CloseContainerTool,
  RosterAddTool,
  RosterRemoveTool
}

class BadTool extends React.Component {
  render() {
    return "BAD COMPONENT";
  }
}

function getBadTool(tool) {
  console.log('bad tool:', tool);
  return BadTool;
}

export default {
  getTool: (tool) => tools[tool] || getBadTool(tool)
}
