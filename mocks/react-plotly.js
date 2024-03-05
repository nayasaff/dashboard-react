const React = require('react');

const Plot = (props) => {
  return React.createElement('div', props, props.children);
};

module.exports = Plot;