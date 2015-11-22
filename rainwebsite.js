if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Router.route('/', function () {
    this.render('hello', {
      data: function () { }
    });
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });


  Router.map(function () {
    this.route('api', {
      path: '/api',
      where: 'server',
      action: function () {
        var json = {a: 4};
        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(json));
      }
    });
  });


}
