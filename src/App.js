/*
 * @Author: Rider
 * @Date: 2020-02-03 15:39:45
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-11 22:18:39
 * @Description: file content
 */
import React from "react";
import {
  HashRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

import Login from "./screens/loginScreen";
import Home from "./screens/homeScreen";


export default function () {
  return (
    <Router>
			<Switch>

				<Route exact path='/' >
					<Login />
				</Route>

				<Route exact path='/login' >
					<Login />
				</Route>

				<Route path='/home'>
					<Home />
				</Route>

			</Switch>
		</Router>
  )
}
