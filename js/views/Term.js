define(['underscore', 'backbone', 'routers/routes','text!templates/term-template.html'],
  function(_, Backbone, TermRoutes, termTemp) {

    var TermView = Backbone.View.extend({
      tagName: 'li',
      template: _.template( termTemp ),

      events: {
        'click span': 'setDisplayTerm'
      },
      initialize: function( opt ) {
        this.parentView = opt.parentView;
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'change', this.render);
      },
      render: function() {
        this.$el.html( this.template( this.model.attributes ) );
        return this;
      },
      setDisplayTerm: function() {
        this.parentView.displayTerm(this.model);
      }
    });

    return TermView;

});

