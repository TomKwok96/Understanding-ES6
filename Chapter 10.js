/*********************
 * 第十章 改进的数组功能
 *********************/
 
/* Array.of()方法 */

let items = Array.of(1, 2);

/* Array.from()方法 */

function translate() {
  return Array.from(arguments, (value) => value + 1);
}
let numbers = translate(1, 2, 3);
console.log(numbers); // [2, 3, 4]

// Array.from()的第三个参数
let helper = {
  diff: 1,
  add(value) {
    return value + this.diff;
  }
};
function translate() {
  return Array.from(arguments, helper.add, helper);
}
let numbers = translate(1, 2, 3);
console.log(numbers); // [2, 3, 4]

/* Array.from()转换可迭代对象 */

let numbers = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
};
let numbers2 = Array.from(numbers, (value) => value + 1);
console.log(numbers2); // [ 2, 3, 4 ]

/* 为所有数组添加的新方法 */

let numbers = [25, 30, 35, 40, 45];
console.log(numbers.find(n => n > 33)); // 35
console.log(numbers.findIndex(n => n > 33)); // 2

numbers.fill(1);
console.log(numbers); // [ 1, 1, 1, 1, 1 ]
numbers.fill(2, 2, 4);
console.log(numbers); // [ 1, 1, 2, 2, 1 ]
numbers.fill(10, 1);
console.log(numbers); // [ 1, 10, 10, 10, 10 ]

numbers.copyWithin(1, 0, 1);
console.log(numbers); // [ 1, 1, 10, 10, 10 ]
numbers.copyWithin(0, 4);
console.log(numbers); // [ 10, 1, 10, 10, 10 ]
