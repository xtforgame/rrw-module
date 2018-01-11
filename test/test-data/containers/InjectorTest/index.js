import React from 'react';
import { connect } from 'react-redux';
import {
  ping,
} from './actions';
import { makeModule } from '../../../../src';
import reducer from './reducer';
import epic from './epic';
import saga from './saga';

let InjectorTest = ({ pingCounter, ping }) => null;

export default makeModule('InjectorTest', {
  reducer,
  epic,
  saga,
})(
  connect(
    state => ({ pingCounter: state.get('InjectorTest').pingCounter }),
    { ping }
  )(
    InjectorTest
  )
);
