define(['backbone'], function(Backbone) {

  var Term = Backbone.Model.extend({
    defaults: {
      term: "",
      acronym: "",
      description: ""
    }

  });

  return Term;

});
