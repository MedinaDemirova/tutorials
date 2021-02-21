const config = {
PORT: 7000,
MONGODB_URI: `mongodb://localhost/expressExam`,
SALT_ROUNDS: 7,
SECRET: 'SOSTRONGSECRET',
COOKIE_NAME: 'token',
}

module.exports = config;