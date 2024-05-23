import 'reflect-metadata';
import { DataSource } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

console.log(__dirname)
const ormconfig: PostgresConnectionOptions = {
    name: 'nestjs',
    type: 'postgres',
    username: 'nestjs',
    password: 'nestjs',
    host: 'localhost',
    port: 5433,
    logging: 'all',
    synchronize: false,
    entities: ['src/modules/database/entity/**/*'],
    migrations: ['src/modules/database/migrations/**/*'],
    subscribers: [],
}

const appDataSource = new DataSource(ormconfig)

export default appDataSource
