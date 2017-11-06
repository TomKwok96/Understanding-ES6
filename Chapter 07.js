/***********************
 * 第七章 Set集合与Map集合
 ***********************/
 
/* ES5中的Set集合与Map集合 */

var set = Object.create(null);
set.foo = true;
// 检查属性是否存在
if (set.foo) {
 // 要执行的代码
}
 
var map = Object.create(null);
map.foo = "bar";
// 获取已知的值
var value = map.foo;
console.log(value); // "bar"

/* ES6中的Set集合 */

let set = new Set();
set.add(5);
set.add("5");
set.add(5); // 重复-本次调用被忽略
console.log(set.size); // 2

let set = new Set(),
  key1 = {},
  key2 = {};
set.add(key1);
set.add(key2);
console.log(set.size); // 2

let set = new Set([1, 2, 3, 3, 4]);
console.log(set.size); // 4

let set = new Set([1, 2]);
console.log(set.has(1)); // true
console.log(set.has(3)); // false

set.delete(5);
set.clear();

/* Set集合的forEach()方法 */

let set = new Set([1, 2]);
set.forEach(function(value, key, ownerSet) {
  console.log(key + " " + value);
  console.log(ownerSet === set);
});

let set = new Set([1, 2]);
let processor = {
  output(value) {
    console.log(value);
  },
  process(dataSet) {
    dataSet.forEach(function(value) {
      this.output(value);
    }, this);
    // 可用箭头函数替换以上代码
    // dataSet.forEach(value => this.output(value));
  }
};
processor.process(set);

/* 将Set集合转换为数组 */

let set = new Set([1, 2, 3, 3, 3, 4, 5]),
  array = [...set];
console.log(array); // [1, 2, 3, 4, 5]

// 去除重复值
function eliminateDuplicates(items) {
  return [...new Set(items)];
}
let numbers = [1, 2, 3, 3, 3, 4, 5],
  noDuplicates = eliminateDuplicates(numbers);
console.log(noDuplicates); // [1, 2, 3, 4, 5]

/* Weak Set集合 */

let set = new Set(),
  key = {};
set.add(key);
console.log(set.size); // 1
// 移除原始引用
key = null;
console.log(set.size); // 1
key = [...set][0];

/* 创建Weak Set集合 */

let set = new WeakSet(),
  key = {};
// 像集合set中添加对象
set.add(key);
console.log(set.has(key)); // true
set.delete(key);
console.log(set.has(key)); // false

// 不接受任何原始值
let key1 = {},
  key2 = {},
  set = new WeakSet([key1, key2]);
console.log(set.has(key1)); // true
console.log(set.has(key2)); // true

/* 两种Set类型的主要区别 */

let set = new WeakSet(),
  key = {};
set.add(key);
console.log(set.has(key)); // true
key = null; // Weak Set中的应用也会被自动移除

/* ES6中的Map集合 */

let map = new Map();
map.set("title", "Understanding ES6");
map.set("year", 2016);
console.log(map.get("title")); // "Understanding ES6"
console.log(map.get("year")); // "2016"

let map = new Map(),
  key1 = {},
  key2 = {};
map.set(key1, 5);
map.set(key2, 42);
console.log(map.get(key1)); // 5
console.log(map.get(key2)); // 42

/* Map集合支持的方法 */

let map = new Map();
map.set("name", "Nickolas");
map.set("age", 25);
console.log(map.size); // 2
console.log(map.has("name")); // true
console.log(map.get("name")); // "Nickolas"
console.log(map.has("age")); // true
console.log(map.get("age")); 25
map.delete("name");
console.log(map.has("name")); // false
console.log(map.get("name")); // undefined
console.log(map.size); // 1
map.clear();

/* Map集合的初始化方法 */

let map = new Map(["name", "Nickolas"], ["age", 25]);

/* Map集合的forEach()方法 */

let map = new Map(["name", "Nickolas"], ["age", 25]);
map.forEach(function(value, key, ownerSet) {
  console.log(key + " " + value);
  console.log(ownerSet === map);
});

/* Weak Map集合 */

let map = new WeakMap(),
  element = document.querySelector(".element");
map.set(element, "Original");
let value = map.get(element);
console.log(value); // "Original"
element.parentNode.removeChild(element); // 移除element元素
element = null; // 此时Weak Map集合为空

/* Weak Map集合的初始化方法 */

let key1 = {},
  key2 = {},
  map = new WeakMap([[key1, "Hello"], [key2, 42]]);
console.log(map.has(key1)); // true;
console.log(map.get(key1)); // "Hello"
console.log(map.has(key2)); // true
console.log(map.get(key2)); // 42

/* Weak Map集合支持的方法 */

let map = new WeakMap(),
  element = document.querySelector(".element");
map.set(element, "Original");
console.log(map.has(element)); // true
console.log(map.get(element)); // "Original"
map.delete(element);
console.log(map.has(element)); // false
console.log(mao.get(element)); // undefined

/* 私有对象数据 */

function Person(name) {
  this._name = name;
}
Person.prototype.getName = function() {
  return this._name;
}

var Person = (function() {
  
  var privateData = {},
  privateId = 0;
  
  function Person(name) {
    Object.defineProperty(this, "_id", {value: privateId++});
    privateData[this._id] = {
      name: name
    };
  }
  
  Person.prototype.getName = function() {
    return privateData[this._id].name;
  };
  return Person;
}());

let Person = (function() {
  
  let privateData = new WeakMap();
  
  function Person(name) {
    privateData.set(this, {name: name});
  }
  Person.prototype.getName = function() {
    return privateData.get(this).name;
  };
  return Person;
}());