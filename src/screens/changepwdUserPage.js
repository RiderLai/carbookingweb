/*
 * @Author: Rider
 * @Date: 2020-02-10 21:14:44
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-11 14:28:51
 * @Description: file content
 */
import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { http, userChangePasswordAPI } from '../api/api';
import { getToken } from '../util/token';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ChangePasswordUser(props) {

    console.log(props.id);

    const [successOpen, setSuccessOpen] = React.useState(false);
    const successHandleClose = () => {
      setSuccessOpen(false);
    };

    const [failOpen, setFailOpen] = React.useState(false);
    const failHandleClose = () => {
      setFailOpen(false);
    };

    const [pwd, setPwd] = React.useState("");

    const save = async () => {
      const response = await http.post(
        userChangePasswordAPI + props.id,
        {
          'password': pwd,
        },
        {
          headers: {
            Authorization: getToken(),
          }
        });
      
      if (response.data.meta.success) {
        setSuccessOpen(true);
      }
      else {
        setFailOpen(false);
      }
      props.handleClose();
    };
  
    return (
      <div>
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">修改密码</DialogTitle>
          <DialogContent>
            <DialogContentText>
              修改用户密码
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="密码"
              fullWidth
              valule={pwd}
              onChange={ event => setPwd(event.target.value) }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              退出
            </Button>
            <Button onClick={save} color="primary">
              修改密码
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