const config = {
  node_env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "12"),
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
};

const requiredVars = ["DATABASE_URL", "JWT_ACCESS_TOKEN", "JWT_REFRESH_TOKEN"];

requiredVars.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(
      `Environment variable "${variable}" is not defined in production!`,
    );
  }
});

export default config;
