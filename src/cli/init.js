import { join, basename } from 'path'
import vfs from 'vinyl-fs'
import { renameSync } from 'fs'
import through from 'through2'
import { sync as emptyDir } from 'empty-dir'

import { info, error, success } from './tools'

const init = ({ demo, install }) => {
  const type = demo ? 'demo' : 'app'  // 获取构建类型
  const cwd = join(__dirname, '../../boilerplates', type) // 根据构建类型获取模板文件路径
  const dest = process.cwd()  // 获取命令执行当前目录
  const projectName = basename(dest)  // 以文件名作为项目名

  // 目录内必须为没有其他文件内容
  if (!emptyDir(dest)) {
    error('Existing files here, please run init command in an empty folder!')
    process.exit(1)
  }

  console.log(`Creating a new Dva app in ${dest}.`)
  console.log()

  
  vfs.src(['**/*', '!node_modules/**/*'], {cwd: cwd, cwdbase: true, dot: true})
    .pipe(template(dest, cwd))
    .pipe(vfs.dest(dest))
    .on('end', function() {
      info('rename', 'gitignore -> .gitignore')
      renameSync(join(dest, 'gitignore'), join(dest, '.gitignore'))
      // 判断是否自动安装依赖
      if (install) {
        info('run', 'npm install')
        require('./install')(printSuccess)
      } else {
        printSuccess()
      }
    })
    .resume()

  function printSuccess() {
    success(`
      Success! Created ${projectName} at ${dest}.
      
      Inside that directory, you can run several commands:
        * npm start: Starts the development server.
        * npm run build: Bundles the app into dist for production.
        * npm test: Run test.
      
      We suggest that you begin by typing:
        cd ${dest}
        yarn install
        npm start
      
      Happy hacking!`
    )
  }
}

function template(dest, cwd) {
  return through.obj(function (file, enc, cb) {
    if (!file.stat.isFile()) {
      return cb()
    }

    info('create', file.path.replace(cwd + '/', ''))
    this.push(file)
    cb()
  })
}

export default init
