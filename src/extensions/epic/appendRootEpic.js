import { Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

const subject = new Subject();
const mergedEpic = (action$, store) =>
  subject.pipe(
    mergeMap(epic => {
      // console.log('epic :', epic);
      return epic(action$, store);
    })
  );

export default function appendRootEpic(...epics) {
  epics.forEach(epic => subject.next(epic));
  return mergedEpic;
}
