import { createServer } from 'node:http';
import { changeStatus, createTask, getData, initCounter, deleteTask } from './storage.js';

const hostname = '127.0.0.1';
const port = 3000;

function init() {
  initCounter()
}

const server = createServer((req, res) => {
  const url = req.url
  const method = req.method
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  if (url === '/tasks' && method === 'POST') {
    let body = []
    req.on('data', chunk => {
      body.push(chunk);
      console.log(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const item = JSON.parse(body)
      const result = createTask(item)
      console.log(result);
      res.end(result)
    });
  }
    
  if (url === '/tasks' && method === 'PATCH') {
    let body = []
    req.on('data', chunk => {
      body.push(chunk);
      console.log(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const requestData = JSON.parse(body)
      const changedData = changeStatus(requestData.id)
      res.end(changedData)
    });
  }


  if (url === '/tasks' && method === 'DELETE') {
    let body = []
    req.on('data', chunk => {
      body.push(chunk);
      console.log(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const requestData = JSON.parse(body)
      const result = deleteTask(requestData.id)
      res.end()
    });
  }

  if (url === '/tasks' && method === 'GET') {
    const result = getData()
    res.end(result)
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
