var path = require('path');

module.exports = {
  entry: './src/app.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'backend.js'
  }
}