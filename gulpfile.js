var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var assign = require('object-assign');

var node_path = __dirname + '/node_modules';

// Schema for GraphQL
gulp.task('babel-schema', () => {
  return gulp.src('./es6-schema/**/*.js')
    .pipe(babel({
      plugins: ['transform-runtime'],
      presets: ['es2015', 'stage-0']
    }))
    .pipe(gulp.dest('./schema'));
});


// React and Relay
gulp.task('babel-relay', () => {
  return gulp.src(__dirname + '/babel/app/**/*.js')
    .pipe(babel({
      presets: ['es2015', 'react', 'stage-0'],
      plugins: [plugin],
    }))
    .pipe(gulp.dest('bundle'));
});

gulp.task('sass', () => {
  gulp.src(__dirname + '/scss/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('./public/'));
});

gulp.task('watch', () => {
  //gulp.watch(['./babel/app/**/*.js'], ['browserify']);
  gulp.watch(['./scss/*.scss'], ['sass']);
});


/*gulp.task('browserify', ['babel-relay'], () => {
  var opts = assign({}, watchify.args);
  var b = watchify(browserify(opts));

  b.add(__dirname + '/bundle/main.js');
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/'));
});

gulp.task('force', () => {
  var b = browserify();

  b.add(__dirname + '/bundle/main.js');
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/'));
});*/
