/*
 * @Author: Rider
 * @Date: 2020-02-09 13:06:58
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-11 22:03:01
 * @Description: file content
 */
import axios from 'axios';

export let http = axios.create({
    timeout: 3000,   //超时配置 3秒
    responseType: 'json',   // 响应数据格式
    responseEncoding: 'utf8',  // 响应数据编码
});

export const loginAPI = '/system/login';

export const userListAPI = '/admin/user/';

export const userIdAPI = '/admin/user/select/';

export const userCreateAPI = '/admin/user/add';

export const userUpdateAPI = '/admin/user/update';

export const userChangePasswordAPI = '/admin/updatePassword/';

export const userDeleteAPI = '/admin/user/delete/';

export const busListAPI = '/admin/bus/list';

export const driverListAPI = '/admin/driver/list';

export const busIdAPI = '/buses/';

export const busCreateAPI = '/admin/bus/add';

export const busUpdateAPI = '/admin/bus/update';

export const busDeleteAPI = '/admin/bus/delete/';
