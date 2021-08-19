
function Calculator() {
  this.total = 0;
}

Calculator.prototype.add = function(number) {
  return this.total += number;
}

Calculator.prototype.subtract = function(number) {
  return this.total -= number;
}

Calculator.prototype.multiply = function(number) {
  return this.total *= number;
}

Calculator.prototype.divide = function(number) {
  if(number === 0) {
    throw new Error('Can\'t divide by zero');
  }
  return this.total /= number;
}

Object.defineProperty(Calculator.prototype, 'version', {
  // it was for section 5 part
  // get: () => {
  //   return '0.1'
  // },
  get: () => {
    return fetch('https://gist.githubusercontent.com/AumitHasan/5c24a533db507ff3772dfbdb966f8212/raw/36548a913a92a3698045ec64988cd789230a98ce/unit%2520test%2520data')
      .then((result) => {
        return result.json();
      })
      .then((resultJsonVersion) => {
        return resultJsonVersion.version;
      });
  },
  enumarable: true,
  configurable: true 
})
