const expect = require('expect');
const {Users} = require('./users');

describe('Users',()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{id:'1',name:'Varsha',room:'Room A'},
                        {id:'2',name:'Subbu',room:'Room B'},
                        {id:'3',name:'Mrudula',room:'Room A'}]
    });
    it('Should add a new user',()=>{
        var users = new Users();
        var user = users.addUser("10abc","varsha","room A");
        expect(users.users).toEqual([{id:"10abc",name:"varsha",room:"room A"}]);
    });

    it('Should remove a user',()=>{
        var userId = '2';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('Should not remove a user',()=>{
        var userId = '22';
        var user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('Should find user',()=>{
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('Should not find user',()=>{
        var userId = '44';
        var user = users.getUser(userId);
        expect(user).toNotExist();
    });
    
    it('Should get all user associated with a "room A"',()=>{
        var nameArray = users.getUserList('Room A');
        expect(nameArray).toEqual(['Varsha','Mrudula']);
    });

    it('Should get all user associated with a "room B"',()=>{
        var nameArray = users.getUserList('Room B');
        expect(nameArray).toEqual(['Subbu']);
    });
});