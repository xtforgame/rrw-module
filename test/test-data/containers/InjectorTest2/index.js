import React from 'react';
import { connect } from 'react-redux';
import {
  ping,
} from './actions';
import { makeModule, ModuleConfigs } from 'library';
import reducer from './reducer';
import epic from './epic';
import saga from './saga';

let InjectorTest = ({ pingCounter, ping }) => null;

export default makeModule('InjectorTest2', {
  reducer: new ModuleConfigs({
    reducer,
    resetStateBeforeUnmount: true,
    getResetState: (state, action) => ({
      tickCounter: 0,
      tockCounter: 0,
      pingCounter: 0,
      pongCounter: 0,
    }),
  }),
  epic,
  saga,
})(
  connect(
    state => ({ pingCounter: state.get('InjectorTest2').pingCounter }),
    { ping }
  )(
    InjectorTest
  )
);
