EmberGraphs.Core = Em.Mixin.create({

  graphComponent: function() {
    var thing = this.nearestOfType(EmberGraphs.EmberGraphComponent);
    return this.nearestOfType(EmberGraphs.EmberGraphComponent);
  }.property(),

  _class: function(modifier) {
    var prefix = this.get('graphComponent.prefix') || this.get('prefix');
    return prefix + '-' + modifier;
  },

  _twoDp: function(num) {
    return Math.round(num * 100) / 100;
  },

  _cssRule: function(prop, value) {
    // USAGE - http://modernizr.com/docs/#prefixed
    var prefixed = Modernizr.prefixed(prop);
    prop = prefixed ? prefixed.replace(/([A-Z])/g, function(prefixed,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-') : prop;

    return prop + ':' + value + ';';
  },

});
