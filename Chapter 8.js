/******************************************
 * 第八章 迭代器（Iterator）和生成器（Generator）
 ******************************************/
 
/* 什么是迭代器 */

// 在ES5中创建一个迭代器
function createIterator(items) {
  
  var i = 0;
  return {
    next: function() {
      var done = (i >= items.length);
      var value = !done ? items[i++] : undefined;
      return {
        done: done,
        value: value
      };
    }
  };
}
var iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }
console.log(iterator.next()); // 之后的每次调用都是相同的内容

/* 什么是生成器 */

function *createIterator() {
  yield -1;
  yield 2;
  yield 3;
}
let iterator = createIterator(); // 生成器函数与普通函数相同，只不过返回的是一个迭代器
console.log(iterator.next().value); // -1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
console.log(iterator.next().value); // undefined

function *createIterator(items) {
  for (let i = 0; i < items.length; i++) {
    yield item[i];
  }
}
let iterator =createIterator([1, 2, 3]);
console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }
console.log(iterator.next()); // 之后的每次调用都是相同的内容

/* yeild的使用限制 */

function *createIterator(items) {
  items.forEach(functin(item) {
    yield item + 1; // 语法错误
  });
}

/* 生成函数表达式 */

let createIterator = function *(items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i];
  }
}
let iterator =createIterator([1, 2, 3]);
console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }
console.log(iterator.next()); // 之后的每次调用都是相同的内容

/* 生成器对象的方法 */

// ES5的风格
let o = {
  createIterator: function *(items) {
    for (let i = 0; i < items.length; i++) {
      yield items[i];
    }
  }
};
let iterator = o.createIterator([1, 2, 3]);

// ES6的风格
let o = {
  *createIterator(items) {
    for (let i = 0; i < items.length; i++) {
      yield items[i];
    }
  }
};
let iterator = o.createIterator([1, 2, 3]);

/* 可迭代对象和for-of循环 */

let values = [1,  2, 3];
for (let num of values) {
  console.log(num);
}

/* 访问默认迭代器 */

let values = [1, 2, 3];
let iterator = values[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// 检测对象是否为可迭代对象
function isIterable(object) {
  return typeof object[Symbol.iterator] === "function";
}
console.log(isIterable([1, 2, 3])); // true
console.log(isIterable("Hello")); // true
console.log(isIterable(new Map())); // true
console.log(isIterable(new Set())); // true
console.log(isIterable(new WeakMap())); // false
console.log(isIterable(new WeakSet())); // false

/* 创建可迭代对象 */

let collection = {
  items: [],
  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item;
    }
  }
};
collection.items.push(1);
collection.items.push(2);
collection.items.push(3);
for (let x of collection) {
  console.log(x);
}

/* 集合对象迭代器 */

// entries()迭代器
let colors = ["red", "green", "blue"];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ES6");
data.set("format", "ebook");
for (let entry of colors.entries()) {
  console.log(entry);
}
for (let entry of tracking.entries()) {
  console.log(entry);
}
for (let entry of data.entries()) {
  console.log(entry);
}

// value()迭代器
let colors = ["red", "green", "blue"];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ES6");
data.set("format", "ebook");
for (let value of colors.values()) {
  console.log(value); // 报错
}
for (let value of tracking.values()) {
  console.log(value);
}
for (let value of data.values()) {
  console.log(value);
}

// keys()迭代器
let colors = ["red", "green", "blue"];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ES6");
data.set("format", "ebook");
for (let key of colors.keys()) {
  console.log(key);
}
for (let key of tracking.keys()) {
  console.log(key);
}
for (let key of data.keys()) {
  console.log(key);
}

// 默认迭代器
let colors = ["red", "green", "blue"];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ES6");
data.set("format", "ebook");
for (let value of colors) {
  console.log(value);
}
for (let num of tracking) {
  console.log(num);
}
for (let entry of data) {
  console.log(entry);
}

/* 解构与for-of循环 */

let data = new Map();
data.set("title", "Understanding ES6");
data.set("format", "ebook");
for (let [key, value] of data) {
  console.log(key + " " + value);
}

/* 字符串迭代器 */

var message = "A 吉 B";
for (let i = 0; i < message.length; i++) {
  console.log(message[i]);
}
for (let c of message) {
  console.log(c);
}

/* NodeList迭代器 */

var divs = document.getElementsByTagName("div");
for (let div of divs) {
  console.log(div.id);
}

/* 展开运算符与非数组可迭代对象 */

let set = new Set([1, 2, 3, 3, 4]),
  array = [...set];
console.log(array); // [ 1, 2, 3, 4 ]

let map = new Map([["name", "Nickolas"], ["age", 25]]),
  array = [...map];
