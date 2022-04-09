import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.DATABASE_URL!, {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

export default db;
