const calculateService = {
  calculate: (num1, num2, operation) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      return { error: true, status: 400, message: 'num1 and num2 must be valid numbers' };
    }

    if (operation === 'div' && b === 0) {
      return { error: true, status: 400, message: 'Division by zero is not allowed' };
    }

    const ops = { add: a + b, sub: a - b, mul: a * b, div: a / b };

    if (!(operation in ops)) {
      return { error: true, status: 400, message: 'Invalid operation. Use: add | sub | mul | div' };
    }

    return { error: false, status: 200, num1: a, num2: b, operation, result: ops[operation] };
  }
};

module.exports = calculateService;