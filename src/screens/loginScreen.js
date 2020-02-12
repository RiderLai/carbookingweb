/*
 * @Author: Rider
 * @Date: 2020-02-05 15:27:38
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-11 22:14:31
 * @Description: file content
 */
import React from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { http, loginAPI } from '../api/api';
import { saveToken } from '../util/token';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
		minWidth: 275,
		maxWidth: 500,
		marginTop: 200,
  },
  title: {
    fontSize: 14,
  },
});

function Login() {
	const classes = useStyles();
	const history = useHistory();

	const [warningOpen, setWarningOpen] = React.useState(false);
	const warningHandleClose = () => {
		setWarningOpen(false);
	};

	const [failOpen, setFailOpen] = React.useState(false);
	const failHandleClose = () => {
		setFailOpen(false);
	};

	const goHome = () => {
		history.push('/home');
	};

	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	const submitButtonClick = async () => {
		const response = await http.post(
			loginAPI,
			{
				'password': password,
				'useraccount': username,
			});
		console.log(response);

		if (response.data.meta.success) {
			if (response.data.data.userType === '2') {
				const result = saveToken(response.data.data.token);
				if (result){
					goHome();
				}
				else {
					setWarningOpen(true);
				}
			}
			else {
				setFailOpen(true);
			}
		}
		else {
			setFailOpen(true);
		}
	};

  return (
		<div className='container'>
			<Container maxWidth='sm'>
				<Card className={classes.root}>
					<CardContent
						style={{
							marginLeft: 150,
						}}>
						<Typography className={classes.title} color="textSecondary" gutterBottom>
							登陆
						</Typography>

						<TextField
							id="standard-basic"
							label="用户名"
							value={username}
							onChange={(event) => setUsername(event.target.value)}/>
						<br />
						<TextField
							id="standard-basic"
							label="密码"
							type="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}/>
						
						<br />
						<Button
							variant="contained"
							color="primary"
							onClick={submitButtonClick}
							style={{
								marginTop: 10,
							}}>
							登陆
						</Button>
					</CardContent>
				</Card>
			</Container>
			<Snackbar open={warningOpen} autoHideDuration={6000} onClose={warningHandleClose}>
				<Alert onClose={warningHandleClose} severity="warning">
					请使用火狐浏览器或者谷歌浏览器！
				</Alert>
      </Snackbar>
			<Snackbar open={failOpen} autoHideDuration={6000} onClose={failHandleClose}>
				<Alert onClose={failHandleClose} severity="error">
					登陆失败
				</Alert>
      </Snackbar>
		</div>
  )
}

export default Login;