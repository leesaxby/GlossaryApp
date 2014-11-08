define(['jquery', 'underscore', 'backbone', 'collections/terms', 'views/display'],
  function($, _, Backbone, TermCollection, DisplayView) {

    var TermRoutes = Backbone.Router.extend({

      routes: {
        'term/:id': 'setFilter'
      },
      initialize: function( app ) {
        this.appView = app.appView;
      },
      setFilter: function( id ) {
        var routeModel = TermCollection.get({id: id});
        if( routeModel ) {
          this.appView.displayTerm(routeModel);
        } else {
          var url = window.location.href;
          window.location.href = url.substr(0, url.indexOf('#'));
        }
      }

    });

    return TermRoutes;

});
