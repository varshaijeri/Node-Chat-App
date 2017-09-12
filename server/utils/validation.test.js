const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('Is Real String',()=>{
    it('Should reject non-string values',()=>{
        expect(isRealString(1234)).toBe(false);
    });
    it('Should reject string with only spaces',()=>{
        expect(isRealString("      ")).toBe(false);
    });
    it('Should allow string with non-space characters',()=>{
        expect(isRealString("  test test  ")).toBe(true);
    });
});