var gulp         =  require('gulp');
var sass         =  require('gulp-sass');
var sourcemaps   =  require('gulp-sourcemaps');
var watch        =  require('gulp-watch');
var autoprefixer =  require('gulp-autoprefixer');
//var cleanCss	 =  require('gulp-clean-css');
var del	 		 =  require('del');
var pug 		 =  require('gulp-pug');
var browserSync  =	require('browser-sync').create();
var uglify       =  require('gulp-uglify');
var imagemin 	 =  require('gulp-imagemin');
var concat       =  require('gulp-concat');

const paths = {
    root: './dist',
    pug: {
        src: './src/**/*.pug',
        dest: './dist'
    },
    scss: {
        src: './src/scss/**/*.scss',
        dest: './dist/css'
    },    
    img: {
        src: './src/img/*',
        dest: './dist/img/'
    },
    js: {
        src: './src/js/*',
        dest: './dist/js'
    },
    libs_js:{
        dest: './src/js'
    },
    fonts: {
        src: './src/fonts/**/*',
        dest: './dist/fonts'
    }
}

//удаляем папку dist
function clean(){
	return del([paths.root])
}

//компилируем pug и перемещаем в dist
function pug_comp(){
	return gulp.src(paths.pug.src)
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(paths.pug.dest))
		.pipe(browserSync.reload({
			stream: true
		}));
}

//конкатенация библиотек js
function libs_js(){
	return gulp.src([
		'src/libs/jquery/dist/jquery.min.js',
        'src/libs/owl.carousel/dist/owl.carousel.min.js',
        'src/libs/chart.js/dist/Chart.min.js',
        'src/libs/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.min.js',
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest(paths.libs_js.dest));
}

function js(){
	return gulp.src(paths.js.src)
		.pipe(uglify())
		.pipe(gulp.dest(paths.js.dest))
		.pipe(browserSync.reload({
			stream: true
		}));
}
//перемещаем шрифты в dist
function fonts(){
	return gulp.src(paths.fonts.src)
		.pipe(gulp.dest(paths.fonts.dest))
}
//перемещаем картинки в dist
function img(){
	return gulp.src(paths.img.src)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.img.dest))
}

//компиляция файлов sass/scss и перемещаем в dist
function scss(){
	return gulp.src('./src/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.scss.dest))
		.pipe(browserSync.reload({
			stream: true
		}));
}
//разварачиваем свой сервер
function server(){
	browserSync.init({
		server: {
			baseDir: paths.root
		},
		notify: false
	});
}
//следим за изменениями файлов в браузере
function watch_file(){
	gulp.watch(paths.pug.src, pug_comp);
	gulp.watch(paths.scss.src, scss);
	gulp.watch(paths.js.src, js);	
}

//сборка всего
gulp.task('dev', gulp.series(clean,
	gulp.parallel(pug_comp, scss, libs_js, js, fonts, img),
	gulp.parallel(watch_file, server)
	));



