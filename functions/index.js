const functions = require('firebase-functions');

// HTTPリクエストを処理する関数
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello, Firebase!');
});

// 別のHTTPリクエストを処理する関数
exports.customFunction = functions.https.onRequest((request, response) => {
  response.json({ message: 'Custom Function executed!' });
});
