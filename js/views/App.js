define(['underscore', 'backbone', 'collections/terms','views/term', 'routers/routes'],
  function(_, Backbone, TermCollection, TermView, TermRoutes) {

    var AppView = Backbone.View.extend({

      el: '#glossaryapp',

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
        TermCollection.each(function( term ) {
          this.renderTerm( term );
        }, this)
      },
      renderTerm: function( term ) {
        var term = new TermView({model: term});
        this.$('#list').append( term.render().el );
      },
      newTermOpen: function() {
        this.$('#new-container, #new-term, #list-container, #display-container').toggle()
      },
      addTerm: function() {
        var complete = $('#term').val() && $('#acronym').val() && $('#description').val();
        if( complete ) {
          TermCollection.create({
            term: $.trim( $('#term').val() ),
            acronym: $.trim( $('#acronym').val() ),
            description: $.trim( $('#description').val() )
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

    });

    return AppView;

})
