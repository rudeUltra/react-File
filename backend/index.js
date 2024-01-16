import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import MongoStore from 'connect-mongo';
import bodyParser from 'body-parser'; // Add this line
import cors from 'cors'; // Add this line

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('user', UserSchema);

const mongoString = '';
mongoose.connect(mongoString);
const db = mongoose.connection;

const app = express();
// app.use(cors());

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig))



app.use(bodyParser.json()); // Add this line
app.use(bodyParser.urlencoded({ extended: true })); // Add this line

app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongoUrl: db.client.s.url })
}));

const strategy = new LocalStrategy(User.authenticate());
passport.use(strategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  console.log(req.body);
});

app.post('/register', function (req, res) {
  console.log(req.body);
  User.register(
    new User({
      email: req.body.email,
      username: req.body.username
    }), req.body.password, function (err, msg) {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successful" });
      }
    }
  );
});

app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login-failure',
  successRedirect: '/login-success'
}), (err, req, res, next) => {
  if (err) next(err);
});

app.get('/login-failure', (req, res, next) => {
  console.log(req.session);
  res.send('Login Attempt Failed.');
});

app.get('/login-success', (req, res, next) => {
  console.log(req.session);
  res.send('Login Attempt was successful.');
});

app.get('/profile', function (req, res) {
  
  
  if (req.isAuthenticated()) {
    res.json({ message: 'You made it to the secured profile' ,user:req.user.username});
    
  } else {
    res.json({ message: 'You are not authenticated' });
  }
});





// Logout route

app.get('/logout', function (req, res) {
  // req.logOut();
  res.status(200).clearCookie('connect.sid', {
    path: '/'
  });
  req.session.destroy(function (err) {
    res.send('ok');
  });
});
// app.get('/logout', function (req, res){
//   req.session.destroy(function() {
//     res.clearCookie('connect.sid');
//     res.send('ok');
// });

  // req.logout(function(err){
  //   res.send('ok');
  // });
  // req.session.destroy(function (err) {
  //   res.send('ok'); //Inside a callback… bulletproof!
  // });




app.listen(8000, () => { console.log('Server started.') });
