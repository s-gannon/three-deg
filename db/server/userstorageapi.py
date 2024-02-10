from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import json 


PORT = 8080
IP = 'localhost'


class UserStorageAPI(BaseHTTPRequestHandler):
	def _set_response(self, status_code=200, content_type="text/html"):
		self.send_responses(status_code)
		self.send_header('Content-type', content_type)
		self.end_headers()
	
	def do_GET(self):
		parsed_url = urlparse(self.path)
		path = parsed_url.path 
		query_params = parse_qs(parsed_url.query)

		match path:
			case "/":
				res = self.home(query_params)
				if res is not None:
					self.wfile.write(str(res).encode())

			case _:
				self._set_response(status_code=404)
				self.wfile.write(b'404 Not Found')

	def json(self, dict):
		return json.dumps(dict)
	
	def home(self, params: dict):
		name = params.get('name', [''])[0]

		return self.json({
			"message": f"Hello, {name}!"
		})
	
	def do_POST(self):
		content_len = int(self.headers['Content-Length'])
		post_data = self.rfile.read(content_len)
		parsed_data = json.loads(post_data.decode())


def run(
		server_class=HTTPServer,
		handler_class=UserStorageAPI,
		port=PORT,
		ip=IP):
	server_addr = (ip, port)
	httpd = server_class(server_addr, handler_class)
	print(f"starting server on {ip}:{port}")
	httpd.serve_forever()

if __name__ == "__main__":
	run()
