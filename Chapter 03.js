/************
 * 第三章 函数
 ************/

/* 在ES5中模拟默认参数 */

function makeRequest(url, timeout, callback) {
    timeout = timeout || 2000;
    callback = callback || function() {};

    // 函数的其它部分

} // timeout=0时失效

function makeRequeset(url, timeout, callback) {
    timeout = (typeof timeout !== "undefined") ? timeout : 2000;
    callback = (typeof callback !== "undefined") ? callback: function() {};

    // 函数的其它部分

} // 更加安全，但代码复杂

/* ES6中的默认参数值 */

function makeRequest(url, timeout = 2000, callback = function() {}) {

    // 函数的其它部分

}
makeRequeset("/foo"); // 使用timeout和callback的默认值
makeRequeset("/foo", 500) // 使用callback的默认值
makeRequeset("/foo", 500, function(body) {
    doSomething(body);
}); // 不使用默认值

function makeRequest(url, timeout = 2000, callback) {

    // 函数的其它部分

}
makeRequeset("/foo", undefined, function(body) {
   doSomething(body);
}); // 使用timeout的默认值
makeRequeset("/foo"); // 使用timeout的默认值
makeRequeset("/foo", null, function(body) {
   doSomething(body);
}); // 不使用timeout的默认值

/* 默认参数对arguments对象的影响 */

// 命名参数和arguments对象保持一致
function mixArgs(first, second) {
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
    first = "c";
    second = "d";
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}
mixArgs("a", "b");

// ES5严格模式下
function mixArgs(first, second) {

    "use strict";

    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
    first = "c";
    second = "d";
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}
mixArgs("a", "b");

// ES6非严格模式下
function mixArgs(first, second = "b") {
    console.log(arguments.length);
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
    first = "c";
    second = "d";
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}
mixArgs("a");

/* 默认参数表达式 */

function getValue() {
    return 5;
}
function add(first, second = getValue()) {
    return first + second;
}
console.log(add(1, 1)); // 2
console.log(add(1)); // 6
console.log(add(1)); // 6

// 每次使用默认参数都会改变value的值
let value = 5;
function getValue() {
    return value++;
}
function add(first, second = getValue()) {
    return first + second;
}
console.log(add(1, 1)); // 2
console.log(add(1)); // 6
console.log(add(1)); // 7

// 可以使用先定义的参数作为后定义的参数的默认值
function add(first, second = first) {
    return first + second;
}
console.log(add(1, 1));
console.log(add(1));

function getValue(value) {
    return value + 5;
}
function add(first, second = getValue(first)) {
    return first + second;
}
console.log(add(1, 1)); // 2
console.log(add(1)); // 7

/* ES5中的无命名参数 */

function pick(object) {
    let result = Object.create(null);
    
    for (let i = 1, len = arguments.length; i < len; i++) {
      result[arguments[i]] = object[arguments[i]];
    }
    
    return result;
}
let book = {
  title: "Understanding ES6",
  author: "Nicklas C. Zakes",
  year: 2016
};
let bookData = pick(book, "author", "year");
console.log(bookData.author); // "Nicklas C. Zakes"
console.log(bookData.year); // 2016

/* 不定参数 */

// 函数的length属性不计算不定参数的个数，本pick函数的length为1
function pick(object, ...keys) {
  let result = Object.create(null);
  
  for (let i = 0, len = keys.length; i < len; i++) {
    result[keys[i]] = object[keys[i]];
  }
  return result;
}

/* 不定参数的使用限制 */

// 不定参数后不能有其它命名参数
function pick(object, ...keys, last) {
  let result = Object.create(null);
  
  for (let i = 0, len = keys.length; i < len; i++) {
    result[keys[i]] = object[keys[i]];
  }
  return result;
}

let object = {
  // 语法错误，无法在setter中使用不定参数
  set name(...value) {
    // 执行一些逻辑
  }
};

/* 不定参数对arguments对象的影响 */

// 不论是否使用不定参数，arguments对象都包含所有传入的参数
function checkArgs(...args) {
  console.log(args.length);
  console.log(arguments.length);
  console.log(args[0], arguments[0]);
  console.log(args[1], arguments[1]);
}
checkArgs("a", "b");

/* 增强的Function构造函数 */

var add = new Function("first", "second", "return first + second");
console.log(add(1, 1)); // 2

// 默认参数
var add = new Function("first", "second = first", "return first + second");
console.log(add(1, 1)); // 2
console.log(add(1)); // 2

// 不定参数
var pickFirst = new Function("...args", "return args[0]");
console.log(pickFirst(1, 2)); // 1

/* 展开运算符 */

// JS内建的Math.max()方法接受任意个参数，并返回最大值
let value1 = 25;
let value2 = 50;
console.log(Math.max(value1, value2)); // 50

let values = [25, 50, 75, 100];
console.log(Math.max.apply(Math, values)); // 100

// 混合使用
let values = [25, 50, 75, 100];
console.log(Math.max(...values, 200)); // 200

/* 如何选择合适的名称 */

function doSomething() {
  // 空函数
}
var doAnotherThing = function() {
  // 空函数
};
console.log(doSomething.name); // "doSomething"
console.log(doAnotherThing.name); // "doAnotherThing"

/* name属性的特殊情况 */

var doSomething = function doSomethingElse() {
  // 空函数
};
var person = {
  get firstName() {
    return "Nickolas"
  },
  sayName: function() {
    console.log(this.name);
  }
};
console.log(doSomething.name); // "doSomethingElse"
console.log(person.sayName.name); // "sayName"
console.log(person.firstName.name); // "get fristname"，实际运行为undefined，不清楚原因

