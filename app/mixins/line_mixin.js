EmberGraphs.Line = Em.Mixin.create({
  lineStyle: null,

  lineProperties: function() {
    var _this = this,
        isLineGraph = this.get('graphComponent.lineGraph'),
        yValues = this.get('graphComponent.yValues'),
        contentIndex = this.get('contentIndex'),
        min = this.get('graphComponent.min'),
        max = this.get('graphComponent.max');

    var value = this.get('content.y'),
        nextValue = yValues[contentIndex + 1],
        difference = value - nextValue;

    var lineHeight = Math.abs(difference) / (max - min) * 100,
        lineTopOffset = (max - value) / (max - min) * 100;

    // console.log($(this.get('graphComponent.element')).width());

    Em.run.schedule('afterRender', this, function() {
      var xWidthInPx = $(this.get('element')).width();
      var graphHeightInPx = $(this.get('graphComponent.element')).height();
      var differenceHeightInPx = lineHeight / 100 * graphHeightInPx;

      var rotation = Math.atan(xWidthInPx / differenceHeightInPx);
      var hypothenuseLength = xWidthInPx / Math.sin(rotation) / graphHeightInPx * 100;
      var transform;

      if (difference < 0) {
        transform = 'matrix(1, 0, 0, -1, 0, 0) rotate(-' + rotation + 'rad)';
      } else {
        transform = 'rotate(-' + rotation + 'rad)';
      }

      var heightRule = this._cssRule('height', hypothenuseLength + '%');
      var topRule = this._cssRule('top', lineTopOffset + '%');
      var transformRule = this._cssRule('transform', transform);

      _this.set('lineStyle', heightRule + topRule + transformRule);
    });

  }.on('didInsertElement').observes('graphComponent.lineGraph', 'graphComponent.width', 'graphComponent.height'), // TODO - this doesn't work

  lineClass: function() {
    return this._class('line');
  }.property(),
});
