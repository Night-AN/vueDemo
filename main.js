const { stat, readFile, readdir } = require('fs');
const { createServer } = require('http');
const { parse } = require('path');
const port = 3000;

function createPage(linklist){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            *{
                margin: 0;
                padding: 0;
            }
            header{
                background-color: green;
                color: white;
    
                width: 100%;
                padding-top: 3dvh;
                padding-bottom: 3dvh;
    
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            main{
                display: flex;
                flex-direction: column;
                align-items: center;
    
                background-color: lightgreen;
            }
            a,a:hover,a:active{
                color:white;

                text-decoration:none;
                font-size:2rem;
            }
        </style>
    </head>
    <body>
        <header>
            <h1>File list</h1>
        </header>
        <main>
            ${linklist}
        </main>
    </body>
    </html>`
}

const app = createServer((req, res) =>
{

    if(req.url === '/update'){
        
    }
    const path = '.' + req.url;
    stat(path, (err, stats) =>
    {
        try
        {
            if (err)
            {
                res.end(`Cannot ${req.method} ${req.url}`);
                console.log(`{"Level": "INFO","DATE": "${new Date().toLocaleString()}","RemoteAddress": "${req.socket.remoteAddress}","Port": "${req.socket.remotePort}","Methods": "${req.method}","Resources": "${req.url}","Status": "Failed"},`)
                return false;
            }

            if (stats.isDirectory())
            {
                readdir(path, (_, data) =>
                {
                    res.writeHead(200);
                    const filelist = [];
                    data.forEach(item =>
                    {
                        const formatItem = parse(item);
                        if (req.url === '/')
                        {
                            filelist.push(`<a href="${formatItem.base}">${formatItem.base}</a><br>`);
                        } else
                        {
                            filelist.push(`<a href="${req.url}/${formatItem.base}">${formatItem.base}</a><br>`);
                        }
                    })
                    res.end(createPage(filelist.join('')));
                })
            }

            if (stats.isFile)
            {
                readFile(path, (_, data) =>
                {
                    res.writeHead(200);
                    res.end(data);
                })
            }
            
            console.log(`{"Level": "INFO","DATE": "${new Date().toLocaleString()}","RemoteAddress": "${req.socket.remoteAddress}","Port": "${req.socket.remotePort}","Methods": "${req.method}","Resources": "${req.url}","Status": "SUCCESS"},`)


        } catch { throw err }
    });
});

app.listen(port, () =>
{
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`\n`);
    console.log(`All rights reserved by Shaw`);
    console.log(`\n`);
});