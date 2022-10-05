import App from "./app";

App.listen(App.get('port'))
console.log('server on port', App.get('port'))