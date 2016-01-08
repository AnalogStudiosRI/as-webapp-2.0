'use strict';

var AWS = require('aws-sdk');
var fs = require('fs');
var glob = require("glob");
var gulp = require('gulp');

AWS.config.region = 'us-west-2';

function getContentType(ext) {
  var contentType = 'text/';

  switch(ext) {
    case '.js':
      contentType = 'text';
      break;
    default:
      contentType += ext.replace('.', '');
      break;
  }

  return contentType;
}

gulp.task('deploy:s3', function() {
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
    for(var i = 0, l = files.length; i < l; i++){
      var filename = files[i];
      var s3filename = filename.replace('dest/', '');

      //upload only files
      //XXX hack to get around odd spin.js build oddity
      //XXX would not be an issue if AS-219, AS-225
      if(filename.indexOf('.') > 0 && filename !== 'dest/assets/js/vendor/spin.js'){
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

        s3.upload({Body: body}).on('httpUploadProgress',
          function(evt) {
            console.log(evt);
          }).send(function(err, data) {
          console.log(err, data)
        });
        console.log('*****************');
      }
    }
  });

});