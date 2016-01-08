'use strict';

var AWS = require('aws-sdk');
var gulp = require('gulp');

AWS.config.region = 'us-west-2';

gulp.task('deploy:s3', function() {
  var s3 = new AWS.S3({params: {Bucket: 'static.analogstudios.net', Key: 'index.html', ContentType: 'text/html'}});

  s3.listBuckets(function(err, data) {
    if (err) {
      console.log("Error:", err);
    } else {
      for (var index in data.Buckets) {
        var bucket = data.Buckets[index];
        console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
      }
    }
  });

  var fs = require('fs');
  //var zlib = require('zlib');

  var body = fs.createReadStream('./dest/index.html'); //.pipe(zlib.createGzip());
  s3.upload({Body: body}).on('httpUploadProgress',
    function(evt) {
      console.log(evt);
    }).send(function(err, data) {
      console.log(err, data)
  });

});