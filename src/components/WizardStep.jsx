import React from 'react';

import wizardComponents from './wizard/components.wizard.js';

class WizardStep extends React.Component {

  constructor(props) {
    super(props);
    const { step } = props;
    this.state = {
      [step.id]: step.defaultValue
    }
    this.next = this.next.bind(this);
    this.finished = this.finished.bind(this);
  }

  next() {
    const { next } = this.props;
    next(Object.assign({}, this.state));
  }

  finished() {
    const { finished } = this.props;
    finished(Object.assign({}, this.state));
  }

  onChange(step, event) {
    const data = this.state;
    const valid = step.validate(this.state);
    const newState = Object.assign({}, this.state, {
      [step.id]: event.target.value,
    });
    this.setState(newState);
  }

  render() {
    const { step, prev, next, finished } = this.props;
    const { type, id } = step;
    const data = this.state;
    const WizardComponent = wizardComponents[type];
    return (
      <div className="step">
        <WizardComponent
          data={data}
          step={step}
          onChange={this.onChange.bind(this, step)}
        />
        {prev && <button className="prev" onClick={prev} >Prev</button>}
        {next && <button className="next" onClick={this.next} >Next</button>}
        {finished && <button className="finished" onClick={this.finished} >Finished</button>}
      </div>
    );
  }
}


export default WizardStep;
