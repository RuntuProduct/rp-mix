import { api } from '../ast'
import upperCamelCase from 'simple-uppercamelcase'
import { basename, dirname, join } from 'path'
import { statSync, readFileSync } from 'fs'
import pathExists from 'path-exists'

import { info, error, success } from './tools'

function getBabelRc(cwd) {
  const rcPath = join(cwd, '.dvarc')
  if (pathExists.sync(rcPath)) {
    return JSON.parse(readFileSync(rcPath, 'utf-8'))
  } else {
    return {}
  }
}

function generate(program, { cwd }) {
  const defaultBase = 'src' // 默认执行目录
  const rc = getBabelRc(cwd)  // 寻找有无dva配置文件
  const base = program.base || rc.base || defaultBase // 执行目录优先级按照"传入值 > dva配置文件 > 默认配置"的方式
  const defaultEntry = `${base}/index.js`
  const defaultRouter = `${base}/router.js`

  const [type, name] = program.args;

  try {
    (() => {
      const entry = program.entry || defaultEntry;
      info('create', `path ${name}`);
      api('models.create', {
        namespace: name,
        sourcePath: cwd,
      });
    })();
  } catch(e) {
    error(e.stack);
  }

}

export default generate;
