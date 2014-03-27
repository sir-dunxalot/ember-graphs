EmberGraphs.DataPairYComponent = Em.Component.extend(
  EmberGraphs.Core, {

  attributeBindings: ['style'],
  classNameBindings: ['yClass', 'waterfallClass'],
  tagName: 'dd',
  layout: Ember.Handlebars.compile('{{point}}'),

  yClass: function() {
    return this._class('y');
  }.property(),

  waterfallClass: function() {
    var waterfall = this.get('graphComponent.waterfallGraph');
    var point = this.get('point');

    if (waterfall && point && point.toString().indexOf('%') !== -1) {
      return parseFloat(point) > 0 ? this._class('positive') : this._class('negative');
    }

    return false;
  }.property('point', 'graphComponent.waterfallGraph'),

  style: function() {
    var width = this.get('width');
    var height = this.get('height');
    var heightRule = this._cssRule('height', height);
    var widthRule = this._cssRule('width', width);

    var i = this.get('contentIndex');
    var left = i * parseFloat(width);

    var leftRule = this._cssRule('left', left + '%');

    return heightRule + widthRule + leftRule;
  }.property('height', 'width', 'contentIndex'),
});
