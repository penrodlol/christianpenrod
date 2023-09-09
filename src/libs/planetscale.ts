import { connect, type Connection } from '@planetscale/database';

const _global = global as typeof global & { planetscale?: Connection };
const _planetscale =
  _global.planetscale ||
  connect({
    host: import.meta.env.PLANETSCALE_DB_HOST,
    username: import.meta.env.PLANETSCALE_DB_USERNAME,
    password: import.meta.env.PLANETSCALE_DB_PASSWORD,
  });

if (process.env.NODE_ENV !== 'development') _global.planetscale = _planetscale;

export default _planetscale;
