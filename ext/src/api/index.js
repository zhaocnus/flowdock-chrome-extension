import PouchDB from 'pouchdb-browser';

const threads = new PouchDB('threads', {
  adapter: 'idb'
});

export function saveThread(thread, cb) {
  console.log(thread);

  threads.put(thread, (err) => {
    if (err) return cb(err);
    cb();
  });
}