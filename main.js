
function calculate(inputValue) {
  const expression = /\+|\-|\*|\//;
  const numbers = inputValue.split(expression);

  const numA = parseInt(numbers[0]);
  const numB = parseInt(numbers[1]);

  const operation = inputValue.match(expression);
  // console.log(operation);

  if(Number.isNaN(numA) || Number.isNaN(numB) || operation === null) {
    updateResult("Expression not recognized");
    return;
  }

  const calculator = new Calculator();
  calculator.add(numA);

  let result;

  switch(operation[0]) {
    case '+':
      result = calculator.add(numB);
      break;
    case '-':
      result = calculator.subtract(numB);
      break;
    case '*':
      result = calculator.multiply(numB);
      break;
    case '/':
      result = calculator.divide(numB);
      break;
  }

  updateResult(result);
}

function updateResult(result) {
  console.log(result);
  if(result) {
    const element = document.getElementById('result');
    element.innerText = result;
  }
}

function showVersion() {
  const calculator = new Calculator();

  const element = document.getElementById('version');

  // only get
  // if(calculator.version) {element.innerText = calculator.version;}

  calculator.version.then(version => {
    element.innerText = version;
  })
  .catch(error => {
    element.innerText = 'unknown';
  });
  
}