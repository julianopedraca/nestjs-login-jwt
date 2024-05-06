import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";

config();

console.log('---------------ENV MIGRATION-----------------');
console.log(process.env.NODE_ENV);

console.log('---------------END MIGRATION-----------------');

const configService = new ConfigService();
//used during migration
export default new DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    synchronize: configService.get('NODE_ENV'),
    logging: configService.get('NODE_ENV'),
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    entities: [`${__dirname}/../**/entities/*.entity{.ts,.js}`],
    migrationsTableName: 'migrations',
})