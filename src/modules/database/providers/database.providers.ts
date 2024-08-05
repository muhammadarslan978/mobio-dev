import { ConfigService } from '@nestjs/config';
import { INJECTION_TOKEN, REPOSITORY } from '../../../constant/index';
import { DataSource, Repository } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from '../entity/user';
import { Company } from '../entity/company';
import { OnBoarding } from '../entity/onBording';

export const databaseProviders = [
  {
    provide: INJECTION_TOKEN.DATA_SOURCE,
    useFactory: async (configService: ConfigService): Promise<DataSource> => {
      try {
        const databaseName = configService.get('POSTGRES_DB');
        const postgresUser = configService.get('POSTGRES_USER');
        const postgresPassword = configService.get('POSTGRES_PASSWORD');
        const dbHost = configService.get('DB_HOST');
        const dbPort = configService.get('DB_PORT');

        console.log('DATABASE_NAME:', databaseName);
        console.log('POSTGRES_USER:', postgresUser);
        console.log('POSTGRES_PASSWORD:', postgresPassword);
        console.log('DB_HOST:', dbHost);
        console.log('DB_PORT:', dbPort);

        const ormconfig: PostgresConnectionOptions = {
          database: databaseName,
          type: 'postgres',
          username: postgresUser,
          password: postgresPassword,
          host: dbHost,
          port: dbPort,
          logging: ['error', 'migration', 'schema', 'warn'],
          synchronize: false,
          migrationsRun: true,
          entities: [__dirname + '/../entity/**/*.js'],
          migrations: [__dirname + '/../migrations/**/*.js'],
          subscribers: [],
        };

        const dataSource = new DataSource(ormconfig);
        const connection = await dataSource.initialize();

        console.log('Database connection has been established successfully.');

        return connection;
      } catch (err) {
        console.error('Unable to connect to the database:', err);
        throw err;
      }
    },
    inject: [ConfigService],
  },
  {
    provide: REPOSITORY.USER_REPOSITORY,
    useFactory: (dataSource: DataSource): Repository<User> => {
      return dataSource.getRepository(User);
    },
    inject: [INJECTION_TOKEN.DATA_SOURCE],
  },
  {
    provide: REPOSITORY.COMPAY_REPOSITORY,
    useFactory: (dataSource: DataSource): Repository<Company> => {
      return dataSource.getRepository(Company);
    },
    inject: [INJECTION_TOKEN.DATA_SOURCE],
  },
  {
    provide: REPOSITORY.ONBORDING_REPOSITORY,
    useFactory: (dataSource: DataSource): Repository<OnBoarding> => {
      return dataSource.getRepository(OnBoarding);
    },
    inject: [INJECTION_TOKEN.DATA_SOURCE],
  },
];
