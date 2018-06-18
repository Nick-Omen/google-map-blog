import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Details extends React.Component {
  render() {

    if (!this.props.article) {
      return (
        <Redirect to="/404" />
      )
    }

    return (
      <div>{this.props.article.id}</div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.places.details
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
