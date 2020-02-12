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

import CreateBus from './createBus';
import UpdateBus from './updateBus';
import DeleteBus from './deleteBus';

import { http, busListAPI } from '../api/api';
import { getToken } from '../util/token';
import { timetrans } from '../util/util';

const columns = [
  { id: 'name', label: '班车名', minWidth: 100 },
  { id: 'driverName', label: '司机名', minWidth: 100 },
  {
    id: 'licence',
    label: '车牌',
    minWidth: 100,
  },
  {
    id: 'passengerMax',
    label: '载客数量',
    minWidth: 100,
	},
	{
    id: 'type',
    label: '班车类型',
    minWidth: 100,
	},
	{
    id: 'route',
    label: '路线',
    minWidth: 100,
	},
	{
    id: 'departureTime',
    label: '发车时间',
    minWidth: 100,
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

function Bus() {

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

	function createData(id, name, driverName, licence, passengerMax, type, route, departureTime) {
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
					style={{color: "#ff3d00"}}
					onClick={() => {
						setOperateID(id);
						setOpenDelete(true);
					}}
					>
					删除
				</Button>
			</div>);
			departureTime = timetrans(departureTime);
		return { id, name, driverName, licence, passengerMax, type, route, departureTime, operate };
	}

	// -------------------rows----------------
	const [rows, setRows] = React.useState([]);
	
	async function fetchData(){
		const response = await http.get(busListAPI, {
			headers: {
				Authorization: getToken(),
			}
		});
		console.log(response);
		if (response.data.meta.success) {
			let data = response.data.data.map(datum => createData(datum.id,
				datum.name, datum.driverName, datum.licence, datum.passengerMax,
				datum.type, datum.route, datum.departureTime));
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
					新增班车
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
													{value}
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

			<UpdateBus
				open={openUpdate}
				handleClose={() => {
					setOpenUpdate(false);
					fetchData();
				}}
				id={operateID}
			/>

			<CreateBus
				open={openCreate}
				handleClose={ () => {
					setOpenCreate(false);
					fetchData();
				}}
			/>

			<DeleteBus
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

export default Bus;
