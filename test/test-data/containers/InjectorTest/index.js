import React from 'react';
import { connect } from 'react-redux';
import {
  ping,
} from './actions';
import { useModule } from '../../../../src';
import reducer from './reducer';
import epic from './epic';
import saga from './saga';

export default (props) => {
  useModule(props, 'InjectorTest', {
    reducer,
    epic,
    saga,
  });
  return null;
};
