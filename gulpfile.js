//gulpfile.js
var gulp = require('gulp');
var browserSync = require('browser-sync');
var handlebars = require('gulp-static-handlebars');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var jimp = require('gulp-jimp-resize');
var hb = require('gulp-hb');
var hb2 = require('gulp-compile-handlebars');

gulp.task('default', function() {
	console.log("Congratulations, Gulp is successfully working.");
});

gulp.task('build',['hb', 'sass']);

gulp.task('watch', ['build'], function() {
	gulp.watch('src/**/*.*', function(){

		gulp.run('build');
		browserSync.reload();
		
	})
});	

gulp.task('bs',['watch'], function(){
	browserSync({
		server: {
			baseDir: 'dist'
		}
	})
});

gulp.task('hb', function(){
	gulp.src('./src/**/*.hbs')
	    .pipe(handlebars({contents:"whatever"}, {
	    	helpers: gulp.src('./src/components/**/*.js'),
	        partials: gulp.src('./src/components/**/*.hbs')
	    }))
	    .pipe(rename({ extname: '.html' })) //change extention name
	    .pipe(gulp.dest('./dist'));
});

// gulp.task('hb-alt', function(){
// 	return gulp.src('./src/index.hbs')
//         .pipe(hb({
//             partials: './src/components/**/*.hbs',
//             helpers: './src/components/**/*.js'
//         }))
//         .pipe(rename('index.html'))
//         .pipe(gulp.dest('./dist/'));

// });

// gulp.task('hb-alt2', function() {

// 	var templateData = {},
//     options = {
//         batch : ['./src/partials'],
//         helpers : {
//             listNavbar : function(items){

//     //         	var out;
                
// 				// for(var i=0, l=items.length; i<l; i++) {
// 				// 	out += "<li>" + items[i] + "</li>";
// 				// }

// 				// return out;

// 				return items;
//             }
//         }
//     }
    
// 	gulp.src('./src/index.hbs')
// 	.pipe(hb2(templateData, options))
// 	.pipe(rename('index.html'))
// 	.pipe(gulp.dest('./dist/'));

// });
	
gulp.task('sass', function() {
	return gulp.src('./src/main.scss')
	.pipe(sass())
	.pipe(gulp.dest('./dist'))
});

gulp.task('images', function() {
	return gulp.src('./src/images/**/*.{png,jpg,bmp}')
	.pipe(jimp({
		sizes: [
			{"suffix": "lg", "width": 1080},
            {"suffix": "md", "width": 580}
        ]
    }))
	.pipe(gulp.dest('./dist/images/'));
});



