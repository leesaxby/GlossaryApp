define(['underscore', 'backbone', 'text!templates/app-template.html','collections/terms','views/term', 'views/display', 'routers/routes'],
  function(_, Backbone, appTemp,TermCollection, TermView, DisplayView, TermRoutes) {

    var AppView = Backbone.View.extend({

      template: _.template( appTemp ),

      events: {
        'click #new-term': 'newTermOpen',
        'click #add': 'addTerm',
        'click #cancel-add': 'cancelAdd'
      },
      initialize: function() {
        TermCollection.fetch({
          reset: true,
          success: function() {
            Backbone.history.start();
          }
        });
        this.listenTo(TermCollection, 'add', this.renderTerm);
        this.listenTo(TermCollection, 'reset', this.render);
      },
      render: function() {
        this.$el.html( this.template() );

        TermCollection.each(function( term ) {
          this.renderTerm( term );
        }, this);

        return this;
      },
      renderTerm: function( term ) {
        term = new TermView({model: term, parentView: this});
        this.$('#list').append( term.render().el );
      },
      newTermOpen: function() {
        this.$('#new-container, #new-term, #list-container, #display-container').toggle();
      },
      addTerm: function() {
        var term = this.$('#term').val(),
            acro = this.$('#acronym').val(),
            desc = this.$('#description').val();

        if( term && acro && desc ) {
          TermCollection.create({
            term: $.trim( term ),
            acronym: $.trim( acro ),
            description: $.trim( desc )
          });
          this.$('#acronym, #term, #description').val('');
          this.$('#new-container, #new-term, #list-container, #display-container').toggle();
        } else {
          this.$('#new-blank-msg').css('visibility', 'visible');
        }
      },
      cancelAdd: function() {
        this.$('#acronym, #term, #description').val('');
        this.$('#new-container, #new-term, #list-container, #display-container').toggle();
        this.$('#new-blank-msg').css('visibility', 'hidden');
      },
      displayTerm: function( model ) {
        if(this.displayView) {
          this.displayView.remove();
          this.displayView = null;
        }
        this.displayView = new DisplayView({model: model});
        $('#display-container').html( this.displayView.render().el );
        TermRoutes.navigate('term/' + model.attributes.id);
      }

    });

    return AppView;

});
