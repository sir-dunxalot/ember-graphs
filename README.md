Ember Graphs
======

[![Build Status](https://travis-ci.org/sir-dunxalot/ember-graphs.svg?branch=master)](https://travis-ci.org/sir-dunxalot/ember-graphs)

Ember Graphs is a lightweight, cross-browser, responsive graphing library for Ember.js built with HTML5 and styled with CSS3.

- Work in progress
- Ember.js graphing library
- CSS styled, no SVG
- Semantic HTML
- Bar charts, line graphs, waterfall charts, pie charts

Installation
------

**Minified**

Precompiled source files can be found in the `src` directory. Simply copy the js and css files into the vendor directories of your app.

**Non-minified**

You can find the original scss files in `app/styles`.

If you would prefer to use the original js files, fork/download the repo and make the following edit to `config.js`: `optimize: false`. Then run `brunch build --production` and your expanded js can be found in `src/ember-graphs.min.js`.

**Async Loading**

You can load ember-graphs.min.js asynchronously by [stubbing the file and loading it with jQuery as seen here](https://gist.github.com/sir-dunxalot/9848013).

Usage
------

Ember Graphs is plug-and-play, requiring no config. The only caveat is that the data object passed to the graph component must be in the following format:

**Controller**
```javascript
  graphData: {
    name: 'seriesName',
    data: [
      // x can be a number or string
      {x: 1, y: 30},
      {x: 'Views', y: 12},
      {x: 82, y: 5},
    ]
  },
```

**Template**
```
{{ember-graph series=graphData}}
```

Options
------

Default options are set in `EmberGraphs.EmberGraphComponent`.

```javascript
EmberGraphs.EmberGraphComponent = Em.Component.extend(
  prefix: 'eg',
  fromZero: false,
  caption: null,
  type: 'bar',
  tickDistanceTarget: 50,
}
```

The options for each individual graph can be overwritten on the handlebars helper for the graph component. Options can also be binded to the component. For example:

**Template**
```
{{ember-graph series=graphData prefix='em' type=view.graphType}}
```

### Height and Width

Height and width can be set in your css on `figure.[prefix]-graph-[type]`. You can also set an element id to target height and width of a specific graph on the page.

For a responsive graph, set the width to a percentage. Alternatively, set the width to 100% and wrap the graph component in a wrapper element with a fluid width.

### type

Default: 'line'
Allowed values: 'bar', 'line', or 'waterfall'

`type` sets the type of graph or chart to display. Often, it is useful to bind this value to a view property to allow the user to choose how they want to visualize the data.

### fromZero

Default: false
Allowed values: true or false (boolean)

`fromZero` tells the graph component whether the lowest point on the graph should be zero or the minimum y value. When set to false, this renders a [truncated graph](http://en.wikipedia.org/wiki/Misleading_graph#Truncated_graph).


### caption

Default: null
Allowed values: any string

The graph is a `<figure>` element and, therefore, can include an [optional `<figcaption>` element](http://html5doctor.com/the-figure-figcaption-elements/) for acessability and semantic purposes. The `caption` option sets the text content of the `<figcaption>`, which is hidden visually but available to screenreaders.


### tickDistanceTarget

Default: 50
Allowed values: any number

`tickDistanceTarget` sets the rough number of pixels inbetween each tick line on the y-axis. The graph component will calculate the pixel height of every value on the y-axis and will draw lines between points that occur roughly every 'x' number of pixels from each other.


### prefix

Default: 'eg'
Allowed values: any string that constitutes a valid DOM element class

`prefix` sets the class prefix on each element of the graph. For example, `.eg-series` If you want to use a prefix other than 'eg' you'll also have to set the prefix in `app/styles/_variables.scss` and run 'brunch build --production' to compile your new css into the `src` directory.

Typically, you won't need to set this option unless there is a naming clash with another library.


### id

Default: none
Allowed values: any string that constitutes a valid DOM element id

`id` can be useful for setting the size of a particular graph on a page.


### class

Default: '[prefix]-graph-[type]'
Allowed values: any string that constitutes a valid DOM element class

Contributing
------

1. Fork the repo and create a feature branch off of the develop branch
2. Run task `brunch watch -s` to run the server and live preview your changes
2. Make your changes to the files in the app directory
3. Run `brunch build --production` to automatically compile your js, hbs, and scss to the src folder
4. Issue pull request against develop branch
