var gulp = require("gulp"),
  sass = require("gulp-sass"),
  imagemin = require("gulp-imagemin"),
  del = require("del"),
  runSequence = require("run-sequence"),
  rename = require("gulp-rename"),
  cssnano = require("gulp-cssnano"),
  htmlmin = require("gulp-htmlmin"),
  uglify = require("gulp-uglify"),
  tinypng = require("gulp-tinypng"),
  autoprefixer = require("gulp-autoprefixer");

gulp.task("styles", function() {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer("last 2 version"))
    .pipe(gulp.dest("dist/css"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cssnano())
    .pipe(gulp.dest("dist/css"));
});

gulp.task("html", function() {
  return gulp
    .src("app/*.html")
    .pipe(htmlmin({ collapseWhitespace: true, cssmin: true }))
    .pipe(gulp.dest("dist"));
});

gulp.task("images", function() {
  return gulp
    .src("app/img/*")
    .pipe(tinypng("RyRnHifHneWlxM6gJE6Ffgc8QLwWKPFt"))
    .pipe(gulp.dest("dist/img"));
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
  runSequence("clean:dist", ["styles", "html", "images", "scripts"]);
});

gulp.task("watch", function() {
  gulp.watch("app/scss/**/_*.scss", ["styles"]);
  //   TODO define way to rebuild project after changing any scss file
  gulp.watch("app/scss/**/style.scss", ["styles"]);
  gulp.watch("app/**/*.html", ["html"]);
});

gulp.task("default", ["build", "watch"]);
