import React from 'react';
import { connect } from 'react-redux';

class List extends React.Component {
  render() {

    return (
      <div>List</div>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.list
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(List);
