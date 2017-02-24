// http://www.tuicool.com/articles/ea6FVf
var gulp = require('gulp');
var inject = require('gulp-inject');
var less = require('gulp-less');
var argv = require('yargs').argv;
var runSequence = require('run-sequence');
var template = require('gulp-template');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var del = require('del');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var watch = require('gulp-watch');


var configs, mode;

gulp.task('default', function(){
  runSequence(
      'mode',
      'api',
      'js-lint',
      'inject:js',
      'clean',
      'copy',
      'less-css',
      'inject:css'
  );
});

//切换本地与远程api参数
gulp.task('mode', function(done) {
  mode = argv.mode || 'local';
  configs = require('./src/js/configs/' + mode);
  done();
});

gulp.task('api', function(done) {
  return gulp.src(['src/js/configs/index.js'])
      .pipe(template(configs))
      .pipe(rename({basename: 'config'}))
      .pipe(gulp.dest('src/js/'));
});

//将js文件注入到index.html中
gulp.task('inject:js', function() {
  var sources = gulp.src(['./src/js/config.js', './src/app.js', './src/js/controllers/*.js', './src/js/directives/*.js', './src/js/services/*.js'], {read: false});
  return gulp.src(['./src/index.html'])
        .pipe(inject(sources,
            {
              transform: function(filepath) {
                var s = '<script src=\'' + filepath.replace('/src/','') + '\'></script>';
                return s;
              }
            }
        ))
        .pipe(gulp.dest('./src'));
});

//将css注入到index.html中
gulp.task('inject:css', function(){
  var sources = gulp.src(['./www/css/**/*.min.css'], {read: false});
  return gulp.src(['./www/index.html'])
      .pipe(inject(sources, {
        transform: function(filepath){
          var s = '<link rel=\'stylesheet\' href=\'' + filepath.replace('/www/','') + '\'>';
          return s;
        }
      }))
        .pipe(gulp.dest('./www'));
});

//less文件压缩处理到www文件夹
gulp.task('less-css', function(done) {
  gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(minifyCss({
          keepSpecialComments: 0,
          compatibility: 'ie7'
        }))
        .pipe(rename({
          extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', function(){
          done();
        });
});

//js语法检查
gulp.task('js-lint', function() {
    return gulp.src(['./gulpfile.js', './src/js/**/*.js'])
          .pipe(jshint())
          .pipe(jshint.reporter('default'));
});

//复制图片、html、js到www文件夹下
gulp.task('copy-image', function() {
    return gulp.src(['./src/imgs/**/*.png', './src/imgs/**/*.jpg'])
        .pipe(gulp.dest('./www/imgs'));
});

gulp.task('copy-index', function() {
    gulp.src(['./src/index.html'])
        .pipe(gulp.dest('./www'));
});

gulp.task('copy-htmls', function() {
    gulp.src('./src/htmls/**/*.html')
        .pipe(gulp.dest('./www/htmls'));
});

gulp.task('script', function() {
    gulp.src(['./src/js/**/*.js', '!./src/js/configs/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('www/js'));
});

gulp.task('copy-app.js', function(){
  gulp.src(['./src/app.js'])
      .pipe(uglify())
      .pipe(gulp.dest('www'));
});

//将第三方库复制到lib文件夹下
gulp.task('copy-lib', function(){
  gulp.src(['./bower_components/**/*'])
      .pipe(gulp.dest('www/js/lib'));
  gulp.src(['./src/alib/ui-bst/**/*'])
      .pipe(gulp.dest('www/js/lib/ui-bst'));
});

gulp.task('copy-uib-template', function(){
  gulp.src(['./src/alib/template/**/*'])
      .pipe(gulp.dest('www/uib/template'))
})

//拷贝处理后的文件到www文件夹
gulp.task('copy', ['copy-index', 'copy-app.js', 'script', 'copy-htmls', 'copy-image', 'copy-lib', 'copy-uib-template']);

//清除www文件夹
gulp.task('clean', function(){
    // return del(['./www/*']);
    return gulp.src('./www/*', { read:false })
        .pipe(clean())
});

//浏览器热更新
gulp.task('hot-load', function(callback) {
    runSequence(
        'js-lint',
        'inject:js',
        'copy',
        'less-css',
        'inject:css',
        function() {
            browserSync.reload();
            callback();
        }
    );
});

//有增删文件时需要重新执行watch，图片文件例外
gulp.task('watch', ['clean'], function() {
    runSequence(
        'mode',
        'api',
        'hot-load',
        function(){
            browserSync.init({
                server: {
                    baseDir: './www'
                },
                port: argv.port || 8080
            });
            watch([
              './src/js/**/*.js',
              './src/app.js',
              './src/htmls/**/*.html',
              './src/index.html',
              './src/imgs/**/*.png',
              './src/imgs/**/*.jpg',
              './src/alib/**/*.js',
              './src/alib/**/*.html',
              './src/less/**/*.less'
            ], function(){
              runSequence('hot-load');
            });
        }
    );
});
