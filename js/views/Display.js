define(['jquery', 'underscore', 'backbone', 'text!templates/display-template.html'],
  function($, _, Backbone, dispTemp) {

    var DisplayView = Backbone.View.extend({

      template: _.template( dispTemp ),

      events: {
        'click #delete': 'deleteTerm',
        'click #save': 'saveTerm',
        'click #edit': 'editTerm',
        'click #cancel-edit': 'cancelEdit',
      },
      render: function() {
        this.$el.html( this.template( this.model.attributes ) );
        return this;
      },
      deleteTerm: function() {
        this.model.destroy();
        this.remove();
        this.$('#edit-blank-msg').css('visibility', 'hidden');
      },
      saveTerm: function() {
        var term = this.$('#edit-term').val(),
            acro = this.$('#edit-acronym').val(),
            desc = this.$('#edit-description').val();

        if( term && acro && desc ) {
          this.model.save({
            term: $.trim( term ),
            acronym: $.trim( acro ),
            description: $.trim( desc )
          });
          $('#edit').toggle();
          this.render();
        } else {
          this.$('#edit-blank-msg').css('visibility', 'visible');
        }
      },
      editTerm: function() {
        this.$('#edit-container, #term-container, #edit').toggle();
      },
      cancelEdit: function() {
        this.$('#edit-container').toggle();
        $('#edit-blank-msg').toggle();
      }

    });

      return DisplayView;

});
