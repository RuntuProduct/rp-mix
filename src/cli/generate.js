import upperCamelCase from 'simple-uppercamelcase';
import { basename, dirname, join } from 'path';
import { statSync, readFileSync } from 'fs';
import pathExists from 'path-exists';
import { api } from '../ast';

import { info, error, success } from './tools';

function getBabelRc(cwd) {
  const rcPath = join(cwd, '.dvarc');
  if (pathExists.sync(rcPath)) {
    return JSON.parse(readFileSync(rcPath, 'utf-8'));
  } else {
    return {};
  }
}

function generate(program, { cwd }) {
  const defaultBase = 'src'; // 默认执行目录
  const rc = getBabelRc(cwd);  // 寻找有无dva配置文件
  const base = program.base || rc.base || defaultBase; // 执行目录优先级按照"传入值 > dva配置文件 > 默认配置"的方式
  const defaultEntry = `${base}/index.js`;
  const defaultRouter = `${base}/router.js`;

  const [type, name] = program.args;

  try {
    switch (type) {
      case 'model':
        (() => {
          const modelPath = `./models/${name}`;
          const filePath = `${base}/models/${name}.js`;
          const entry = program.entry || defaultEntry;
          info('create', `model ${name}`);
          info('register', `to entry ${entry}`);
          api('models.create', {
            namespace: name,
            sourcePath: cwd,
            filePath,
            entry,
            modelPath,
          });
        })();
        break;
      case 'route':
        (() => {
          const componentName = upperCamelCase(name);
          const componentPath = `${base}/routes/${componentName}.js`;
          const componentCSSPath = `${base}/routes/${componentName}.css`;
          const withCSS = program.css ? `, ${componentCSSPath}` : '';
          info('create', `routeComponent ${componentPath}${withCSS}`);
          api('routeComponents.create', {
            sourcePath: cwd,
            filePath: componentPath,
            componentName,
            css: program.css,
          });
          info('create', `route ${name} with ${componentPath}`);
          api('router.createRoute', {
            filePath: program.router || defaultRouter,
            sourcePath: cwd,
            path: `/${name}`,
            component: {
              componentName,
              filePath: componentPath,
            },
          });
        })();
        break;
      case 'component':
        (() => {
          const fileName = basename(name);
          const fileDir = dirname(name);
          const componentName = upperCamelCase(fileName);
          const filePath = join(`${base}/components`, fileDir, `${componentName}.js`);
          const componentCSSPath = join(`${base}/components`, fileDir, `${componentName}.css`);
          const withCSS = program.css ? `, ${componentCSSPath}` : '';
          info('create', `component ${filePath}${withCSS}`);
          api('components.create', {
            sourcePath: cwd,
            filePath,
            componentName,
            css: program.css,
          });
        })();
        break;
      default:
        error(`ERROR: uncaught type ${type}`);
        break;
    }
  } catch (e) {
    error(e.stack);
  }
}

export default generate;
