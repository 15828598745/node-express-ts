import { configure, getLogger } from 'log4js';
import { appConf } from '../config/appConf';
import path from "path";

configure({
  appenders: {
    // 声明此属性可在控制台上打印信息
    stdout: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[ [%d{yyyy-MM-dd hh:mm:ss}] %m %]' // %d{HH:mm:ss.SSS} %msg
      }
    },
    // 输出配置
    out: {
      type: 'dateFile',
      filename: '/home/lh/work/liahng/node-project/test/node-express-ts-dom/logs/logs',
      pattern: 'yyyy-MM-dd-out.log',
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss}] %m'
      }
    },
  },
  categories: { default: { appenders: ['stdout', /* 'out' */], level: 'debug' } },
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID'
})

const _logger = getLogger();

export const logger = _logger;