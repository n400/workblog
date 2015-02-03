var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var harp        = require('harp');


// Serve the Harp Site from the src directory

gulp.task('serve', function () {
    harp.server(__dirname, {
        port: 9000
    }, function () {
        browserSync({
            proxy: "localhost:9000",
            open: false,
            // Hide the notification. It gets annoying
            notify: {
                styles: ['opacity: 0', 'position: absolute']
            }
        });
        // Watch for styl changes, tell BrowserSync to refresh main.css
        gulp.watch("public/stylesheets/*.styl", function () {
            reload("main.css", {stream: true});
        });
        // Watch for all other changes, reload the whole page
        gulp.watch(["public/*"], function () {
            reload();
        });
    })
});

// Default task, running `gulp` will fire up the Harp site,
// launch BrowserSync & watch files.

gulp.task('default', ['serve']);