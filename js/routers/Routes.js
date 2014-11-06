define(['jquery', 'underscore', 'backbone', 'collections/terms', 'views/display'],
  function($, _, Backbone, TermCollection, DisplayView) {

    var TermRoutes = Backbone.Router.extend({

      routes: {
        'term/:id': 'setFilter'
      },
      setFilter: function( id ) {
        var routeModel = TermCollection.get({id: id});
        if( routeModel ) {
          $('#display-container').html( new DisplayView({model: routeModel}).render().el );
        } else {
          var url = window.location.href;
          window.location.href = url.substr(0, url.indexOf('#'));
        }
      }

    });

    return new TermRoutes();

});
