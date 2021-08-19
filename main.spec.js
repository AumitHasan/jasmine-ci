
// https://jasmine.github.io/2.5/introduction/ 

describe('main.js', () => {
  describe('calculate()', () => {
    it('validate expression when first number is invalid', () => {
      spyOn(window, 'updateResult').and.stub();

      calculate('a+3');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    }); 

    it('validate expression when second number is invalid', () => {
      spyOn(window, 'updateResult'); // .and.stub(); its default

      calculate('3+a');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    }); 

    it('validate expression when operation is invalid', () => {
      spyOn(window, 'updateResult'); // .and.stub(); it's default

      calculate('a_3');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    }); 

    it('calls add', () => {
      spyOn(Calculator.prototype, 'add');

      calculate('5+2');

      expect(Calculator.prototype.add).toHaveBeenCalledTimes(2);
      expect(Calculator.prototype.add).toHaveBeenCalledWith(5);
      expect(Calculator.prototype.add).toHaveBeenCalledWith(2);
    });

    it('calls subtract', () => {
      const spy = spyOn(Calculator.prototype, 'subtract');

      calculate('4-1');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(1);
    });

    it('calls multiply', () => {
      const spy = spyOn(Calculator.prototype, 'multiply');

      calculate('8*3');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(3);
      expect(spy).not.toHaveBeenCalledWith(8);
    });

    it('calls divide', () => {
      const spy = spyOn(Calculator.prototype, 'divide');

      calculate('4/2');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(2);
    });

    // confution ase
    // https://hatoum.com/blog/2016/11/12/jasmine-unit-testing-dont-forget-to-callthrough
    it('calls updateResult (example using and.callThrough)', () => {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.callThrough();

      calculate('5*5');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(25);
    });

    // callFake() .... replace actual functionality with fake one
    it('calls updateResult (example using callFake)', () => {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.callFake((number) => {
        // also you can put other calculation here
        let x = 5 + 6; // extra
        return 'it works'; // now multiply function return 'it works' insted of multiplying
      });

      calculate('5*5');

      expect(window.updateResult).toHaveBeenCalled();
      // expect(window.updateResult).toHaveBeenCalledWith(25); // as multiply return 'it works' so it will not pass
      expect(window.updateResult).toHaveBeenCalledWith('it works'); 
    });

    // returnValue()
    it('calls updateResult (example using and.returnValue)', () => {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.returnValue('whatever [multiply] return');

      calculate('5*5');

      expect(window.updateResult).toHaveBeenCalled();
      // expect(window.updateResult).toHaveBeenCalledWith('it works');  it will fail
      expect(window.updateResult).toHaveBeenCalledWith('whatever [multiply] return');
    });

    // returnValues()
    it('calls updateResult (example using and.returnValues)', () => {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'add').and.returnValues(null, 'whatever [add] return');

      calculate('5+5');

      expect(window.updateResult).toHaveBeenCalled();
      // expect(window.updateResult).toHaveBeenCalledWith(null);
      expect(window.updateResult).toHaveBeenCalledWith('whatever [add] return');
    });

    // confution ase
    // and.throwError
    // it('does not handle error', () => {
    //   spyOn(Calculator.prototype, 'multiply').and.throwError('some error');

    //   expect(function () { calculate(5*5) }).toThrowError('some error');
    // });

    // confusion ase
    // using Getters & spyOnProperty
    

  });

  describe('updateResult()', () => {
    
    let element;
    beforeAll(() => {
      // executed ONCE before all spec(it) executed
      element = document.createElement('div');
      element.setAttribute('id', 'result');
      
      document.body.appendChild(element);
    });

    afterAll(() => {
      // executed ONCE after all spec(it) executed
      element = document.getElementById('result');
      document.body.removeChild(element);
    });

    it('add result to DOM element', () => {
      updateResult('5');

      expect(element.innerText).toBe('5');
    });
  });

  describe('showVersion()', () => {
    it('calls Calculator.version', () => {
      // spyOn(document, 'getElementById').and.returnValue({
      //   innterText: null
      // });

      // spyOnProperty(Calculator.prototype, 'version', 'get'); // for this you need getOwnPropertyDescription
      const spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(Promise.resolve());

      showVersion();

      // expect(Calculator.prototype.version).toHaveBeenCalled(); // it will give error:  Expected a spy, but got undefined.
      // expect(Object.getOwnPropertyDescriptor(Calculator.prototype, 'version').get).toHaveBeenCalled(); // it works
      expect(spy).toHaveBeenCalled();
    });
  });
});