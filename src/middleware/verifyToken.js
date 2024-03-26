require('dotenv').config();
const { TOKEN } = process.env;

const verifyToken = (req, res, next) => {
  const header = req.header('Authorization') || '';
  const token = header.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not provied' });
  }

  if (token !== TOKEN) {
    return res.status(403).json({ message: 'Token not valid' });
  }
  // Si el token es válido, pasamos al siguiente middleware/ruta
  next();
};

module.exports = { verifyToken };
