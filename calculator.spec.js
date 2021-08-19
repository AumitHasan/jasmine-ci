// https://jasmine.github.io/2.5/introduction 


// use xdescribe to disable a suite
// xdescribe('calculator.js', () => {
describe('calculator.js', () => {
  // use xit to disable a spec or test
  // xit('Should add numbers to total', () => {
  
  describe('Calculator', () => {
    let calculator;
    let calculator2;

    beforeEach(() => {
      // anything inside this block executes before each spec(it) inside this describe
      calculator = new Calculator();
      calculator2 = new Calculator();
    });

    afterEach(() => {
      // anything inside this block executes after each spec(it) inside this describe
    });

    // toBe
    it('should be initiliaze the total', () => {
      expect(calculator.total).toBe(0);
    });
  
    // toEqual
    it('has constructor (toEqual)', () => {
      // calculator2.total = 10;
      // expect(calculator.total).toBe(calculator2);
      expect(calculator).toEqual(calculator2);
    });
  
    // toBeTruthy & toBeFalsy
    it('falsy & truthy', () => {
      expect(!calculator).toBeFalsy();
      expect(calculator).toBeTruthy();
    });
  
    // not.toBe
    it('instantiate unique object (not.toBe)', () => {
      expect(calculator).not.toBe(calculator2);
    });
  
    // toBeNull 
    it('can overwrite total (null) ', () => {
      calculator.total = null;
      expect(calculator.total).toBeNull();
    });
  
    // toContain
    it('can find element in array or string (toContain)', () => {
      expect(calculator.constructor.name /* Calculator*/).toContain('Calc');
      // expect(calculator.constructor.name /* Calculator*/).toContain('calc'); // will fail test
    });
  

    // jasmine.anything()
    // asymetric matcher !! not equal to each side
    // only null, undefinded are not included
    it('compare anythin if get any', () => {
      calculator.total = 20;
  
      // it will fail spec
      // expect(null).toEqual(jasmine.anything);
  
      expect(calculator.total).toEqual(jasmine.anything());
      expect(()=>{}).toEqual(jasmine.anything());
    });
  

    // third party matcher
    // add jasmine-matchers.js in spec-runner.html
    it('check a number', () => {
      expect(calculator.total).toBeNumber();
    });

    describe('add()', () => {
      it('Should add numbers to total', () => {
        calculator.add(10);
    
        expect(calculator.total).toBe(10);
      });

      // toMatch .... it compares with regular expression
      it('returns total (toMatch)', () => {
        calculator.total = 50;
    
        expect(calculator.add(20)).toBe(70);
        expect(calculator.total).toMatch(/-?\d+/);
        expect(typeof calculator.total).toMatch('number');
      });

      // toBeUndefinde, toBeDefined
      it('has common operation (undefined & undefined)', () => {
        expect(calculator.add).not.toBeUndefined();
        expect(calculator.add).toBeDefined();
      });
    });

    describe('subtract()', () => {
      it('Should subtract numbers to total', () => {
        calculator.total = 50;
        calculator.subtract(10);
    
        expect(calculator.total).toBe(40);
      });

    });

    describe('multiply()', () => {
      it('Should multiply numbers to total', () => {
        calculator.total = 20;
        calculator.multiply(2);
    
        expect(calculator.total).toBe(40);
      });

      // toBeNaN
      it('does not handle NaN', () => {
        calculator.total = 1;
        expect(calculator.multiply('a')).toBeNaN();
      });
    });

    describe('divide()', () => {
      it('Should divide numbers to total', () => {
        calculator.total = 100;
        calculator.divide(5);
    
        expect(calculator.total).toBe(20);
      });

      // toThrow, toThrowError
      it('handle devide by zero', () => {
        expect(() => { calculator.divide(0) }).toThrow();
        expect(() => { calculator.divide(0) }).toThrowError(Error);
        // it will check message as well 
        expect(() => { calculator.divide(0) }).toThrowError(Error, 'Can\'t divide by zero');
      });
    });

    describe('get version', () => {
      // as we are using spyOn so don't need done... but using done is recomended
      // it('fetch data(version) from external source', (done) => {
      it('fetch data(version) from external source',  () => {
        const calculator = new Calculator();

        spyOn(window, 'fetch').and.returnValue(Promise.resolve(
          new Response('{"version":"0.2"}')
        ));

        calculator.version.then((version) => {
          expect(version).toBe('0.2');
          // done();
        })
      });
    });
  });
});