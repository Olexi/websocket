import { login } from './login.js';

export function routing(req, res) {
  if(req.url === '/login') {
    login(req, res);
  } else {
    res.writeHead(404);
  }
}