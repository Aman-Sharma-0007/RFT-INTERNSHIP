const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method    = req.method;
  const url       = req.originalUrl;
  const ip        = req.ip || req.connection.remoteAddress;

  console.log(`📥 [${timestamp}] ${method} ${url} — IP: ${ip}`);

  // Log response when it finishes
  res.on('finish', () => {
    const statusCode = res.statusCode;
    const statusEmoji =
      statusCode >= 500 ? '🔴' :
      statusCode >= 400 ? '🟡' :
      statusCode >= 300 ? '🔵' :
      statusCode >= 200 ? '🟢' : '⚪';

    console.log(`📤 [${new Date().toISOString()}] ${statusEmoji} ${statusCode} — ${method} ${url}`);
  });

  next();
};

module.exports = logger; 