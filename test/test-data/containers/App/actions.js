import {
  SYN_TICK,
  TICK,
  TOCK,
  PING,
  PONG,
} from './constants';

export const synTick = () => ({ type: SYN_TICK });
export const tick = () => ({ type: TICK });
export const tock = () => ({ type: TOCK });
export const ping = () => ({ type: PING });
export const pong = () => ({ type: PONG });
