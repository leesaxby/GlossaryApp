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
        this.$el.html( this.template( this.model.attributes ) )
        return this;
      },
      deleteTerm: function() {
        this.model.destroy();
        this.remove();
        $('#list-container').toggle();
        this.$('#edit-blank-msg').css('visibility', 'hidden');
        $('#list').find('span').css('color','#afafaf');
      },
      saveTerm: function() {
        var complete = this.$('#edit-term').val() && this.$('#edit-acronym').val() && this.$('#edit-description').val();
        if( complete ) {
          this.model.save({
            term: $.trim( this.$('#edit-term').val() ),
            acronym: $.trim( this.$('#edit-acronym').val() ),
            description: $.trim( this.$('#edit-description').val() )
          });
          $('#edit, #list-container').toggle();
          this.render();
        } else {
          this.$('#edit-blank-msg').css('visibility', 'visible');
        }
      },
      editTerm: function() {
        this.$('#edit-container, #term-container, #edit').toggle();
        $('#list-container').toggle();
      },
      cancelEdit: function() {
        this.$('#edit-container').toggle();
        $('#list-container, #edit-blank-msg').toggle();
        $('#list').find('span').css('color','#afafaf');
      }

    })

      return DisplayView;

})
