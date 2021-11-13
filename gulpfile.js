

//  function css( done ){
//      console.log('compilando.... SASS');
//      done();
//  }

//  function javascript( done ) {
//      console.log('compilando JS...');
//      done();
//  };
//  exports.css= css; 
//  exports.javascript = javascript;

//  exports.tareas = series(css, javascript);

const { series, src, dest, watch} = require('gulp');
const sass = require('gulp-dart-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat')

//utilidades de css
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//utilidades js
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');



// Funcion que compila sass

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

function css() {
   return src(paths.scss)
   .pipe( sourcemaps.init())
   .pipe( sass( ))
   .pipe( postcss( [autoprefixer(), cssnano()]))
   .pipe( sourcemaps.write('.'))
   .pipe( dest('./build/css'))
}

function javascript(){
    return src( paths.js)
    .pipe(sourcemaps.init())
    .pipe( concat( 'bundle.js'))
    .pipe( terser())
    .pipe(sourcemaps.write())
    .pipe( rename({ suffix: '.min'}))
    .pipe( dest('./build/js'))
}

function minificar() {
    return src(paths.scss)
    .pipe( sass( {
        outputStyle: 'compressed'
    }))
    .pipe( dest('./build/css'))
 }
 
function imagenes() {
    return src(paths.imagenes)
        .pipe( imagemin() )
        .pipe( dest( './build/img' ))
        .pipe( notify({message: 'imagen minificada'}) );
}
function versionWebp() {
    return src( paths.imagenes )
        .pipe( webp())
        .pipe( dest('./build/img'))
        .pipe( notify( {message: 'Version webP Lista'}));
}

function watchArchivo() {
    watch( paths.scss, css ); // *= la carpeta actual - **= todos los archivos con esa extension
    watch(paths.js, javascript);
}

exports.css = css;
exports.minificar= minificar;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.watchArchivo = watchArchivo;

exports.default = series( css, javascript, imagenes, versionWebp, watchArchivo); // esta es para compilar todo junto