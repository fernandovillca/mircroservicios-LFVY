export default {
  jwtSecret: process.env.JWT_SECRET || 'E8f4Lx9R5YyO+1nqZVvghr8Pd4',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/nest-events',
  port: Number(process.env.PORT) || 3000,
};
