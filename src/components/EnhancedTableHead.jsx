import * as React from 'react';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';




const EnhancedTableHead = (props) => {
	const { order, orderBy, onRequestSort } =
		props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	const headCells = [
		{
		id: 'id',
		numeric: true,
		disablePadding: true,
		label: 'ID',
		},
		{
		id: 'name',
		numeric: false,
		disablePadding: false,
		label: 'Name',
		},
		{
		id: 'craft',
		numeric: false,
		disablePadding: false,
		label: 'Craft',
		},
		{
		id: 'difficulty',
		numeric: false,
		disablePadding: false,
		label: 'Difficulty',
		},
		{
		id: 'hookSize',
		numeric: true,
		disablePadding: false,
		label: 'Hook Size',
		},
		{
		id: 'Delete',
		numeric: true,
		disablePadding: false,
		label: 'Delete',
		},
		{
		id: 'Edit',
		numeric: true,
		disablePadding: false,
		label: 'Edit',
		},
	];
  
    return (
      	<TableHead>
			<TableRow>
				<TableCell padding='checkbox'>
				</TableCell>
			{headCells.map((headCells) => (
				<TableCell
					key={headCells.id}
					align={headCells.numeric ? 'right' : 'left'}
					padding={headCells.disablePadding ? 'none' : 'normal'}
					sortDirection={orderBy === headCells.id ? order : false}
				>
				<TableSortLabel
					active={orderBy === headCells.id}
					direction={orderBy === headCells.id ? order : 'asc'}
					onClick={createSortHandler(headCells.id)}
				>
					{headCells.label}
					{orderBy === headCells.id ? (
					<Box component='span' sx={visuallyHidden}>
						{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
					</Box>
					) : null}
				</TableSortLabel>
				</TableCell>
			))}
			</TableRow>
      	</TableHead>
    );
}

EnhancedTableHead.propTypes = {
numSelected: PropTypes.number.isRequired,
onRequestSort: PropTypes.func.isRequired,
onSelectAllClick: PropTypes.func.isRequired,
order: PropTypes.oneOf(['asc', 'desc']).isRequired,
orderBy: PropTypes.string.isRequired,
rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;