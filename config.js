exports.config = {
  paths: {
    public: 'src',
    watched: ['app', 'envs', 'vendor', 'test']
  },
  files: {
    javascripts: {
      joinTo: {
        'javascripts/app.js': /^(app|envs\/development)/,
        'javascripts/vendor.js': /^(vendor\/scripts\/(common|development)|vendor\\scripts\\(common|development))/
      },
      order: {
        before: [
          'vendor/scripts/common/console-polyfill.js',
          'vendor/scripts/common/jquery.js',
          'vendor/scripts/common/handlebars.js',
          'vendor/scripts/development/ember.js',
          'vendor/scripts/development/ember-data.js'
        ]
      }
    },
    stylesheets: {
      joinTo: {
        'stylesheets/app.css': /^(app|vendor)/
      },
      order: {
        before: ['vendor/styles/normalize.css']
      }
    },
    templates: {
      precompile: true,
      root: 'templates',
      joinTo: {
        'javascripts/app.js': /^app/
      }
    }
  },
  overrides: {
    // Production Settings
    production: {
      files: {
        javascripts: {
          joinTo: {
            // List plugin directories and files here
            'ember-graphs.min.js': /^(app\/initializers\/namespace|app\/mixins|app\/components|app\/helpers|app\/views)/
          },
          order: {
            before: [
              'app/initializers/namespace.js',
            ],
            after: [
              'app/views/data_pair_view.js',
              'app/views/series_view.js'
            ]
          },
        },
        stylesheets: {
          joinTo: {
            'ember-graphs.min.css': /^app/
          },
        },
        templates: {
          joinTo: {
            // Overwrite development templates with empty declaration so none are compiled
          }
        }
      },
      conventions: {
        ignored: function(path) {
          var sep, startsWith;
          var sysPath = require('path');
          var ignores = [
            'app/assets/index.html',
            'app/views/index_view.js'
          ];

          startsWith = function(string, substring) {
            return string.indexOf(substring, 0) === 0;
          };

          for ( var i = 0; i < ignores.length; i++ ) {
            if (ignores[i] === path) {
              return true;
            }
          }

          // ignores.forEach(function(ignore) {
          //   if (path === ignore) {
          //     return true;
          //   }
          // });

          sep = sysPath.sep;

          // Regular Brunch ignoring
          if (path.indexOf("app" + sep + "templates" + sep) === 0) {
            return false;
          } else {
            return startsWith(sysPath.basename(path), '_');
          }
        }
        // ignored: function(path) {
        //   var sep, startsWith;
        //   var sysPath = require('path');
        //   var indexPath = 'app/views/index_view.js';

        //   startsWith = function(string, substring) {
        //     return string.indexOf(substring, 0) === 0;
        //   };

        //   sep = sysPath.sep;

        //   // Ignore index.html
        //   if (path === indexPath) {
        //     return true;
        //   }

        //   // Regular Brunch ignoring
        //   if (path.indexOf("app" + sep + "templates" + sep) === 0) {
        //     return false;
        //   } else {
        //     return startsWith(sysPath.basename(path), '_');
        //   }
        // }
      },
      modules: {
        wrapper: false,
        definition: false
      },
      // conventions: {
      //   ignored: function(path) {
      //     var sep, startsWith;
      //     var sysPath = require('path');

      //     startsWith = function(string, substring) {
      //       return string.indexOf(substring, 0) === 0;
      //     };

      //     sep = sysPath.sep;

      //     if (startsWith(sysPath.basename(path), '-')) {
      //       return true;
      //     }

      //     if (path.indexOf("app" + sep + "templates" + sep) === 0) {
      //       return false;
      //     } else {
      //       return startsWith(sysPath.basename(path), '_');
      //     }
      //   }
      // },
      optimize: true,
      sourceMaps: false,
      plugins: {
        autoReload: {
          enabled: false
        }
      }
    }
  }
};
