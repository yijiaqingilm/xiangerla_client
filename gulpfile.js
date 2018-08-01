var gulp = require('gulp')
// var exec = require('gulp-exec')
var exec = require('child_process').exec
var config = {
  srcPath: 'dist/**/*',
  destPath: '/usr/local/nginx/html',
  // destPath: 'C:\\test'
}
gulp.task('build', function (cb) {
  console.log('npm run build start')
  exec('npm run build', function (err) {
    if (err) {
      return cb(err)
    }
    console.log('npm run build complate')
    cb()
  })
})
gulp.task('rmOldProject', function (cb) {
  console.log('cd /usr/local/nginx/html')
  exec(`cd ${config.destPath}`, function (err) {
    if (err) {
      return cb(err)
    }
    console.log('删除旧的项目=== start')
    exec('rm -rf js img fonts css', function (err) {
      if (err) {
        return cb(err)
      }
      console.log('删除旧的项目=== end')
      cb()
    })
  })

})
gulp.task('mvDist2nginx', ['build', 'rmOldProject'], function () {
  gulp.src(config.srcPath).pipe(gulp.dest(config.destPath))
})

gulp.task('default', ['mvDist2nginx'])
