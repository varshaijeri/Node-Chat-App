const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
    it('Should generate correct message object',()=>{
        var from = "Varsha";
        var text = "Hello there!!";
        var msg = generateMessage(from,text);
        expect(msg.createdAt).toBeA('number');
        expect(msg).toInclude({from,text});
    });
});

describe('generateLocationMessage',()=>{
    it('Should generate correct location object',()=>{
        var from = "Varsha";
        var latitude = 1;
        var longitude = 1;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`
        var location = generateLocationMessage(from,latitude,longitude);
        expect(location.createdAt).toBeA('number');
        expect(location).toInclude({from,url});
    });
});