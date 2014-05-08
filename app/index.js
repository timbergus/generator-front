'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var FrontGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Front generator.'));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'How do you want to call your application?',
      default: 'My Cool App'
    },
    {
      type: 'input',
      name: 'appDescription',
      message: 'What does your application do?',
      default: 'Cool things!'
    },
    {
      type: 'input',
      name: 'appVersion',
      message: 'Which is you application version?',
      default: '0.1.0'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appDescription = props.appDescription;
      this.appVersion = props.appVersion;
      done();
    }.bind(this));
  },

  app: function () {

    this.mkdir('js');           // JavaScript files.
    this.mkdir('scss');         // Style sheets in Sass.
    this.mkdir('spec');         // Test files.
    this.mkdir('images');       // Images.
    this.mkdir('partials');     // Partials views for the application.
    this.mkdir('translations'); // Files with the strings translated.

    this.copy('README.md', 'README.md');

    this.template('_index.html', 'index.html');
    this.template('_content.html', 'partials/content.html');

    this.copy('image_a.jpg', 'images/image_a.jpg');
    this.copy('image_b.jpg', 'images/image_b.jpg');
    this.copy('image_c.jpg', 'images/image_c.jpg');

    this.template('_application.js', 'js/application.js');
    this.template('_contentController.js', 'js/contentController.js');
    this.template('_contentController.spec.js', 'spec/contentController.spec.js');
    this.template('_e2e.spec.js', 'spec/e2e.spec.js');

    this.copy('karma.config.js', 'karma.config.js');
    this.copy('protractor.config.js', 'protractor.config.js');

    this.template('_gruntfile.js', 'gruntfile.js');
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
  }
});

module.exports = FrontGenerator;