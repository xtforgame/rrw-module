import { Subject, Observable, empty } from 'rxjs';
import {
  switchMap,
} from 'rxjs/operators';

export const emptyEpic = () => empty();

export default class Injectable {
  constructor(epic){
    this.epic = epic;
    this.subject = new Subject();
    this.injectableEpic = (action$, state$, ...args) =>
      this.subject.pipe(
        switchMap(epic => {
          // console.log('epic :', epic);
          return epic(action$, state$, ...args);
        })
      );
    this.injected = false;
  }

  inject(newEpic){
    this.epic = newEpic || this.epic;
    this.subject.next(this.epic);
    this.injected = true;
    return this.injectableEpic;
  }

  remove(){
    this.subject.next(emptyEpic);
    this.injected = false;
    return this.injectableEpic;
  }
}
