import { Sequelize } from 'sequelize-typescript';
import { appConf } from '../config/appConf';

export const initMysql = () => {
  const sequelize = new Sequelize(Object.assign({ modelPaths: [`${__dirname}/models`] }, appConf.mysql));
}