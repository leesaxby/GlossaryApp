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

require(['jquery', 'underscore', 'backbone', 'views/App'],
  function($, _, Backbone, AppView) {
    var appView = new AppView();

    $('#glossaryapp').html( appView.render().el );
});
