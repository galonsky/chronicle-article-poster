var formidable = require('formidable'),
http = require('http'),

sys = require('sys');

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
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

    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+ 
      '<input type="text" name="title"><br>' +
        '<input type="file" name="upload" multiple="multiple"><br>'+
          '<input type="submit" value="Upload">'+
            '</form>'
  );


}).listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');
