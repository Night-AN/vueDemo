/*
 * @Author: ShawDe
 * @Date: 2024-02-25 19:23:41
 * @Description: 
 */
const http = require('http');
const fs = require("fs");

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('./VueEvent/index.html', (err, data) => {
    if (err) throw err;
    console.log(data.toString);
    res.end(data);
  });
});

server.listen(port, hostname, () => {

  console.log(`Server running at http://${hostname}:${port}/`);

});