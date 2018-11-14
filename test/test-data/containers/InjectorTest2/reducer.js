import {
  TICK,
  TOCK,
  PING,
  PONG,
} from './constants';

const initialState = {
  tickCounter: 0,
  tockCounter: 0,
  pingCounter: 0,
  pongCounter: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TICK:
      return {
        ...state,
        tickCounter: state.tickCounter + 1,
      };

    case TOCK:
      return {
        ...state,
        tockCounter: state.tockCounter + 1,
      };

    case PING:
      return {
        ...state,
        pingCounter: state.pingCounter + 1,
      };

    case PONG:
      return {
        ...state,
        pongCounter: state.pongCounter + 1,
      };

    default:
      return state;
  }
};
