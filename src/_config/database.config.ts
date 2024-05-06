import { registerAs } from "@nestjs/config";

export default registerAs('database', () => {
    console.log('--------------------------- ENV ----------------------------');
    console.log(process.env.DB_USERNAME);
    console.log(process.env.DB_PORT);
    console.log(process.env.DB_USERNAME);
    console.log(process.env.DB_PASSWORD);
    console.log(process.env.DB_NAME);
    console.log(process.env.NODE_ENV === 'development');
    console.log( process.env.NODE_ENV === 'development');
    console.log('--------------------------- FIM ENV ----------------------------');
    return ({
    type: 'postgres',
    host: process.env.DB_USERNAME || 'postgres',
    port: process.env.DB_PORT || 5000,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    migrations: [`${__dirname}/../../db/**/*{.ts,.js}`],
    autoLoadEntities: true,
    migrationsTableName: 'migrations',
})}

);