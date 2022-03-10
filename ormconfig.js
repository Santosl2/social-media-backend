module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  // "host": "localhost",
  // "port": 5432,
  // "username": "postgres",
  // "password": "docker",
  // "database": "backend_api",
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations",
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
