require.config({
  paths: {
    'backbone': 'lib/backbone',
    'underscore': 'lib/underscore',
    'jquery': 'lib/jquery',
    'text': 'lib/text'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    }
  }
});

require(['jquery', 'underscore', 'backbone', 'views/App', 'routers/routes'],
  function($, _, Backbone, appView, TermRoutes) {

    $('#glossaryapp').html( appView.render().el );

});
