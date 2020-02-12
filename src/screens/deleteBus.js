/*
 * @Author: Rider
 * @Date: 2020-02-11 21:40:46
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-11 21:43:16
 * @Description: file content
 */
import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { http, busDeleteAPI } from '../api/api';
import { getToken } from '../util/token';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DeleteUser(props) {

	console.log(props.id);

	const [successOpen, setSuccessOpen] = React.useState(false);
    const successHandleClose = () => {
      setSuccessOpen(false);
    };

    const [failOpen, setFailOpen] = React.useState(false);
    const failHandleClose = () => {
      setFailOpen(false);
    };

	const del = async () => {
		const response = await http.post(
			busDeleteAPI + props.id,
			{},
			{
				headers: {
					Authorization: getToken(),
				}
			});
		console.log(response);
		if (response.data.meta.success) {
			setSuccessOpen(true);
		}
		else {
			setFailOpen(true);
		}
		props.handleClose();
	};

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"删除"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            是否删除班车！
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            取消
          </Button>
          <Button
						onClick={del}
						style={{color: "#ff3d00"}}
						>
            删除
          </Button>
        </DialogActions>
      </Dialog>
			<Snackbar open={successOpen} autoHideDuration={6000} onClose={successHandleClose}>
        <Alert onClose={successHandleClose} severity="success">
          修改成功
        </Alert>
      </Snackbar>
      <Snackbar open={failOpen} autoHideDuration={6000} onClose={failHandleClose}>
        <Alert onClose={failHandleClose} severity="error">
          修改失败
        </Alert>
      </Snackbar>
    </div>
  );
}