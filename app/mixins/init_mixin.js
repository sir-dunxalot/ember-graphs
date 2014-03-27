EmberGraphs.Init = Em.Mixin.create({

  parsedData: function() {
    var data = this.get('series.data');
    var type = this.get('type');
    var method = this.get('dataParsingMethods')[type];

    if (method) {
      return method(this, data);
    } else {
      return data;
    }

  }.property('series.data', 'type'),

  xValues: function() {
    var data = this.get('series.data');
    var values = [];

    data.forEach(function(pair) {
      values.push(pair.x);
    });

    return values;
  }.property('series.data').readOnly(),

  yValues: function() {
    var data = this.get('series.data');
    var values = [];

    data.forEach(function(pair) {
      values.push(pair.y);
    });

    return values;
  }.property('series.data').readOnly(),

  min: function() {
    var data = this.get('series.data');
    var values = this.get('yValues');
    var fromZero = this.get('fromZero');

    var min = fromZero ? 0 : Math.min.apply(Math, values);

    return min;
  }.property('series.data').readOnly(),

  max: function() {
    var data = this.get('series.data');
    var values = this.get('yValues');

   var max = Math.max.apply(Math, values);

    return max;
  }.property('series.data').readOnly(),

  dataParsingMethods: {
    // Add changes inbetween each point to array of objects
    waterfall: function(view, data) {
      var parsedData = [];
      var values = [];
      var xValues = view.get('xValues');
      var yValues = view.get('yValues');

      yValues.forEach(function(value, i, arr) {
        var next = i + 1;

        var x = xValues[i];
        var nextX = xValues[next];
        var changeText = x + ' to ' + nextX; // e.g. Impressions to clicks

        var nextY = arr[next];
        var change = (nextY - value) / value * 100;

        if (!isNaN(change)) {
          change = Math.round(change) + '%'; // e.g. -60%
          values.push({x: changeText, y: change});
        }
      });

      // Zip arrays
      for (var i = 0; i < data.length; i++) {
        parsedData.push(data[i]);
        parsedData.push(values[i]);
      }

      return parsedData;
    },
  },

});
