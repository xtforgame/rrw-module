import { Subject } from 'rxjs/Subject';

const subject = new Subject();
const mergedEpic = (action$, store) =>
  subject.mergeMap(epic => {
    // console.log('epic :', epic);
    return epic(action$, store);
  });

export default function appendRootEpic(...epics) {
  epics.forEach(epic => subject.next(epic));
  return mergedEpic;
}
