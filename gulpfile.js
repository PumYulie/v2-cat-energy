import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from "postcss-csso";
import htmlmin from "gulp-htmlmin";
import terser from "gulp-terser";
import rename from "gulp-rename";
import squoosh from "gulp-libsquoosh";
import svgmin from "gulp-svgmin";
import svgstore from "gulp-svgstore";
import del from "del";

// Styles
export const styles = () => {
  return gulp
		.src('source/less/style.less', { sourcemaps: true })
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
	return gulp
		.src("source/*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("build"));
}

// Scripts
const scripts = () => {
	return gulp
		.src("source/js/*.js")
		.pipe(terser())
		//.pipe(rename("script.min.js"))
		.pipe(gulp.dest("build/js"))
		.pipe(browser.stream());
}

// Images
const optimizeImages = () => {
	return gulp
		.src(["source/img/**/*.{png,jpg}", "!source/img/catalog/css/*.{png,jpg}", "!source/img/index/css/*.{png,jpg}"])
		.pipe(squoosh())
		.pipe(gulp.dest("build/img"));
}

const copyImages = () => {
	return gulp
		.src(["source/img/**/*.{png,jpg}", "!source/img/catalog/css/*.{png,jpg}", "!source/img/index/css/*.{png,jpg}"])
		.pipe(gulp.dest("build/img"));
}

// WebP
const createWebp = () => {
	return gulp
		.src("source/img/**/*.{png,jpg}")
		.pipe(squoosh({ webp: {quality: 90,} }))
		.pipe(gulp.dest("build/img"));
}

// avif
const createAvif = () => {
	return gulp
		.src(["source/img/**/*.{png,jpg}", "!source/img/index/css/*.{png,jpg}", "!source/img/catalog/css/*.{png,jpg}"])
		.pipe(squoosh({ avif: {quality: 90,} }))
		.pipe(gulp.dest("build/img"));
}

// SVG
const svg = () => {
	return gulp
		.src(["source/img/**/*.svg", "!source/img/icons-sprite/*.svg", "!source/img/sprite.svg"])
		.pipe(svgmin())
		.pipe(gulp.dest("build/img"));
}

// sprite.svg
const svgSprite = () => {
	return gulp.src("source/img/icons-sprite/*.svg")
		.pipe(svgmin())
		.pipe(svgstore({ inlineSvg: true }))
		.pipe(rename("sprite.svg"))
		.pipe(gulp.dest("build/img"));
}

// Copy files - перетащить просто нужные файлы в прод
const copy = (done) => {
	gulp
		.src([
			"source/fonts/*.{woff2,woff}",
			"source/*.ico",
			"source/*.webmanifest"
		], { base: "source"})
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
		createWebp,
		createAvif
	),
);

// Default = gulp = npm start - собираю для себя пока рабочую быструю, копирка картинок
export default gulp.series(
	clean,
	copy,
	copyImages, //вместо optimizeImages для скорости
	gulp.parallel(
		styles,
		html,
		scripts,
		createWebp,
		createAvif,
		svg,
		svgSprite
	),
	gulp.series(
		server, watcher
	)
);
