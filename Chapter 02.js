/***********************
 * 第二章 字符串和正则表达式
 ***********************/

/* UTF-16码位 */

// 与书上不同，实际运行时正确处理了这种情况
let text = "吉";
console.log(text.length); // 2
console.log(/^.$/.test(text)); // false
console.log(text.charAt(0)); // ""
console.log(text.charAt(1)); // ""
console.log(text.charCodeAt(0)); // 55362
console.log(text.charCodeAt(1)); // 52271
 
/* codePointAt()方法 */
 
let text = "吉a";
console.log(text.charCodeAt(0)); // 55362
console.log(text.charCodeAt(1)); // 55362
console.log(text.charCodeAt(2)); // 55362
console.log(text.codePointAt(0)); // 55362
console.log(text.codePointAt(1)); // 55362
console.log(text.codePointAt(2)); // 55362