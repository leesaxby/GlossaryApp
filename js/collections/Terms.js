define(['backbone', 'models/term'], function(Backbone, Term) {

  var Terms = Backbone.Collection.extend({
    model: Term,
    url: "api/terms"
  });

  return new Terms();

});
