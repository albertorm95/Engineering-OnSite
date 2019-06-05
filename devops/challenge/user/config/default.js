module.exports = {
  api: {
    port: '8080',
  },
  services: {
    vehicle: {
      protocol: 'http',
      host: 'localhost',
      port: '8085',
    },
    database: {
      host: '34.201.3.128',
      port: 5432,
      user: 'postgres',
      database: 'onsite',
      password: 'postgres',
    },
  },
};
