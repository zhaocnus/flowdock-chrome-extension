import PouchDB from 'pouchdb-browser';
import isFunction from 'lodash/isFunction';

const threads = new PouchDB('threads', {
  adapter: 'idb'
});

export function saveThread(thread, cb) {
  threads.put(thread, (err) => {
    if (!isFunction(cb)) return;

    if (err) return cb(err);
    cb();
  });
}
