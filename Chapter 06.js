/*************************
 * 第六章 Symbol和Symbol属性
 *************************/
 
/* 创建Symbol */

let firstName = Symbol();
let person = {};
person[firstName] = "Nickolas";
console.log(person[firstName]);

// 建议在创建Symbol时添加一段描述
let firstName = Symbol("frist name");
let person = {};
person[firstName] = "Nickolas";
console.log("first name" in person); // false
console.log(person[firstName]); // "Nickolas"
console.log(firstName); // "Symbol(first name)"

/* Symbol的辨识方法 */

let symbol = Symbol("test symbol");
console.log(typeof symbol); // "symbol"

/* Symbol的使用方法 */

let firstName = Symbol("first name");
// 使用一个可计算对象字面量属性
let person = {
 [firstName]: "Nickolas"
};
// 将属性设置为只读
Object.defineProperty(person, firstName, {writable: false});
let lastName = Symbol("last name");
Object.defineProperties(person, {
 [lastName]: {
   value: "Zakas",
   writable: false
 }
});
console.log(person[firstName]); // "Nickolas"
console.log(person[lastName]); // "Zakas"

/* Symbol共享体系 */

let uid = Symbol.for("uid");
let object = {};
object[uid] = "12345";
console.log(object[uid]); // "12345"
console.log(uid); // "Symbol(uid)"
let uid2 = Symbol.for("uid");
console.log(uid === uid2);
console.log(object[uid]);
console.log(uid2);

// 检索与Symbol有关的键
let uid = Symbol.for("uid");
console.log(Symbol.keyFor(uid)); // uid
let uid2 = Symbol.for("uid");
console.log(Symbol.keyFor(uid2)); // uid
let uid3 = Symbol("uid");
console.log(Symbol.keyFor(uid3)); // undefined

/* Symbol与类型强制转换 */

let uid = Symbol.for("uid"),
  desc = String(uid);
console.log(desc); // "Symbol(uid)"

let uid = Symbol.for("uid"),
  desc = uid + ""; // 报错
  
  let uid = Symbol.for("uid"),
    desc = uid / 1; // 报错
    
/* Symbol属性检索 */

let uid = Symbol.for("uid");
let object = {
  [uid]: "12345"
};
let symbols = Object.getOwnPropertySymbols(object);
console.log(symbols.length); // 1
console.log(symbols[0]); // "Symbol(uid)"
console.log(object[symbols[0]]); // "12345"

/* Symbol.hasInstance方法 */

// 以下两句等价
obj instanceof Array;
Array[Symbol.hasInstance](obj);

// 编写一个无实例的函数
function MyObject() {
  // 空函数
}
Object.defineProperty(MyObject, Symbol.hasInstance, {
  value: function(v) {
    return false;
  }
});
let obj = new MyObject();
console.log(obj instanceof MyObject); // false

function SpecialNumber() {
  // 空函数
}
Object.defineProperty(SpecialNumber, Symbol.hasInstance, {
  value: function(v) {
    return (v instanceof Number) && (v >= 1 && v <= 100);
  }
});
var two = new Number(2),
  zero = new Number(0);
console.log(two instanceof SpecialNumber); // true
console.log(zero instanceof SpecialNumber); // false

/* Symbol.isConcatSpreadable属性 */

let colors1 = ["red", "green"],
  colors2 = colors1.concat(["blue", "black"]);
console.log(colors2.length); // 4
console.log(colors2); // ["red", "green", "blue", "black"]

let collection = {
  0: "Hello",
  1: "world",
  length: 2,
  [Symbol.isConcatSpreadable]: true
};
let message = ["Hi"].concat(collection);
console.log(message.length);
console.log(message);

/* Symbol.Match, Symbol.replace, Symbol.search和Symbol.split属性 */

// 实际上等价于/^.{10}$/
let hasLengthOf10 = {
  [Symbol.match]: function(value) {
    return value.length === 10 ? [value.substring(0, 10)] : null;
  },
  [Symbol.replace]: function(value, replacement) {
    return value.length === 10 ? replacement + value.substring(10) : value;
  },
  [Symbol.search]: function(value) {
    return value.length === 10 ? 0 : -1;
  },
  [Symbol.split]: function(value) {
    return value.length === 10 ? ["", ""] : [value];
  }
};
let message1 = "Hello world", // 11个字符
  message2 = "Hello John"; // 10个字符
let match1 = message1.match(hasLengthOf10),
  match2 = message2.match(hasLengthOf10);
console.log(match1); // null
console.log(match2); // ["Hello John"]
let replace1 = message1.replace(hasLengthOf10, "x"),
  replace2 = message2.replace(hasLengthOf10, "x");
console.log(replace1); // "Hello world"
console.log(replace2); // "x"
let search1 = message1.search(hasLengthOf10),
  search2 = message2.search(hasLengthOf10);
console.log(search1); // -1
console.log(search2); // 0
let split1 = message1.split(hasLengthOf10),
  split2 = message2.split(hasLengthOf10);
console.log(split1); // ["Hello world"]
console.log(split2); // ["", ""]

/* Symbol.toPrimitive方法 */

function Temprature(degrees) {
  this.degrees = degrees;
}
Temprature.prototype[Symbol.toPrimitive] = function(hint) {
  switch (hint) {
    case "string":
      return this.degrees + "\u00b0"; // degree symbol
    case "number":
      return this.degrees;
    case "default":
      return this.degrees + " degrees";
  }
};
var freezing = new Temprature(32);
console.log(freezing + "!"); // "32 degrees!"
console.log(freezing / 2); // 16
console.log(String(freezing)); // "32°"

/* Symbol.toStringTag属性 */

// 自定义对象字符串标签
function Person(name) {
  this.name = name;
}
Person.prototype[Symbol.toStringTag] = "Person";
var me = new Person("Nickolas");
console.log(me.toString()); // "[object Person]"
console.log(Object.prototype.toString.call(me)); // "[object Person]"

function Person(name) {
  this.name = name;
}
Person.prototype[Symbol.toStringTag] = "Person";
Person.prototype.toString = function() {
  return this.name;
}
var me = new Person("Nickolas");
console.log(me.toString()); // "Nickolas"
console.log(Object.prototype.tostring.call(me)); // "[object Person]"

// 修改原生对象的字符串标签
Array.prototype[Symbol.toStringTag] = "Magic";
var values = [];
console.log(Object.prototype.toString.call(values)); // ""

/* Symbol.unscopables属性 */

var values = [1, 2, 3],
  colors = ["red", "green", "blue"],
  color = "black";
with(colors) {
  push(color);
  // push(...values); // 报错
}
console.log(colors);

// 添加Symbol.unscopables属性，内置在ES6中
Array.prototype[Symbol.unscopables] = Object.assign(Object.create(null), {
  copyWithIn: true,
  entries: true,
  fill: true,
  find: true,
  findIndex: true,
  keys: true,
  values: true
});