export default () => {
  console.log(`REDIS_HOST: ${process.env.REDIS_HOST}`);
  console.log(`REDIS_PORT: ${process.env.REDIS_PORT}`);
  console.log(`REDIS_PASSWORD: ${process.env.REDIS_PASSWORD}`);
  return {
    redis: {
      host: process.env.REDIS_HOST || '64.226.94.169',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      password: process.env.REDIS_PASSWORD || 'VerzoLive01&',
    },
  };
};
