import { shallow, mount, render } from 'enzyme';
import React from 'react';

import configureStore from '../test-data/configureStore';
import Root from '../test-data/app';
import InjectorTest2 from '../test-data/containers/InjectorTest2';
import {
  synTick as globalSynTick,
  tick as globalTick,
  tock as globalTock,
  ping as globalPing,
  pong as globalPong,
} from '../test-data/containers/App/actions';

import {
  synTick as localSynTick,
  tick as localTick,
  tock as localTock,
  ping as localPing,
  pong as localPong,
  reset as localReset,
} from '../test-data/containers/InjectorTest2/actions';

const delay = (millisec) => {
  return new Promise(resolve => {
    setTimeout(resolve, millisec);
  });
}

describe('Basic', () => {
  let initialState = {};
  let store = null;
  beforeEach(() => {
    initialState = {};
    store = configureStore(initialState);
  });

  const getGlobal = (key) => {
    return store.getState().global[key];
  }
  
  const getLocal = (key) => {
    return store.getState().InjectorTest2[key];
  }

  it('Epic', () => {
    const wrapper = mount(<Root store={store} child={<InjectorTest2 />} />);
    const instance = wrapper.instance();
    wrapper.update();
    store.dispatch(globalSynTick());
    store.dispatch(localSynTick());

    expect(getGlobal('tockCounter')).toBe(1);
    expect(getLocal('tockCounter')).toBe(1);

    store.dispatch(globalTick());
    store.dispatch(localTick());
    wrapper.setProps({ child: null });

    return delay(1)
    .then(() => {
      expect(getGlobal('tockCounter')).toBe(2);
      expect(getLocal('tockCounter')).toBe(0);
      wrapper.setProps({ child: <InjectorTest2 /> });
      store.dispatch(globalTick());
      store.dispatch(localTick());
      return delay(1);
    })
    .then(() => {
      expect(getGlobal('tockCounter')).toBe(3);
      expect(getLocal('tockCounter')).toBe(1);
      wrapper.unmount();

      return delay(1);
    })
    .then(() => {
      expect(getLocal('tockCounter')).toBe(0);
    });
  });

  it('Saga', () => {
    const wrapper = mount(<Root store={store} child={<InjectorTest2 />} />);
    const instance = wrapper.instance();
    wrapper.update();
    store.dispatch(globalPing());
    store.dispatch(localPing());

    expect(getGlobal('pongCounter')).toBe(1);
    expect(getLocal('pongCounter')).toBe(1);

    wrapper.setProps({ child: null });

    return delay(1)
    .then(() => {
      store.dispatch(globalPing());
      store.dispatch(localPing());
  
      expect(getGlobal('pongCounter')).toBe(2);
      expect(getLocal('pongCounter')).toBe(0);
  
      wrapper.setProps({ child: <InjectorTest2 /> });
      store.dispatch(globalPing());
      store.dispatch(localPing());
  
      expect(getGlobal('pongCounter')).toBe(3);
      expect(getLocal('pongCounter')).toBe(1);
  
      wrapper.unmount();
      return delay(1);
    })
    .then(() => {
      expect(getLocal('pongCounter')).toBe(0);
    });
  });
});
