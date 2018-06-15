import React from 'react';
import classes from './Controls.css';
import classnames from 'classnames';

export default class Controls extends React.Component {
  render() {
    const { className } = this.props;

    return (
      <div className={classnames(className, classes.controls)}>

      </div>
    );
  }
}
