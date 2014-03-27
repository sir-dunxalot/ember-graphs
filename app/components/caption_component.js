EmberGraphs.EmberGraphCaptionComponent = Ember.Component.extend(
  EmberGraphs.Core, {

  classNameBindings: ['captionClass'],
  tagName: 'figcaption',
  layout: Em.Handlebars.compile('{{text}}'),

  captionClass: function() {
    return this._class('caption');
  }.property(),
});
