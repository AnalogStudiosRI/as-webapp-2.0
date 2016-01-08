'use strict';

var AWS = require('aws-sdk');
var fs = require('fs');
var glob = require('glob');
var gulp = require('gulp');

AWS.config.region = 'us-west-2';

function getContentType(extension) {
  var contentType = '';

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


gulp.task('s3:deploy', function() {
  //s3.listBuckets(function(err, data) {
  //  if (err) {
  //    console.log("Error:", err);
  //  } else {
  //    for (var index in data.Buckets) {
  //      var bucket = data.Buckets[index];
  //      console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
  //    }
  //  }
  //});

  // options is optional
  glob('dest/**/*', {}, function (er, files) {
    for (var i = 0, l = files.length; i < l; i += 1) {
      var filename = files[i];
      var s3filename = filename.replace('dest/', '');

      //upload only files
      //XXX hack to get around odd spin.js build oddity
      //XXX would not be an issue if AS-219, AS-225
      if (filename.indexOf('.') > 0 && filename !== 'dest/assets/js/vendor/spin.js') {
        var extension = filename.slice(filename.lastIndexOf('.'));
        var contentType = getContentType(extension);
        var body = fs.createReadStream(filename); //.pipe(zlib.createGzip());

        var s3 = new AWS.S3({
          params: {
            Bucket: 'static.analogstudios.net',
            Key: s3filename,
            ContentType: contentType
          }
        });

        s3.upload({Body: body}).on('httpUploadProgress', httpUploadProgress).send(httpUploadSend);
      }
    }
  });

});