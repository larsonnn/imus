const path = require('path');
module.exports = {
    entry: './index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      library: 'Imus',
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };