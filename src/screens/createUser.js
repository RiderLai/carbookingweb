/*
 * @Author: Rider
 * @Date: 2020-02-09 19:40:14
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-10 20:05:16
 * @Description: file content
 */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { http, userCreateAPI } from '../api/api';
import { getToken } from '../util/token';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  }));
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function CreateUser(props) {
	const classes = useStyles();

	const [successOpen, setSuccessOpen] = React.useState(false);
	const successHandleClose = () => {
		setSuccessOpen(false);
	};

	const [failOpen, setFailOpen] = React.useState(false);
	const failHandleClose = () => {
		setFailOpen(false);
	};

	const [account, setAccount] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [name, setName] = React.useState('');
	const [phone, setPhone] = React.useState('');
	const [address, setAddress] = React.useState('');

	const save = async () => {
		const response = await http.post(
			userCreateAPI,
			{
				'useraccount': account,
				'password': password,
				'username': name,
				'phone': phone,
				'address': address,
				'img': address,
				'usertype': props.usertype,
			},
			{
				headers: {
          Authorization: getToken(),
        }
			});
		
		if (response.data.meta.success) {
			setSuccessOpen(true);
			props.handleClose();
		}
		else {
			setFailOpen(true);
		}
	};

  return (
    <div>
      <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            	新建用户
            </Typography>
            <Button autoFocus color="inherit" onClick={save}>
              保存
            </Button>
          </Toolbar>
        </AppBar>

				<TextField
					id="outlined-basic"
					label="账号"
					variant="outlined"
					style={{ marginTop:10 }}
					value={account}
					onChange={ event => setAccount(event.target.value) }
				/>
				<TextField
					id="outlined-basic"
					label="密码"
					variant="outlined"
					style={{ marginTop:10 }}
					value={password}
					onChange={ event => setPassword(event.target.value) }
				/>
				<TextField
					id="outlined-basic"
					label="名字"
					variant="outlined"
					style={{ marginTop:10 }}
					value={name}
					onChange={ event => setName(event.target.value) }
				/>
				<TextField
					id="outlined-basic"
					label="电话"
					variant="outlined"
					style={{ marginTop:10 }}
					value={phone}
					onChange={ event => setPhone(event.target.value) }
				/>
				<TextField
					id="outlined-basic"
					label="地址"
					variant="outlined"
					style={{ marginTop:10 }}
					value={address}
					onChange={ event => setAddress(event.target.value) }
				/>
      </Dialog>
			<Snackbar open={successOpen} autoHideDuration={6000} onClose={successHandleClose}>
				<Alert onClose={successHandleClose} severity="success">
					添加成功
				</Alert>
      </Snackbar>
			<Snackbar open={failOpen} autoHideDuration={6000} onClose={failHandleClose}>
				<Alert onClose={failHandleClose} severity="error">
					添加失败
				</Alert>
      </Snackbar>
    </div>
  );
}