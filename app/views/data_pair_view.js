// X value
EmberGraphs.DataPairView = Em.View.extend(
  EmberGraphs.Core,
  EmberGraphs.Line, {

  attributeBindings: ['style'],
  classNameBindings: ['xClass'],
  tagName: 'dt',
  layout: Em.Handlebars.compile('{{yield}}{{data-pair-y point=view.content.y height=view.height width=view.width contentIndex=view.contentIndex}}'),
  template: Em.Handlebars.compile("<span {{bind-attr class='view.xTickClass'}}>{{view.content.x}}</span>{{#if lineGraph}}<div {{bind-attr class='view.lineClass' style='view.lineStyle'}}></div>{{/if}}"),

  xClass: function() {
    return this._class('x');
  }.property(),

  xTickClass: function() {
    return this._class('x-tick');
  }.property(),

  height: function() {
    var min = this.get('graphComponent.min');
    var max = this.get('graphComponent.max');
    var yValues = this.get('graphComponent.yValues');
    var waterfall = this.get('graphComponent.waterfallGraph');
    var i = this.get('contentIndex') + 1;
    var yValue;

    // If waterfall and even number in index that starts at 0 (i.e. It's a change element)...
    if (waterfall && (i % 2 === 0)) {
      var pos = i / 2;
      yValue = yValues[pos];
    } else {
      yValue = this.get('content.y');
    }

    var relativeHeight = (yValue - min) / (max - min) * 100;


    return Math.round(relativeHeight * 100) / 100 + '%';
  }.property('series.data'),

  width: function() {
    var min = this.get('graphComponent.min');
    var max = this.get('graphComponent.max');
    var type = this.get('graphComponent.type');
    var data = this.get('graphComponent.parsedData');

    var tickOffset = (type === 'line') ? -1 : 0;
    var relativeWidth = (100 / (data.length + tickOffset));

    return Math.floor(relativeWidth * 100) / 100 + '%';
  }.property('graphComponent.parsedData'),

  style: function() {
    var height = this.get('height');
    var width = this.get('width');
    var heightRule = this._cssRule('height', height);
    var widthRule = this._cssRule('width', width);

    return heightRule + widthRule;
  }.property('height', 'width'),

});
