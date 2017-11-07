/**********************
 * 第十三章 用模块封装代码
 **********************/
 
/* 导出的基本语法 */

// 导出数据
export var color = "red";
export let name = "Nickolas";
export const magicNumber = 7;
// 导出函数
export function sum(num1, num2) {
  return num1 + num2;
}
// 导出类
export class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }
}
// 这个函数是私有的
function substract(num1, num2) {
  return num1 - num2;
}
// 定义一个函数
export function multiply(num1, num2) {
  return num1 * num2;
}
// export multiply; // babel报错

/* 导入的基本语法 */

import {identifier1, identifier2} from "./example.js";

/* 导入单个绑定 */

import {sum} from "./example.js";

/* 导入多个绑定 */

import {sum multiply} from "./example.js";

/* 导入整个模块 */

// 导入一切
import * as example from "./example.js";

/* 导入绑定的一个微妙怪异之处 */

export var name = "Nickolas";
export function setName(newName) {
  name = newName;
}
import {name, setName} from "./example.js";
console.log(name); // "Nickolas"
setName("Greg");
console.log(name); // "Greg"
name = "Nickolas"; // 抛出错误

/* 导入和导出时重命名 */

// 导出
function sum(num1, num2) {
  return num1 + num2;
}
export {sum as add};
import {add} from "./example.js";

// 导入
import {add as sum} from "./example.js";
console.log(typeof add); // "undefined"
console.log(sum(1, 2)); // 3

/* 导出默认值 */

export default function(num1, num2) {
  return num1 + num2;
}

function sum(num1, num2) {
  return num1 + num2;
}
export default sum;

function sum(num1, num2) {
  return num1 + num2;
}
export {sum as default};

/* 导入默认值 */

import sum from "./example.js";

import sum, {color} from "./example.js";

import {default as sum, color} from "./example";

/* 重新导出一个绑定 */

import {sum} from "./example.js";
export {sum};

// 同上
export {sum} from "./example.js";

export {sum as add} from "./example.js";

export * from "./example.js";

/* 无绑定导入 */

// 没有export或者import的模块代码
Array.prototype.pushAll = function(items) {
  // items必须为一个数组
  if (!Array.isArray(items)) {
    throw new TypeError("参数必须是一个数组。");
  }
  // 使用内建的push()和展开运算符
  return this.push(...items);
}
import './example.js';