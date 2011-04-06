var formidable = require('formidable'),
http = require('http'), 
sys = require('sys'),
express = require('express'),
stylus = require('stylus');

var app = express.createServer();
app.configure(function(){ 
  app.set('view engine','jade');
  app.set('views', __dirname+'/views');
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.logger());
  app.use(app.router);
  app.use(express.static(__dirname+'/public'));
  app.use(stylus.middleware({src: __dirname + '/public'}));
});

app.get('/', function(req, res){
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+ 
      '<input type="text" name="title"><br>' +
        '<input type="file" name="upload" multiple="multiple"><br>'+
          '<input type="submit" value="Upload">'+
            '</form>'
  );
});

app.post('/upload', function(req,res){
  var form = new formidable.IncomingForm();
  form.uploadDir='./zipfiles';
  form.keepExtensions=true;
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.write(sys.inspect({fields: fields, files: files})+'\n');
    var exec = require('child_process').exec;
    function puts (error, stdout, stderr){ 
      res.end('Unzip Results: \n' + stdout);
      console.log('stdout: ' + stdout);
    }
    exec("unzip zipfiles/*.zip", puts);

  });

});



app.listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');
