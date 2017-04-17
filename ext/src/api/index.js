import PouchDB from 'pouchdb-browser';

const threads = new PouchDB('threads', {
  adapter: 'idb'
});

export function saveThread(cb) {
  threads.put({
    _id: 'mydoc',
    title: 'Heroes'
  }, (err, res) => {
    if (err) return cb(err);
    cb(null, res);
  });
}