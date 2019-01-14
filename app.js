  const User = require('./models/user');
  const CostDetails = require('./models/cost_details');
  const knex = require('knex')(require('./knexfile')['development']);
  const restify = require('restify');
  const path = require("path");
  const fs = require('fs');
  const mime = require('mime');
  const config = require('./config');
  const rjwt = require('restify-jwt-community');
  const jwt = require('jsonwebtoken');

  const server = restify.createServer();

  server.use(restify.plugins.bodyParser());
  server.use(restify.plugins.authorizationParser());
  server.use(rjwt(config.jwt).unless({
    path: ['/create-user', '/user-login']
  }));

  server.use(function(req, res, next) {
        next();
  });

  server.pre(function(req, res, next) {
    next();
  });

  server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
  });

  server.post('/create-user', function(req, res, next){    
    let response = {status: 200,  message: "", data: {}};
    let user = new User();
    if(req.params.username != "" && req.params.password != "" && req.params.age != "")
    {
      msg = 'user registration successful';
      user.username = req.params.username;
      user.password = req.params.password;
      user.age = parseInt(req.params.age);
      knex('users').insert(user).then((record) => {
        response.data = {userId: record[0]};
        return response;
      }).catch(err => {
        console.log(err);
        response.message = err.message;
        response.status = 500;
        return response;
      }).then((response) => {
        response.message = msg;
        res.send(response.status, response);
        next();
      });
    } else {
      response.message = 'missing required fields';
      res.send(response.status, response);
      next();
    }
  });

  server.post('/user-login', function(req, res, next)
  {
    let response = {status: 200,  message: "", data: {}, auth_info: {}};
    if(req.params.username != "" && req.params.password != "")
    {
      knex('users').where({ username: req.params.username })
      .select('*')
      .then((record) => {
        if(record[0]==null)
        {
          response.message = 'user not found';
          return response;
        }
        else
        {
          if(req.params.password === record[0].password)
          {
            response.message = 'user found';
            let token = jwt.sign({username : record[0].username, password: record[0].password}, config.jwt.secret, {
              expiresIn: '15m' // token expires in 15 minutes
            });
            let { iat, exp } = jwt.decode(token);
            response.data = {username : record[0].username, password: record[0].password, age: record[0].age};
            response.auth_info = { iat, exp, token };
            return response;
          }
          else
          {
            response.message = 'password not matched';
            return response;
          }
        }
        
      })
      .catch(err => 
      {
        console.log(err);
        response.message = err.message;
        response.status = 500;
        return response;       
      })
      .then((response) => {
        res.send(response.status, response);
        next();
      });
    } 
    else 
    {
      response.message = 'missing required fields';
      res.send(response.status, response);
      next();
    }
  });

  server.post('/save-cost', function(req, res, next)
  {
    let response = {status: 200,  message: "", data: {}};
    let cost_details = new CostDetails();
    if(req.body.user_id != "" && req.body.cost_name != "" && req.body.amount != "" && req.body.date != "")
    {
      cost_details.user_id = req.body.user_id;
      cost_details.cost_name = req.body.cost_name;
      cost_details.amount = req.body.amount;
      cost_details.date = req.body.date;
      knex('cost_details').insert(cost_details)
      .then((record) => {
        response.message = 'cost registration successful';
        response.status = 200;
        return response; 
      })
      .catch(err => 
      {
        response.message = err.message;
        response.status = 500;
        return response;       
      })
      .then((response) => {
        res.send(response.status, response);
        next();
      });
    } 
    else 
    {
      response.message = 'missing required fields';
      res.send(response.status, response);
      next();
    }
  });

  server.post('/upload-files', (req, res, next) =>{
    let date = new Date();
    for (var key in req.files) {
      console.log('key :', key);
      let ext = path.extname(req.files[key].name);
      let time = date.getTime();
      let oldpath = req.files[key].path;
      let newpath = `./uploads/${key+time+ext}`;
      fs.readFile(oldpath,  (err, data) => {
          if (err) throw err;
          // Write the file
          fs.writeFile(newpath, data, (err) => {
              if (err) throw err;
              console.log('File written!');
          });

          // Delete the file
          fs.unlink(oldpath, function (err) {
              if (err) throw err;
              console.log('File deleted!');
          });
      });
    }
    res.send(202, { message: 'File uploaded' });
});

  server.get('/download-files', (req, res, next) => {
    fs.readFile(__dirname + '/uploads/file-one1547367999994.txt', function (err, data) {
      if (err) {
        next(err);
        return;
      }
      let mime_type = mime.getType(__dirname + '/uploads/file-one1547367999994.txt');
        if (err) throw err;
        res.setHeader('Content-Type', mime_type);
        res.writeHead(200);
        res.end(data);
        next();
    })
  });