console.log(array); // [["name", "Nickolas"], ["age", 25]]

let smallNumbers = [1, 2, 3],
  bigNumber = [100, 101, 102],
  allNumbers = [0, ...smallNumbers, ...bigNumbers];
console.log(allNumbers.length); // 7
console.log(allNumbers); // [ 0, 1, 2, 3, 100, 101, 102 ]

/* 给迭代器传递参数 */

function *createIterator() {
  let first = yield 1;
  let second = yield first + 2; // 4 + 2
  yield second + 3; // 5 + 3
}
let iterator = createIterator();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next(4)); // { value: 6, done: false }
console.log(iterator.next(5)); // { value: 8, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

/* 在迭代器中抛出错误 */

function *createIterator() {
  let first = yield 1;
  let second = yield first + 2; // 4 + 2
  yield second + 3; // 5 + 3
}
let iterator = createIterator();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next(4)); // { value: 6, done: false }
console.log(iterator.throw(new Error("Boom"))); // 从生成器中抛出错误

// 调用throw()方法返回一个结果对象
function *createIterator() {
  let first = yield 1;
  let second;
  try {
    second = yield first + 2; // yield 4 + 2 然后抛出错误
  } catch (ex) {
    second = 6; // 如果捕捉到错误给second赋另外一个值
  }
  yield second + 3;
}
let iterator = createIterator();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next(4)); // { value: 6, done: false }
console.log(iterator.throw(new Error("Boom"))); // { value: 9, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

/* 生成器返回语句 */

function *createIterator() {
  yield 1;
  return;
  yield 2;
  yield 3;
}
let iterator = createIterator();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// 指定一个返回值
function *createIterator() {
  yield 1;
  return 42;
}
let iterator = createIterator();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 42, done: true }
console.log(iterator.next()); // { value: undefined, done: true }

/* 委托生成器 */

function *createNumberIterator() {
  yield 1;
  yield 2;
}
function *createColorIterator() {
  yield "red";
  yield "green";
}
function *createCombinedIterator() {
  yield *createNumberIterator();
  yield *createColorIterator();
  yield true;
}
var iterator = createCombinedIterator();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 'red', done: false }
console.log(iterator.next()); // { value: 'green', done: false }
console.log(iterator.next()); // { value: true, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// 完成复杂任务
function *createNumberIterator() {
  yield 1;
  yield 2;
  return 3;
}
function *createRepeatingIterator(count) {
  for (let i = 0; i < count; i++) {
    yield "repeat"
  }
}
function *createCombinedIterator() {
  let result = yield *createNumberIterator();
  yield *createRepeatingIterator(result);
}
var iterator = createCombinedIterator();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 'repeat', done: false }
console.log(iterator.next()); // { value: 'repeat', done: false }
console.log(iterator.next()); // { value: 'repeat', done: false }
console.log(iterator.next()); // { value: undefined, done: true }

/* 异步任务的执行 */

let fs = require("fs");
fs.readFile("config.json", function(err, contents) {
  if (err) {
    throw err;
  }
  console.log("Done.");
});

/* 简单任务执行器 */

function run(taskDef) {
  // 创建一个无使用限制的迭代器
  let task = taskDef();
  // 开始执行任务
  let result = task.next();
  //循环使用next()的函数
  function step() {
    // 如果任务未完成，则继续进行
    if (!result.done) {
      result = task.next();
      step();
    }
  }
  // 开始迭代
  step();
}
run(function *() {
  console.log(1);
  yield;
  console.log(2);
  yield;
  console.log(3);
});

/* 向任务执行器传递数据 */

function run(taskDef) {
  // 创建一个无使用限制的迭代器
  let task = taskDef();
  // 开始执行任务
  let result = task.next();
  //循环使用next()的函数
  function step() {
    // 如果任务未完成，则继续进行
    if (!result.done) {
      result = task.next(result.value);
      step();
    }
  }
  // 开始迭代
  step();
}
run(function *() {
  let value = yield 1;
  console.log(value); // 1
  value = yield value + 3;
  console.log(value); // 4
});

/* 异步任务执行器 */

function run(taskDef) {
  // 创建一个无使用限制的迭代器
  let task = taskDef();
  // 开始执行任务
  let result = task.next();
  //循环使用next()的函数
  function step() {
    // 如果任务未完成，则继续进行
    if (!result.done) {
      if (typeof result.value === "function") {
        result.value(function(err, data) {
          if (err) {
            result = task.throw(err);
          }
          result = task.next(data);
          step();
        });
      } else {
        result = task.next(result.value);
        step();
      }
    }
  }
  // 开始迭代
  step();
}