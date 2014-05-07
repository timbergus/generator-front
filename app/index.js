'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var BlogGenerator = yeoman.generators.Base.extend({
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
    this.log(chalk.magenta('You\'re using the fantastic Blog generator.'));

    var prompts = [{
      name: 'blogName',
      message: 'What do you want to call your blog?'
    }];

    this.prompt(prompts, function (props) {
      this.blogName = props.blogName;

      done();
    }.bind(this));
  },

  app: function () {
    this.template('index.html', 'index.html');
    this.template('gruntfile.js', 'gruntfile.js');
    this.template('_package.json', 'package.json');
  }
});

module.exports = BlogGenerator;