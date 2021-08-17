import { fs } from 'fs';

let users = null;

fs.readFile('test.txt', (err, data) => {
  users = JSON.parse(data)
});

export const login = function(req, res) {
  res.write('Hello, login world!')
}

