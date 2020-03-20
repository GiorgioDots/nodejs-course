const http = require('http');

const handler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>App</title></head>');
    res.write('<body>');
    res.write('<h1>Hi, welcome to chilli</h1>');
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>'
    );
    res.write('</body>');
    return res.end();
  }
  if (url === '/users') {
    res.write('<html>');
    res.write('<head><title>App</title></head>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li>User 1</li>');
    res.write('<li>User 2</li>');
    res.write('<li>User 3</li>');
    res.write('<li>User 4</li>');
    res.write('</ul>');
    res.write('</body>');
    return res.end();
  }
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      console.log(message);
      res.end();
    });
  }
};

const server = http.createServer(handler);

server.listen(3000);
