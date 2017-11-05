/**********************
 * 第四章 扩展对象的功能性
 **********************/
 
/* 属性初值的简写 */

function createPerson(name, age) {
 return {
   name: name,
   age, age
 };
}

function createperson(name, age) {
  return {
    name,
    age
  };
}

/* 对象方法的简写语法 */

var person = {
  name: "Nickolas",
  sayName: function() {
    console.log(this.name);
  }
};

var person = {
  name: "Nickolas",
  sayName() {
    console.log(this.name);
  }
};

/* 可计算属性名（Computed Property Name） */

var person = {};
var lastName = "last name";
person["first name"] = "Nickolas";
person[lastName] = "Zakas";
console.log(person["first name"]); // "Nickolas"
console.log(person[lastName]); // "Zakas"

var person = {
  "first name": "Nickolas"
};
console.log(person["first name"]); // "Nickolas"

let lastName = "last name";
let person = {
  "first name", "Nickolas",
  [lastName] = "Zakas"
};

var suffix = " name";
var person = {
  ["first" + sufix]: "Nickolas",
  ["last" + suffix]: "Zakas"
};
console.log(person["first name"]); // "Nickolas"
console.log(person["last name"]); // "Zakas"

/* Object.is()方法 */

console.log(+0 == -0); // true
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false
console.log(NaN == NaN); // false
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true
console.log(5 == 5); // true
console.log(5 == "5"); // true
console.log(5 === 5); // true
console.log(5 === "5"); // false
console.log(Object.is(5, 5)); // true
console.log(Object.is(5, "5")); // false

/* Object.assign()方法 */

function mixin(receiver, supplier) {
  Object.keys(supplier).forEach(function(key) {
    receiver[key] = supplier[key];
  });
  return receiver;
}

function EventTarget() { /*...*/ }
EventTarget.prototype = {
  constructor: EventTarget,
  emit: function() { /*...*/ },
  on: function() { /*...*/ }
};
var myObject = {};
mixin(myObject, EventTarget.prototype);
myObject.emit("somethingChanged");

function EventTarget() { /*...*/ }
EventTarget.prototype = {
  constructor: EventTarget,
  emit: function() { /*...*/ },
  on: function() { /*...*/ }
};
var myObject = {};
Object.assign(myObject, EventTarget.prototype);
myObject.emit("somethingChanged");

// 接受多个源对象，后面的同名属性覆盖之前的
var receiver = {};
Object.assign(receiver,
  {
    type: "js",
    name: "file.js"
  },
  {
    type: "css"
  }
);
console.log(receiver.type); // "css"
console.log(receiver.name); // "file.js"

// 访问器属性
var receiver = {},
  supplier = {
    get name() {
      return "file.js";
    }
  };
Object.assign(receiver, supplier);
var descriptor = Object.getOwnPropertyDescriptor(receiver, "name");
console.log(descriptor.value); // "fils.js"
console.log(descriptor.get); // undefined

/* 重复的对象字面量属性 */

"use strict";
var person = {
  name: "Nickolas",
  name: "Greg" // ES5严格模式下会有语法错误，ES6中取最后的值
};
console.log(person.name);

/* 自有属性枚举顺序 */

var obj = {
  a: 1,
  0: 1,
  c: 1,
  2: 1,
  b: 1,
  1: 1
};
obj.d = 1;
console.log(Object.getOwnPropertyNames(obj).join("")); // "012acbd"

/* 改变对象的原型 */

let person = {
  getGreeting() {
    return "Hello";
  }
};
let dog = {
  getGreeting() {
    return "Woof"
  }
};
// 以person对象为原型
let friend = Object.create(person);
console.log(friend.getGreeting()); // "Hello"
console.log(Object.getPrototypeOf(friend) === person); // true
// 将原型设置为dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting()); // "Woof"
console.log(Object.getPrototypeOf(friend) === dog); // true

/* 简化原型访问的super引用 */

let person = {
  getGreeting() {
    return "Hello";
  }
};
let dog = {
  getGreeting() {
    return "Woof"
  }
};
let friend = {
  getGreeting() {
    return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
  }
};
// 将原型设置为person
Object.setPrototypeOf(friend, person);
console.log(friend.getGreeting()); // "Hello, hi!"
console.log(Object.getPrototypeOf(friend) === dog); // false
// 将原型设置为dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting()); // "Woof, hi!"
console.log(Object.getPrototypeOf(friend) === dog); // true

// 使用super
let friend = {
  getGreeting() {
    return super.getGreeting() + ", hi!";
  }
};

let friend = {
  getGreeting: function() {
    // 语法错误
    return super.getGreeting() + ", hi!";
  }
};

// 可能出现的错误
let person = {
  getGreeting() {
    return "Hello";
  }
};
// 以person对象为原型
let friend = {
  getGreeting() {
    return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
  }
};
Object.setPrototypeOf(friend, person);
// 原型是friend
let relative = Object.create(friend);
console.log(person.getGreeting()); // "Hello"
console.log(friend.getGreeting()); // "Hello, hi!"
console.log(relative.getGreeting()); // Error

// 使用super解决上述问题
let person = {
  getGreeting() {
    return "Hello";
  }
};
let friend = {
  getGreeting() {
    return super.getGreeting() + ", hi!";
  }
};
Object.setPrototypeOf(friend, person);
let relative = Object.create(friend);
console.log(person.getGreeting()); // "Hello"
console.log(friend.getGreeting()); // "Hello, hi!"
console.log(relative.getGreeting()); // "Hello, hi!"

/* 正确的方法定义 */

let person = {
  // 是方法
  getGreeting() {
    return "Hello";
  }
};
// 不是方法
function shareGreeting() {
  return "Hello";
}

let person = {
  getGreeting() {
    return "Hello";
  }
};
let friend = {
  getGreeting() {
    return super.getGreeting() + ", hi!";
  }
};
Object.setPrototypeOf(friend, person);
console.log(friend.getGreeting()); // "Hello, hi!"