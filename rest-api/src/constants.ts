const DB_LOCATION = process.env.DB_LOCATION;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

export const DB_CONN_STR = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_LOCATION}`;
export const JWT_SECRET = process.env.JWT_SECRET;
