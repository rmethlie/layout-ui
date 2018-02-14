import React from 'react';
import { connect } from 'react-redux';
// components
import WizardStep from './WizardStep.jsx';
import types from './wizard/types.wizard.js';
import { API, Store } from '../store/actions.js';

function generateKey() {
  return Math.floor(Math.random() * (new Date().getTime()));
}

class Wizard extends React.Component {

  constructor() {
    super();
    this.state = {
      current: 0
    };
    this.data = [];
    this.checkClickOutside = this.checkClickOutside.bind(this);
    this.checkEscape = this.checkEscape.bind(this);
  }

  next(step, data) {
    const { current } = this.state;
    if (step && step.validate(data)) {
      this.data = Object.assign({}, this.data, data);
      this.setState({current: current + 1});
    }
  }

  prev() {
    const { current } = this.state;
    this.setState({current: current - 1});
  }

  finished(step, data) {
    const { current } = this.state;
    const { dispatcher } = this.props;
    const { type, submit } = step;
    if (step && step.validate(data) && submit) {
      console.log('submitting', data);
      submit(dispatcher, data);
    } else {
      console.warn('invalid data', data);
    }
  }

  checkEscape(event) {
    // bail if not active
    if (!this.props.active) return;
    // if we're still here, check the keystroke
    if (event.key === 'Escape') {
      this.props.close();
    }
  }

  checkClickOutside(event) {
    if (event.target.className === 'wizard') {
      this.props.close();
    }
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.checkEscape);
  }

  render() {
    if (!this.props.active) {
      return <div></div>;
    }
    const { current } = this.state;
    const { type, close } = this.props;
    const steps = types[type];
    const step = steps[current];
    // if this is the last step, dont provide a next function
    const next = current < steps.length - 1 ?
      this.next.bind(this, step) : null;
    // if its the first step, dont provide a prev function
    const prev = current === 0 ?
      null : this.prev.bind(this);
    const finished = current === steps.length - 1 ?
      this.finished.bind(this, step) : null;

    return (
      <div className="wizard" onClick={this.checkClickOutside}>
        <div className="steps">
          <div className="steps-info">
            <span className="step-title">{step.title}</span>:&nbsp;&nbsp;
            <span>Step {current + 1} of {steps.length}</span>

          </div>
          <WizardStep
            next={next}
            prev={prev}
            finished={finished}
            step={step}
          />
        </div>
      </div>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
    dispatcher: (data) => dispatch(data),
    close: () => dispatch(Store.UI.hideWizard())
  }
}


export function mapStateToProps(state) {
  return {
    active: state.ui.wizardActive,
    type: state.ui.wizardType
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
