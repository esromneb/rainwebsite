Log = new Mongo.Collection("log");
Rain = new Mongo.Collection("rain");

if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);

    Template.hello.helpers({
        counter: function () {
            return Session.get('counter');
        },
        rainstatus: function () {
            var txt;
            if( Rain.find().count() )
            {
		return true;
                txt = "It's currently raining<br><h1 class='red'>All sprinklers off</h1>";
            }
            else
            {
		return false;
                txt = "It's currently dry<br><h1 class='green'>All sprinklers operating</h1>";
            }
            return txt;
        }
    });

    Template.hello.events({
        'click #yes': function () {
            Rain.insert({});
        },
        'click #no': function () {
            while(Rain.find().count())
            {
                Rain.remove(Rain.findOne()._id);
            }
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
            action: function (a) {
                Log.insert({query:a.query, time:new Date()});

                foxid = a.query.id;
                var obj = {};
                if( Rain.find().count() )
                {
                    obj[foxid] = {
                        downlinkData: "FFFFFFFFFFFFFFFF"
                    };
                } else {
                    obj[foxid] = {
                        downlinkData: "0000000000000000"
                    };
                }


                //console.log(a.query);
                //var json = {a: 4};
                this.response.setHeader('Content-Type', 'application/json');
                this.response.end(JSON.stringify(obj));
            }
        });
    });


}
