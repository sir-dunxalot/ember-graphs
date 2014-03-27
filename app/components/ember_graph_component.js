EmberGraphs.EmberGraphComponent = Em.Component.extend(
  EmberGraphs.Core,
  EmberGraphs.Init, {

  // Options
  prefix: 'eg',
  fromZero: false,
  caption: null,
  type: 'bar',
  tickDistanceTarget: 50,

  tagName: 'figure',
  classNameBindings: ['graphClass'],
  layout: Em.Handlebars.compile('{{view EmberGraphs.SeriesView content=view.parsedData}}{{#if caption}}{{ember-graph-caption text=caption}}{{/if}}'),

  height: null,
  width: null,

  graphClass: function() {
    var type = this.get('type');
    return this._class('graph-' + type);
  }.property(),

  lineGraph: function() {
    return this.get('type') === 'line';
  }.property('type'),

  waterfallGraph: function() {
    return this.get('type') === 'waterfall';
  }.property('type'),

  // TODO - Run outside of resize too
  heightObserver: function() {
    var _this = this;
    var height = $(_this.get('element')).height();
    _this.set('height', height);

    $(_this.get('element')).resize(function() {
      height = $(_this.get('element')).height();
      _this.set('height', height);
    });
  }.on('didInsertElement'),

  widthObserver: function() {
    var _this = this;
    var width = $(_this.get('element')).width();
    _this.set('width', width);

    $(_this.get('element')).resize(function() {
      width = $(_this.get('element')).width();
      _this.set('width', width);
    });
  }.on('didInsertElement'),
});
