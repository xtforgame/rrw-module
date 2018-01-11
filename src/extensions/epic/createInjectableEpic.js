import { combineEpics } from 'redux-observable';
import makeEpicInjectable from './makeEpicInjectable';

let rootInjectable = null;

export default function createInjectableEpic(staticEpic, moduleInjectables = []) {
  if(!rootInjectable){
    rootInjectable = makeEpicInjectable(staticEpic);
  }
  rootInjectable.inject(combineEpics(staticEpic, ...moduleInjectables));
  return rootInjectable;
}
