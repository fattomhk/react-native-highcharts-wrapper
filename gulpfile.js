const rename = require('gulp-rename');
const gulp = require('gulp');
const del = require('del');
const filePaths = require('./src/src/HighchartsModules.js');

const destinationPath = './src/highcharts-files/';

gulp.task('update-highcharts', async function () {
  const CORE_FILES_PATH = 'node_modules/highcharts/';

  const moduleFiles = Object.keys(filePaths.modules).map(
    (file) => CORE_FILES_PATH + 'modules/' + file + '.js'
  );

  // clear destination directory
  del([destinationPath + '*']);

  gulp
    .src(
      [
        CORE_FILES_PATH + 'highcharts.js',
        CORE_FILES_PATH + 'highcharts-more.js',
        CORE_FILES_PATH + 'highcharts-3d.js',
        ...moduleFiles,
      ],
      { base: './node_modules/highcharts/' }
    )
    // rename files
    .pipe(rename({ extname: '.hcscript' }))
    // copy them into the destination directory
    .pipe(gulp.dest(destinationPath));
});
