import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

export const emptyEpic = () => Observable.empty();

export default class Injectable {
  constructor(epic){
    this.epic = epic;
    this.subject = new Subject();
    this.injectableEpic = (action$, store) =>
      this.subject.switchMap(epic => {
        // console.log('epic :', epic);
        return epic(action$, store);
      });
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
