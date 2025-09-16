/**
 * @file config/database.ts
 * @description Configuration des connexions BD (MySQL dev).
 */
import { defineConfig } from '@adonisjs/lucid'
import env from '#start/env'

const databaseConfig = defineConfig({
  connection: env.get('DB_CONNECTION', 'mysql'),
  connections: {
    mysql: {
      client: 'mysql2',
      connection: {
        host: env.get('MYSQL_HOST'),
        port: Number(env.get('MYSQL_PORT')),
        user: env.get('MYSQL_USER'),
        password: env.get('MYSQL_PASSWORD', ''),
        database: env.get('MYSQL_DB_NAME'),
      },
      pool: { min: 2, max: 10 },
      migrations: {
        naturalSort: true,
      },
    },
  },
})

export default databaseConfig