// 另外两个有关函数名称的特例
var doSomething = function() {
  // 空函数
};
console.log(doSomething.bind().name); // "bound doSomething"
console.log((new Function()).name); // "anonymous"

/* 明确函数的多重用途 */

function Person(name) {
  this.name = name;
}
var person = new Person("Nickolas"); // Person { name: 'Nickolas' }
var notAPerson = Person("Nickolas"); // undefined
console.log(person);
console.log(notAPerson);

/* 在ES5中判断函数被调用的方法 */

function Person(name) {
  if (this instanceof Person) {
    this.name = name; // 如果通过new关键字来调用
  } else {
    throw new Error("必须通过new关键字来调用Person");
  }
}
var person = new Person("Nickolas");
var notAPerson = Person("Nickolas");


function Person(name) {
  if (this instanceof Person) {
    this.name = name;
  } else {
    throw new Error("必须通过new关键字来调用Person");
  }
}
var person = new Person("Nickolas");
var notAPerson = Person.call(person, "Mickael"); // 有效！

/* 元属性（Metaproperty）new.target */

function Person(name) {
  if (typeof new.target !== "undefined") {
    this.name = name;
  } else {
    throw new Error("必须通过new关键字来调用Person");
  }
}
var person = new Person("Nickolas");
var notAPerson = Person.call(person, "Mickael"); // 抛出错误！

function Person(name) {
  if (typeof new.target === Person) {
    this.name = name;
  } else {
    throw new Error("必须通过new关键字来调用Person");
  }
}
function AnotherPerson(name) {
  Person.call(this, name);
}
var person = new Person("Nickolas");
var anotherPerson = new AnotherPerson("Nickolas"); // 抛出错误！

/* 块级函数 */

"use strict";
if (true) {
  // 在ES5中抛出语法错误，在ES6中不会报错
  function doSomething() {
    // 空函数
  }
}

"use strict";
if (true) {
  console.log(typeof doSomething); // "function"
  function doSomething() {
    // 空函数
  }
  doSomething();
}
console.log(typeof doSomething); // "undefined"

/* 块级函数的使用场景 */

"use strict" 
if (true) {
  console.log(typeof doSomething);
  let doSomething = function() {
    //空函数
  };
  doSomething();
}
console.log(typeof doSomething);

/* 非严格模式下的块级函数 */

// ES6中行为
if (true) {
  console.log(typeof doSomething); // "function"
  function doSomething() {
    // 空函数
  }
  doSomething();
}
console.log(typeof doSomething); // "function"

/* 箭头函数的语法 */

let reflect = value => value;
let sum = (num1, num2) => num1 + num2;
let getName = () =>"Nickolas";
let sum = (num1, nums) => {
  return num1 + num2;
};
let doNothing = () => {};
let getTempItem = id => ({id: id, name: "Temp"});

/* 创建立即执行的函数的表达式 */

let person = function(name) {
  return {
    getName: function() {
      return name;
    }
  };
}("Nickolas");
console.log(person.getName()); // "Nickolas"

let person = ((name) => {
  return {
    getName: function() {
      return name;
    }
  }
})("Nickolas");
console.log(person.getName());

/* 箭头函数没有this绑定 */

let PageHandler = {
  id: "123455",
  init: function() {
    document.addEventListener("click", function(event) {
      this.doSomething(event.type); // 抛出错误，此时this指向ducument
    }, false);
  },
  doSomething: function(type) {
    console.log("Handling " + type + " for " + this.id);
  }
};

// 使用bind()修正
let PageHandler = {
  id: "123455",
  init: function() {
    document.addEventListener("click", (function(event) {
      this.doSomething(event.type);
    }).bind(this), false);
  },
  doSomething: function(type) {
    console.log("Handling " + type + " for " + this.id);
  }
};

let PageHandler = {
  id: "123455",
  init: function() {
    document.addEventListener("click", event => this.doSomething(event.type), false);
  },
  doSomething: function(type) {
    console.log("Handling " + type + " for " + this.id);
  }
};

/* 箭头函数与数组 */

var result = values.sort(function(a, b) {
  return a - b;
});
var result = values.sort((a, b) => a - b); // 简化了代码

/* 箭头函数没有arguments绑定 */

function createArrowFunctionReturnigFirstArg() {
  return () => arguments[0];
}
var arrowFunction = createArrowFunctionReturnigFirstArg(5);
console.log(arrowFunction());

/* 箭头函数的辨识方法 */

var comparator = (a, b) => a - b;
console.log(typeof comparator); // "function"
console.log(comparator instanceof Function); // true

/* 尾调用 */

function doSomething() {
  return doSomethingElse(); // 尾调用
}

/* ES6中的尾调用优化 */

"use strict";
function doSomething() {
  // 优化后
  return doSomethingElse();
}

"use strict";
function doSomething() {
  // 无法优化，无返回
  doSomethingElse();
}

"use strict";
function doSomething() {
  // 无法优化，必须在返回值后添加其它操作
  return 1 + doSomethingElse();
}

"use strict";
function doSomething() {
  // 无法优化，调用不在尾部
  var result = doSomethingElse();
  return result;
}

"use strict";
function doSomething() {
  var num = 1;
  var func = () => num;
  // 无法优化，该函数是一个闭包
  return func();
}

/* 如何使用尾调用优化 */

function factorial(n) {
  if (n <= 1) {
    return 1;
  } else {
    // 无法优化，必须在返回后执行惩罚操作
    return n * factorial(n - 1);
  }
}

function factorial(n, p = 1) {
  if (n <= 1) {
    return 1 * p;
  } else {
    let result = n * p;
    // 优化后
    return factorial(n - 1, result);
  }
}