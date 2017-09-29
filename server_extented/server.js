const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const hostname = '127.0.0.1';

const port = 3000;

const mimeTypes = {
  "html" : "text/html",
  "jpeg" : "image/jpeg",
  "jpg"  : "image/jpg",
  "js"   : "text/javascript",
  "css"  : "text/css"
}

http.createServer((req, res) => {
  
  var uri = url.parse(req.url).pathname; 
      fileName = path.join(process.cwd(), unescape(uri));
  var stats;

      try {
        stats = fs.lstatSync(fileName);
      }
      catch (e){
        res.writeHead(404, {'Content-type' : 'text/plain'});
        res.write('404 - File Not Found\n');
        res.end();
         return;
      }

      if(stats.isFile()){
        var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
        res.writeHead(200, {'Content-type' : mimeType });

        var readStream = fs.createReadStream(fileName);
        readStream.pipe(res);
      }else {
        res.writeHead(302, {'Location' : 'index.html'});
      }




}).listen(port, hostname, () => {
  console.log(`Server Is Running on http://${hostname}:${port}`);
});