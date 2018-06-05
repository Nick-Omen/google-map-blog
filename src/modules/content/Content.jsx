import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './Content.css';
import classnames from 'classnames';

class Content extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string.isRequired,
    isHidden: PropTypes.bool,
  };

  render() {
    const { className, isHidden, children } = this.props;

    return (
      <div className={classnames(className, classes.content, {[classes.isHidden]: isHidden})}>
        {children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isHidden: state.content.hidden
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
