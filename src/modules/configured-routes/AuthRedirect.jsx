import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

class AuthRedirect extends React.Component {
  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),
    requiresLogin: PropTypes.bool,
    disallowLogin: PropTypes.bool,
  };

  static defaultProps = {
    loggedIn: false,
    disallowLogin: false,
    requiresLogin: false
  };

  render() {
    const {
      component: ChildComponent,
      loggedIn,
      requiresLogin,
      disallowLogin,
      ...rest
    } = this.props;

    if (
      (!requiresLogin && !loggedIn)
      || (loggedIn && !disallowLogin)
      || (requiresLogin && loggedIn && !disallowLogin)
    ) {
      return <Route {...rest} render={props => (
        <ChildComponent { ...{ ...props, loggedIn: loggedIn } } />
      )} />;
      // } else if (disallowLogin && loggedIn) {
      //   return <Redirect to="/" />;
    }

    return <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthRedirect));

