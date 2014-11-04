define(['underscore', 'backbone', 'views/displayview', 'routers/routes','text!templates/term-template.html'],
  function(_, Backbone, DisplayView, TermRoutes,termTemp) {

    var TermView = Backbone.View.extend({
      tagName: 'li',
      template: _.template( termTemp ),

      events: {
        'click span': 'displayTerm'
      },
      initialize: function() {
        this.listenTo(this.model, 'destroy', this.remove)
        this.listenTo(this.model, 'change', this.render)
      },
      render: function() {
        this.$el.html( this.template( this.model.attributes ) );
        return this;
      },
      displayTerm: function() {
        var displayView = new DisplayView({model: this.model});
        $('#display-container').html( displayView.render().el );

        TermRoutes.navigate('term/' + this.model.attributes.id);

        $('#list').find('span').css('color','#afafaf');
        this.$('span').css('color', '#4d4d4d');
      }
    })

    return TermView

})

