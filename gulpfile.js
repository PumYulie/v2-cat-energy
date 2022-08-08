import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from "postcss-csso";
import htmlmin from "gulp-htmlmin";
import rename from "gulp-rename";
import squoosh from "gulp-libsquoosh";
import svgmin from "gulp-svgmin";
import svgstore from "gulp-svgstore";
import del from "del";

// Styles
export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber()) //чтобы не падало
    .pipe(less()) //из less в css
    .pipe(postcss([
      autoprefixer(),  //расставь префиксы
			csso() //минимизировать css
    ]))
		.pipe(rename("style.min.css"))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML
const html = () => {
	return gulp.src("source/*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		//.pipe(rename("*.min.html"))
		.pipe(gulp.dest("build"));
}

/* const html = async () => {
	const htmlFunc = () => {
		const data = ['index', 'catalog', 'form'];
		for (let i = 0; i < data.length; i++) {
			gulp.src(`source/${data[i]}.html`)
				.pipe(rename(function(path) {
					path.basename = data[i];
					path.extname = '.min.html';
				}))
				.pipe(htmlmin({ collapseWhitespace: true }))
				.pipe(gulp.dest('build'));
		}
	}
	return htmlFunc();
} */

// Scripts
const scripts = () => {
	return gulp.src("source/js/*.js")
		.pipe(gulp.dest("build/js"))
		.pipe(browser.stream());
}

// Images
const optimizeImages = () => {
	return gulp.src("source/img/**/*.{png,jpg}")
		.pipe(squoosh())
		.pipe(gulp.dest("build/img"));
}

const copyImages = () => {
	return gulp.src("source/img/**/*.{png,jpg}")
		.pipe(gulp.dest("build/img"));
}

// WebP
const createWebp = () => {
	return gulp.src("source/img/**/*.{png,jpg}")
		.pipe(squoosh({ webp: {} }))
		.pipe(gulp.dest("build/img"));
}

// SVG + sprite
const svg = () => {
	return gulp.src(["source/img/**/*.svg", "!source/img/icons-sprite/*.svg", "!source/img/sprite.svg"])
		.pipe(svgmin())
		.pipe(gulp.dest("build/img"));
}

const svgSprite = () => {
	return gulp.src("source/img/icons-sprite/*.svg")
		.pipe(svgmin())
		.pipe(svgstore({ inlineSvg: true }))
		.pipe(rename("sprite.svg"))
		.pipe(gulp.dest("build/img"));
}

// Copy files - перетащить просто нужные файлы в прод
const copy = (done) => {
	return gulp.src([
		"source/fonts/*.{woff2,woff}", "source/*.ico"
	], {
		base: "source"
	})
		.pipe(gulp.dest("build"));
	done();
}

// Clean
const clean = () => {
	return del("build");
}

// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload
const reload = (done) => {
	browser.reload();
	done();
}

// Watcher
const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
	gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build = npm run build - собираю финальную на прод
export const build = gulp.series(
	clean,
	copy,
	optimizeImages,
	gulp.parallel(
		styles,
		html,
		scripts,
		svg,
		svgSprite,
		createWebp
	),
);

// Default = gulp = npm start - собираю для себя пока рабочую быструю, копирка картинок
export default gulp.series(
	clean,
	copy,
	copyImages,
	gulp.parallel(
		styles,
		html,
		scripts,
/* 		createWebp, */
		svg,
		svgSprite
	),
	gulp.series(
		server, watcher
	)
);
