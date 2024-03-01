const { stat, readFile, readdir } = require('fs');
const HTTP = require('http');
const port = 3000;


const app = HTTP.createServer((req, res) =>
{
    const path = '.' + req.url;

    stat(path, (err, stats) =>
    {
        if(err){
            res.writeHead(500);
        }
        if (stats.isDirectory()===true)
        {
            readdir(path,(err,data)=>{
                if(err){
                    res.writeHead(500);
                }
                res.writeHead(200);
                res.end(data.toString());
            });
        } else if (stats.isDirectory()===false)
        {
            readFile(path,(err,data)=>{
                if(err){
                    res.writeHead(500);
                }
                res.writeHead(200);
                res.end(data);
            })
        }
    });
});

app.listen(port, () =>
{
    console.log(`Server is running on localhost:${port}`)
});