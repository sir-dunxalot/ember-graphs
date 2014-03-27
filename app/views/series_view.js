EmberGraphs.SeriesView = Em.CollectionView.extend(
  EmberGraphs.Core, {

  attributeBindings: ['style'],
  classNameBindings: ['seriesClass'],
  tagName: 'dl',
  itemViewClass: EmberGraphs.DataPairView,

  seriesClass: function() {
    return this._class('series');
  }.property(),

  style: function() {
    var target = this.get('graphComponent.tickDistanceTarget');
    var graphHeight = this.get('graphComponent.height');

    var ticks = Math.floor(graphHeight / target);
    var tickHeight = graphHeight / ticks;
    var backgroundSize = '1px ' + tickHeight + 'px';
    var backgroundSizeRule = this._cssRule('background-size', backgroundSize);

    return backgroundSizeRule;
  }.property('graphComponent.tickDistanceTarget', 'graphComponent.min', 'graphComponent.max', 'graphComponent.height'),

});
