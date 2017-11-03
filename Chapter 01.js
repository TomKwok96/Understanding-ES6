/************** 
 * 第一章 块级作用域绑定 
 **************/

/* var声明以及变量提升（Hoisting）机制 */

function getValue(condition) {
  if (condition) {
    var value = "blue";
    
    // 其它代码
    
    return value;
  } else {
    // 此处可访问value，其值为undefined
    return null;
  }
  // 此处可访问value，其值为undefined
}

/* 块级声明 */

// let声明

function getValue(condition) {
  if (condition) {
    let value = "blue";
    
    // 其它代码
    
    return value;
  } else {
    // 变量value在此处不存在
    return null;
  }
  // 变量value在此处不存在
}

// 禁止重声明

var count = 30;
let count = 40; // 会抛出语法错误

var count = 30;
if (condition) {
  
  // 不会抛出错误
  let count = 40;
  
  // 更多代码
}

// const常量

const maxItems = 30;
const name; // 语法错误，常量未初始化

if (condition) {
  const maxItems = 5;
  
  // 更多代码
  
}
// 此处无法访问maxItems

var message = "Hello!";
let age = 25;
// 这两条语句都会抛出错误
const message = "Goodbye!";
const age = 30;

const maxItems = 5;
maxItems = 6; // 抛出语法错误，无法更改常量的值

const person = {
  name = "Nickolas"
};
person.name = "Greg"; // 可以修改对象属性的值
person = {
  name: "Greg"
}; // 抛出语法错误，不允许修改绑定，但允许修改绑定的值

// 临时死区（Temporal Dead Zone）

if (condition) {
  console.log(typeof of value); // 引用错误
  let value = "blue";
}

console.log(typeof value); // "undefined"
if (condition) {
  let value = "blue";
}

// 循环中的块级作用域绑定

for (var i = 0; i < 10; i++) {
  process(item[i]);
}
console.log(i); // 在这里可以访问变量i，10

for (let i = 0; i < 10; i++) {
  process(items[i]);
}
console.log(i); // 这里不可以访问，抛出一个错误

// 循环中的函数

var funcs = [];
for (var i = 0; i < 10; i++) {
  funcs.push(function() {
    console.log(i);
  });
}
funcs.forEach(function(func) {
  func(); // 循环输出10次10
});

var funcs = [];
for (var i = 0; i < 10; i++) {
    funcs.push((function(value) {
        return function() {
            console.log(value);
        }
    }(i)))
}
funcs.forEach(function(func) {
    func(); // 输出[0...9]
});

// 循环中的let声明

var funcs = [];
for (let i = 0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    })
}
funcs.forEach(function(func) {
    func(); // 输出[0...9]
});

var funcs = [];
var object = {
    a: true,
    b: true,
    c: true
};
for (let key in object) {
    funcs.push(function() {
        console.log(key);
    });
}
funcs.forEach(function(func) {
    func(); // 输出a，b，c
});

// 循环中的const声明

var funcs = [];

for (const i = 0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
} // 若在声明后不会修改该变量的值，则可以使用const声明

var funcs = [];
var object = {
    a: true,
    b: true,
    c: true
};
for (const key in object) {
    funcs.push(function() {
        console.log(key);
    });
}
funcs.forEach(function(func) {
    func();
}); // 输出a，b和c，在for-in和for-in循环中使用const时的行为与使用let一致

/* 全局块作用域绑定 */

// 在浏览器中，会覆盖以前的RegExp和ncz
var RegExp = "Hello!";
console.log(window.RegExp); // "Hello!"
var ncz = "Hi!";
console.log(window.ncz); // "Hi!"

// 希望在全局对象下定义变量，仍然可以使用var，常用于跨frame或window访问代码
let RegExp = "Hello!";
console.log(RegExp); // "Hello!"
console.log(Window.RegExp == RegExp); // false
const ncz = "Hi!";
console.log(ncz);
console.log("ncz" in window) // false