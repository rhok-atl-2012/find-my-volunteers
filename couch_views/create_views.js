(function() {
  var create_views,
    __slice = Array.prototype.slice;

  create_views = function() {
    var db, view, views, views_doc, _i, _len;
    db = arguments[0], views = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    views_doc = {
      language: 'javascript',
      views: {}
    };
    for (_i = 0, _len = views.length; _i < _len; _i++) {
      view = views[_i];
      views_doc.views[view.name] = {
        map: view.map.toString()
      };
    }
    return db.save('_design/views', views_doc);
  };

  module.exports = function(connect) {
    return create_views(connect(), require('./person_by_phone'));
  };

}).call(this);