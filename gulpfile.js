var gulp = require("gulp"),
  sass = require("gulp-sass"),
  del = require("del"),
  runSequence = require("run-sequence"),
  rename = require("gulp-rename"),
  cssnano = require("gulp-cssnano"),
  htmlmin = require("gulp-htmlmin"),
  uglify = require("gulp-uglify"),
  autoprefixer = require("gulp-autoprefixer");
  concat = require("gulp-concat");

  gulp.task("sass", function() {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer("last 2 version"))
    .pipe(gulp.dest("app/css"))
});

gulp.task("css", function() {
  return gulp
    .src("app/css/**/*.css")
    .pipe(concat('style.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest("dist/css"));
});

gulp.task("styles", function() {
  runSequence("sass", "css");
  });
  

gulp.task("html", function() {
  return gulp
    .src("app/*.html")
    .pipe(htmlmin({ collapseWhitespace: true, cssmin: true }))
    .pipe(gulp.dest("dist"));
});

gulp.task("images", function() {
  return gulp.src("app/img/*").pipe(gulp.dest("dist/img"));
});

gulp.task("scripts", function() {
  return gulp
    .src("app/js/**")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

gulp.task("clean:dist", function() {
  return del.sync("dist");
});

gulp.task("build", function(callback) {
  runSequence("clean:dist", ["styles", "css", "html", "images", "scripts"]);
});

gulp.task("watch", function() {
  gulp.watch("app/scss/**/_*.scss", ["styles"]);
  //   TODO define way to rebuild project after changing any scss file
  gulp.watch("app/scss/**/style.scss", ["styles"]);
  gulp.watch("app/**/*.html", ["html"]);
  gulp.watch("app/js/*.js", ["scripts"]);
});

gulp.task("default", ["build", "watch"]);
