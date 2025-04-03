const assert = require('assert');
const fact = require('../src/javascript3');  

describe('Factorial Function', function () {
    it('should return 1 for input 0', function () {
        assert.strictEqual(fact(0), 1);
    });

    it('should return 1 for input 1', function () {
        assert.strictEqual(fact(1), 1);
    });

    it('should return 120 for input 5', function () {
        assert.strictEqual(fact(5), 120);
    });

    it('should return 720 for input 6', function () {
        assert.strictEqual(fact(6), 720);
    });

    it('should return undefined for negative input', function () {
        assert.strictEqual(fact(-5), undefined);
    });
});
