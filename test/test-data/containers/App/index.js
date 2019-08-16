import React from 'react';
import { connect } from 'react-redux';
import {
  greet,
} from './actions';
import InjectorTest from '../InjectorTest';

const App = ({greetName, greet, child}) => child;

const mapStateToProps = (state) => {
  return {
    greetName: state.global.greetName
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    greet: (greetName) => dispatch(greet(greetName)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
