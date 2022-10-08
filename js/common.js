
/**
 * 查找dom元素
 * @param {*} selector  元素类名
 * @returns 
 */
function $(selector){
    return document.querySelector(selector);
}

/**
 * 查找所有dom元素
 * @param {*} selector   
 * @returns 
 */
function $$ (selector){
    return document.querySelectorAll(selector)
}

/**
 * 创建dom元素
 * @param {*} tagName    创建元素名
 * @returns 
 */
function $$$(tagName){
    return document.createElement(tagName)
}