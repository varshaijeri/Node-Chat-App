const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage',()=>{
    it('Should generate correct message object',()=>{
        var from = "Varsha";
        var text = "Hello there!!";
        var msg = generateMessage(from,text);
        console.log(typeof msg.createdAt);
        expect(msg.createdAt).toBeA('number');
        expect(msg).toInclude({from,text});
    });
});