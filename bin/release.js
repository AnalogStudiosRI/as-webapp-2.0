//TODO write in all ES6
//upload build to s3 bucket
'use strict';

let AWS = require('aws-sdk');
let fs = require('fs');
let glob = require('glob');
let packageJson = require('../package.json');
AWS.config.region = 'us-west-2';

//can be used as a simple test of auth
let s3 = new AWS.S3();
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error:", err);
  } else {
    for (var index in data.Buckets) {
      let bucket = data.Buckets[index];
      console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
    }
  }
});

console.log('DIR NAME!!!!!!',  __dirname);
//uploads the build directory to S3
glob('**/**', { cwd: '../build' }, function (er, files) {
  console.log('DIR NAME!!!!!!',  __dirname);
  console.log('er', er);
  console.log('files', files);
  for (var i = 0, l = files.length; i < l; i += 1) {
    let filename = files[i];

    //upload only files
    if (filename.indexOf('.') > 0) {
      let extension = filename.slice(filename.lastIndexOf('.'));
      let contentType = getContentType(extension);
      let body = fs.readFileSync('../build/' + filename); //.pipe(zlib.createGzip());

      console.log('key => ' + packageJson.name + '/' + filename);
      let s3 = new AWS.S3({
        params: {
          Bucket: 'static.analogstudios.net',
          Key: packageJson.name + '/' + filename,
          ContentType: contentType
        }
      });

      s3.upload({Body: body}).on('httpUploadProgress', httpUploadProgress).send(httpUploadSend);
    }
  }
});

function getContentType(extension) {
  let contentType = '';

  switch (extension) {
    case '.eot':
      contentType = 'application/vnd.ms-fontobject';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.js':
      contentType = 'application/javascript';
      break;
    case '.otf':
      contentType = 'application/x-font-opentype';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.svg':
      contentType = 'image/svg+xml';
      break;
    case '.ttf':
      contentType = 'application/x-font-ttf';
      break;
    case '.woff':
      contentType = 'application/font-woff';
      break;
    case '.woff2':
      contentType = 'application/font-woff2';
      break;
    default:
      contentType = 'text/' + extension.replace('.', '');
      break;
  }

  return contentType;
}

function httpUploadProgress(evt) {
  console.log(evt);
}

function httpUploadSend(err, data) {
  console.log(err, data);
}