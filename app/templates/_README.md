# <%= appName %> (<%= appVersion %>)

<%= appDescription %>

```
cd ...../<<%= appName %>>
npm install
bower install
```

The we are going to use Grunt to generate the application, the documentation and to test it. The following commands are availeable in Grunt for this application:

1. `grunt` to build the final release of he current application. It can be deleted and rebuilt each time because there are no source files inside the production folder.
2. `grunt test` to make the unit tests and the end to end tests. The unit test are made with Karma using Jasmine, and the end to end tests are made with Protractor.
3. `grunt document` to generate the documentation of the application. There are two document packages. One descriptive with some critic process inside the application, and one technical with all the classes, methods and properties of the application.