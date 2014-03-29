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
            'ember-graphs.js': /^(app\/initializers\/namespace|app\/mixins|app\/components|app\/helpers|app\/views\/data_pair_view|app\/views\/series_view)/
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
            'ember-graphs.css': /^app/
          },
        },
        templates: {
          joinTo: {
            // Overwrite development templates with empty declaration so none are compiled
          }
        }
      },
      conventions: {
        // ignored: /^huh/
        // ignored: function(path) {
          // var index = 'app/assets/index.js';
        //   return index === path;
        // },
        ignored: function(path) {
          var sep, startsWith;
          var sysPath = require('path');
          var indexPath = 'app/assets/index.html';

          startsWith = function(string, substring) {
            return string.indexOf(substring, 0) === 0;
          };

          sep = sysPath.sep;

          // Ignore index.html
          if (path === indexPath) {
            return true;
          }

          // Regular Brunch ignoring
          if (path.indexOf("app" + sep + "templates" + sep) === 0) {
            return false;
          } else {
            return startsWith(sysPath.basename(path), '_');
          }
        }
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
