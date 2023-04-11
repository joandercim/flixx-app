const obj = {
    name: 'John',
    age: 40,
    children: {
        name: 'Jack',
        age: 4,
        favFood: ''
    }
}

const { children: { age: kidsAge } } = obj;

const { name: user } = obj;
const { children: { name: userKid } } = obj;

function haveFun(parent, kid) {
    console.log(`See you later ${parent}, have fun with your son ${kid}`)
}

haveFun(user, userKid)