import { registerAs } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";

export default registerAs('redis', () => ({
    store: redisStore,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,

}));