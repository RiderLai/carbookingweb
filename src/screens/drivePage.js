import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import CreateUser from './createUser';
import UpdateUser from './updateUser';
import ChangePwdUser from './changepwdUserPage';
import DeleteUser from './deleteUserPage';

import { http, userListAPI } from '../api/api';
import { getToken } from '../util/token';

const columns = [
  { id: 'useraccount', label: '用户账户', minWidth: 100 },
  { id: 'username', label: '名字', minWidth: 100 },
  {
    id: 'phone',
    label: '电话',
    minWidth: 100,
  },
  {
    id: 'address',
    label: '地址',
    minWidth: 170,
	},
	{
    id: 'operate',
    label: '操作',
    minWidth: 170,
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function DriveUser() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

	// -------------------update create---------------
	const [openCreate, setOpenCreate] = React.useState(false);
	const [openUpdate, setOpenUpdate] = React.useState(false);
	const [openPwd, setOpenPwd] = React.useState(false);
	const [openDelete, setOpenDelete] = React.useState(false);
	const [operateID, setOperateID] = React.useState(-1);

	function createData(id, useraccount, username, phone, address) {
		let operate = (
			<div>
				<Button
					color="primary"
					onClick={() => {
						setOperateID(id);
						setOpenUpdate(true);
					}}>
					更新
				</Button>
				<Button
					style={{color: "#4caf50"}}
					onClick={() => {
						setOperateID(id);
						setOpenPwd(true);
					}}
					>
					修改密码
				</Button>
				<Button
					style={{color: "#ff3d00"}}
					onClick={() => {
						setOperateID(id);
						setOpenDelete(true);
					}}
					>
					删除
				</Button>
			</div>);
		return { id, useraccount, username, phone, address, operate };
	}

	// -------------------rows----------------
	const [rows, setRows] = React.useState([]);
	
	async function fetchData(){
		const response = await http.get(userListAPI + '1', {
			headers: {
				Authorization: getToken(),
			}
		});
		console.log(response);
		if (response.data.meta.success) {
			let data = response.data.data.map(datum => createData(datum.userid,
				datum.useraccount, datum.username, datum.phone, datum.adress));
			setRows(data);
		}
	}

  React.useEffect( () => {
    fetchData();
  }, []);

  return (
		<div>
			<Button
				variant="contained"
				color="primary"
				style={{marginBottom: 10}}
				onClick={() => setOpenCreate(true)}>
					新增用户
			</Button>
			<Paper className={classes.root}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map(column => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
										{columns.map(column => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format && typeof value === 'number' ? column.format(value) : value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
			<UpdateUser
				open={openUpdate}
				handleClose={() => {
					setOpenUpdate(false);
					fetchData();
				}}
				id={operateID}
			/>

			<CreateUser
				open={openCreate}
				handleClose={ () => {
					setOpenCreate(false);
					fetchData();
				}}
				usertype={1}
			/>

			<ChangePwdUser
				open={openPwd}
				handleClose={ () => {
					setOpenPwd(false);
				}}
				id={operateID}
			/>

			<DeleteUser
				open={openDelete}
				handleClose={ () => {
					setOpenDelete(false);
					fetchData();
				}}
				id={operateID}
			/>
		</div>
  );
}

export default DriveUser;