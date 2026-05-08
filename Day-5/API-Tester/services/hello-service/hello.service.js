const helloService = {
  getHello: () => {
    return {
      status: 'success',
      message: '👋 Hello! Welcome to GOW AI Academy - Day 5!',
      service: 'hello-service',
      port: process.env.HELLO_PORT,
      timestamp: new Date().toISOString()
    };
  }
};

module.exports = helloService;