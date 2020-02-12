import React from 'react';

import DateFnsUtils from '@date-io/date-fns';

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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { http, driverListAPI, busCreateAPI } from '../api/api';
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

export default function CreateBus(props) {
	const classes = useStyles();

	const [successOpen, setSuccessOpen] = React.useState(false);
	const successHandleClose = () => {
		setSuccessOpen(false);
	};

	const [failOpen, setFailOpen] = React.useState(false);
	const failHandleClose = () => {
		setFailOpen(false);
	};

	const [name, setName] = React.useState('');
	const [licence, setLicence] = React.useState('');
	const [passengerMax, setPassengerMax] = React.useState(0);
	const [departureTime, setDepartureTime] = React.useState(new Date());
	// ------------ drive ------------------
	const [driveValue, setDriveValue] = React.useState(-1);
	const driveSelectChange = event => {
		setDriveValue(event.target.value);
	};
	
	const [route, setRoute] = React.useState('');
	const [type, setType] = React.useState('');

	const [drivers, setDrivers] = React.useState([]);

	const initData = async () => {
		const driverResp = await http.get(
			driverListAPI,
			{
				headers: {
          Authorization: getToken(),
        }
			});
		
		if (driverResp.data.meta.success) {
			setDrivers(driverResp.data.data);
		}
	};

	const save = async () => {
		const data = {
			'name': name,
			'licence': licence,
			'passengerMax': passengerMax,
			'driverId': driveValue,
			'departureTime': departureTime,
			'route': route,
			'type': type,
		};
		console.log(data);
		const response = await http.post(
			busCreateAPI,
			data,
			{
				headers: {
          Authorization: getToken(),
        }
			});
		
		console.log(response);
		if (response.data.meta.success) {
			setSuccessOpen(true);
			props.handleClose();
		}
		else {
			setFailOpen(true);
		}
		// console.log(data);
	};

  return (
    <div>
      <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition} onEnter={initData}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            	新建班车
            </Typography>
            <Button autoFocus color="inherit" onClick={save}>
              保存
            </Button>
          </Toolbar>
        </AppBar>

				<TextField
					id="outlined-basic"
					label="班车名"
					variant="outlined"
					style={{ marginTop:10 }}
					value={name}
					onChange={ event => setName(event.target.value) }
				/>
				<TextField
					id="outlined-basic"
					label="车牌"
					variant="outlined"
					style={{ marginTop:10 }}
					value={licence}
					onChange={ event => setLicence(event.target.value) }
				/>
				<TextField
					id="outlined-basic"
					label="载客数量"
					variant="outlined"
					type="number"
					style={{ marginTop:10 }}
					value={passengerMax}
					onChange={ event => setPassengerMax(event.target.value) }
				/>

				<FormControl variant="outlined" style={{ marginTop:10 }}>
					<InputLabel id="demo-simple-select-outlined-label">
						司机
					</InputLabel>
					<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={driveValue}
							onChange={driveSelectChange}>
						{drivers.map(driver => (
							<MenuItem key={driver.id} value={driver.id}>{driver.username}</MenuItem>
						))}
        	</Select>
      	</FormControl>

				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<DateTimePicker
					label="发车时间"
					inputVariant="outlined"
					format="yyyy/MM/dd HH:mm"
					style={{ marginTop:10 }}
					value={departureTime}
					onChange={event => setDepartureTime(event.target.value)}
					/>
				</MuiPickersUtilsProvider>
				
				<TextField
					id="outlined-basic"
					label="班车路线"
					variant="outlined"
					style={{ marginTop:10 }}
					value={route}
					onChange={ event => setRoute(event.target.value) }
				/>

				<FormControl variant="outlined" style={{ marginTop:10 }}>
					<InputLabel id="demo-simple-select-outlined-label">
						类型
					</InputLabel>
					<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={type}
							onChange={event => setType(event.target.value)}>
							<MenuItem value="日常班车">日常班车</MenuItem>
							<MenuItem value="加班班车">加班班车</MenuItem>
        	</Select>
      	</FormControl>
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