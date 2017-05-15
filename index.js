const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const cors = require('cors');
const Picture = require('./models/pics.js');
const Comment = require('./models/comment.js');
const Album = require('./models/albums.js');
const User = require('./models/users.js');
const jwt = require('jwt-simple');
const path = require('path');
const request = require('request');
const moment = require('moment');
var http = require('http').Server(app);
var mongoose = require('mongoose');
var CONSTANTS = require('constants');


mongoose.connect('mongodb://stephen:password@ds137291.mlab.com:37291/finalproject123');

app.use(express.static('app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app/index.html');
})


var io = require('socket.io')(http);


http.listen(port, function() {
    console.log(`Listening on port ${port}`);
});



io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('chat message', (msg) => {

        if (!msg || msg == "") return socket.emit('got error', { error: "Please Enter a message" });

        io.emit('new message', { msg: `${msg}` });

    });

});

// Amazon S3 Code -----------------------------------------------------------//

var fs = require('fs');
var S3FS = require('s3fs');
var s3fsImpl = new S3FS('testimages1234', { //This tells us to use the bucket of Data
    accessKeyId: CONSTANTS.S3ACCESS,
    secretAccessKey: CONSTANTS.S3SECRET,
});

s3fsImpl.create(); //This creates the bucket of Data in AS3  

var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();


app.use(multipartyMiddleware);


app.post('/vidupload', function(req, res) {
  console.log(req.body);
    var file = req.files.file;
    var stream = fs.createReadStream(file.path);
    let newName = Date.now();
    let extension = file.originalFilename.split('.').pop();
    let newFileName = `${newName}.${extension}`;
    return s3fsImpl.writeFile(newFileName, stream).then(function() {
      // Image is done uploading...
        fs.unlink(file.path, function(err) {
            if (err) console.log(err);

            let pic = {  //This defines what 'pic' is so we can add them to the DB - this info matches our Schema
                  title: req.body.info.title,
                  image: 'https://s3.amazonaws.com/testimages1234/${newFileName}',
                  description: req.body.info.description,
                  //user: req.body.user,
             }
                var newuser = new Picture(pic);
                 newuser.save(err=> { //'.save' is part of Mongoose saying save this up to the database or you can use '.create'
                  if (err) console.log(err); //we pass our function through
                   res.json({ image: `https://s3.amazonaws.com/testimages1234/${newFileName}` });
              })



        
            })
        })
    });


// Posting to MongoDB -----------------------------------------------------------//

app.post('/pictures', function(req, res){ 

  console.log(req.body);
  
   
  
});


// Facebook Authentication

function createJWT(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, 'stephensapp');
}

app.post('/auth/facebook', function(req, res) {
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: 'ffd98d31ff3829213da59aecbc7744e8',
        redirect_uri: req.body.redirectUri
    };


    // Step 1. Exchange authorization code for access token.
    request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
        if (response.statusCode !== 200) {
            console.log(accessToken.error.message)
            return res.status(500).send({ message: accessToken.error.message });
        }

        // Step 2. Retrieve profile information about the current user.
        request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
            if (response.statusCode !== 200) {
                return res.status(500).send({ message: profile.error.message });
            }
            if (req.header('Authorization')) {
                User.findOne({ facebook: profile.id }, function(err, existingUser) {
                    if (existingUser) {
                        var token = createJWT(existingUser);
                        console.log(token);
                        return res.send({ token: token });
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, 'stephensapp');
                    User.findById(payload.sub, function(err, user) {
                        if (!user) {
                            return res.status(400).send({ message: 'User not found' });
                        }
                        user.facebook = profile.id;
                        user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
                        user.displayName = user.displayName || profile.name;
                        user.save(function() {
                            var token = createJWT(user);
                            res.send({ token: token });
                        });
                    });
                });
            } else {
                // Step 3. Create a new user account or return an existing one.
                User.findOne({ facebook: profile.id }, function(err, existingUser) {
                    if (existingUser) {
                        var token = createJWT(existingUser);
                        return res.send({ token: token });
                    }
                    var user = new User();
                    user.facebook = profile.id;
                    user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                    user.displayName = profile.name;
                    user.save(function() {
                        var token = createJWT(user);
                        res.send({ token: token });
                    });
                });
            }
        });
    });
});



























// Get all of blogs


// app.get('/blog', function(req, res) {
//     Blog.find().populate('author').exec(function(err, Blogs) { //this finds and returns all of the blogs in the DB
//         if (err) return console.error(err);
//         res.json(Blogs)
//     })
// });


// // creating data in the database. hardcoding data
// app.get('/createAuthor', function(req, res) {
//     var anything = new Author({
//         firstName: 'stephen',
//         lastName: 'mitchell',
//     });

//     anything.save(function(err) { //'.save' is part of Mongoose saying, save this to the database
//         if (err) console.log(err);
//         res.json({ success: "Yay!" }); //this communicates with the front end to execute what is being requested
//     })
// });


// // Get a single blog
// app.get('/blog/:id', function(req, res) {
//     let id = req.params.id //this sets the paramaters for searching for a specific entry by id

//     Blog.findOne({_id:id}).populate('author').exec(function(err, Blogs) { //this finds and returns all of the blogs with that ID in the DB
//         if (err) return console.error(err);
//         res.json(Blogs)
//     })
// });


// // Post a new blog
// app.post('/blog', function(req, res) {

//     let user = { //This defines what 'user' is so we can add them to the DB - this info matches our Schema
//         title: req.body.title,
//         content: req.body.content,
//         author: '5900c408592c5a0566013611',
//     }
//     var newBlog = new Blog(user);
//     newBlog.save(err => { //'.save' is part of Mongoose saying save this up to the database or you can use '.create'
//         if (err) console.log(err); //we pass our function through
//         res.json({ success: "Yay!" }); //this is just saying that if the id is the id you're looking for return the id
//     })

// });


// Delete a blog
// app.delete('/blog/:id', function(req, res) {
//     User.remove({ _id: req.params.id }, function(err) { //'req.params.id' searches for the _id we are looking for - remove executes the action of removing 
//         if (err) console.log('Error');
//         res.json({ success: "Yay!" }); //this ties us to the front end promise
//     });
// });
