const webpackMerge = require('webpack-merge');
const prodConfig = require('./webpack.config.prod');
const S3Plugin = require('webpack-s3-plugin');

module.exports = webpackMerge(prodConfig, {

  plugins: [

    new S3Plugin({
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1'
      },
      s3UploadOptions: {
        Bucket: 'webapp.analogstudios.net'
      },
      cdnizerOptions: {
        defaultCDNBase: '//d3cpag05e1ba19.cloudfront.net'
      },
      cloudfrontInvalidateOptions: {
        DistributionId: 'E3MKRY7663NB8F',
        Items: ['/index.html']
      }
    })

  ]
});