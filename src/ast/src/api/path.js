import {
  getTemplate,
  writeFile,
  readFile,
  removeFile,
} from './utils';
import { existsSync } from 'fs';
import { join } from 'path';
import assert from 'assert';
import j from 'jscodeshift';

const PATH_SEP = '/';

/**
 *payload: {
 *  path: 'String', // 要添加的路径
 *  sourcePath: 'String', // 项目根目录地址
 *}
 */
export function create(payload) {
  assert(payload.path, 'api/path/create: payload should have path');
  const { path, sourcePath } = payload;
  // 提取新增的文件夹名实际项目名
  const pathAry = path.split(PATH_SEP);
  assert(pathAry.length > 0, 'api/path/create: payload.path format error, should like this "aa/bb"');
  const fileName = pathAry[pathAry.length - 1];
  // 提取驼峰模块名
  const modelPath = join(sourcePath, '/models', path);
  assert(existsSync(filePath), `getTemplate: models file ${fileName} had exit`);
}

function getModals(path, name) {
  const template = getTemplate('models.create');
  const source = template(payload);
}
