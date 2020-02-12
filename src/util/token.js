/*
 * @Author: Rider
 * @Date: 2020-02-09 14:03:47
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-09 14:10:32
 * @Description: file content
 */

const tokenKey = 'token';

export function saveToken(token){
	if (!window.localStorage) {
		alert("浏览器不支持localstorage");
		return false;
	}
  let storage = window.localStorage;
	storage.setItem(tokenKey, token);
	return true;
}

export function getToken(token){
	if (!window.localStorage) {
		alert("浏览器不支持localstorage");
		return false;
	}
  let storage = window.localStorage;
  return storage.getItem(tokenKey);
}