var gulp = require("gulp");
var pug = require("gulp-pug");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
sass.compiler = require("node-sass");

gulp.task("views", ()=> {
    return gulp.src("./src/views/**/*.pug")
        .pipe(pug())
        .pipe(gulp.dest("./dist"))
});
gulp.task("sass", ()=> {
    return gulp.src("./src/styles/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dist/styles"));
});
gulp.task("browser-sync", ()=> {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});
gulp.task("reload-server", (done)=> {
    browserSync.reload();
    done();
});


gulp.task("default", gulp.series("views", "sass", "browser-sync"));
gulp.watch("./src/views", gulp.series("views", "reload-server"));
gulp.watch("./src/styles", gulp.series("sass", "reload-server"));
