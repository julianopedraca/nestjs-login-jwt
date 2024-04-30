import { registerAs } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";

export default registerAs('redis', () => ({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,    
}));