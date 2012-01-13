var assert = require('assert')
  , db = require('../db')({namespace:'bookmarks-test-db'})
  , the_bookmark = {}
 
require('vows')
.describe('bookmarks-db')
.addBatch({
  "Initialize": {
    topic: function () {
      db.deleteAll(this.callback);
    },
    "deleteAll": function (err, placeholder /* required for Vows to detect I want the error to be passed */) {
      assert.isNull(err);
    }
  }
}).addBatch({
  "Creation": {
    topic: function () {
      db.save({ "title": "Google", "url":   "http://www.google.com", "tags":  [ "google", "search" ] }, this.callback);
    },
    "save (new)": function (err, bookmark, created) {
      assert.isNull(err);
      assert.isTrue(created);
      assert.include(bookmark, 'id');
      assert.equal(bookmark.title, 'Google');
      assert.equal(bookmark.url, 'http://www.google.com');
      assert.deepEqual(bookmark.tags, ['google', 'search']);
      the_bookmark = bookmark;
    }
  }
}).addBatch({
  "Fetch": {
    topic: function () {
      db.fetchOne(the_bookmark.id, this.callback)
    },
    "check existing": function (err, bookmark) {
      assert.isNull(err);
      assert.isObject(bookmark);
      assert.deepEqual(bookmark, the_bookmark);
    }
  }
}).addBatch({
  "Update": {
    topic: function () {
      the_bookmark.title = 'Google.com';
      db.save(the_bookmark, this.callback);
    },
    "save (update)": function (err, bookmark, created) {
      assert.isNull(err);
      assert.isFalse(created);
      assert.equal(bookmark.title, the_bookmark.title);
      assert.equal(bookmark.url, the_bookmark.url);
      assert.deepEqual(bookmark.tags, the_bookmark.tags);
    }
  }
}).addBatch({
  "Delete": {
    topic: function () {
      db.deleteOne(the_bookmark.id, this.callback);
    },
    "Deleted": function (err, deleted) {
      assert.isNull(err);
      assert.isTrue(deleted);
    }
  }
}).addBatch({
  "Finalize": {
    topic: function(){return db},
    "Clean": function (db) {
      db.deleteAll(function(){});
    },
    "Close connection": function (db) {
      db.close();
    }
  }
}).export(module)

