import React, { useEffect, useState} from 'react';
import EnhancedTableHead from '../../components/EnhancedTableHead';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {getAllPatterns} from '../../components/httpsreq/patterns';
import { Button } from '@mui/material';
import DataForm from '../../components/DataForm';
import './patternEdit.css'


const EnhancedTable = () => { 
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [patterns, setPatterns] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [newPatternChange, setnewPatternChange] = useState(false);


    const loadPatterns = async ()  => {
        try {
        const patternsRequest = await  getAllPatterns();
        setPatterns(patternsRequest);
        
        } catch(e) {
        console.log('error message : ', e);
        }
    };
    
    useEffect(() => {
    let timer = setTimeout((e) => {
        loadPatterns(e);
        setLoading(true);
    }, 1000)
    return () => { clearTimeout(timer)
    }
    }, [patterns]);
        

    const deletePattern =  (id) => {
    if(selected.length > 0) {
        const response = axios.delete(`http://localhost:8080/api/v1/pattern/patterndelete/${id}` , {
        method: 'DELETE'
    })
    if (response.status === 200) {
        const pattern = patterns.find((onePattern) => onePattern.id === id);
        const index = patterns.indexOf(pattern);
        
        const newPatternArray = [...patterns];
        newPatternArray.splice(index, 1);
        
        setPatterns(newPatternArray);
    }
    } 
    }

    const onClickpatternEditForm = () => {
        setnewPatternChange(true);
    }

    const onClickpatternEditFormClose = () =>  {
        setnewPatternChange(false);
    }
    const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
        return 0;
    }
            
    const getComparator= (order, orderBy) => {
        return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }
            
    const  stableSort = (array, comparator) => {
    const stabilizedThis =array.map((el, id) => [el, id]);
        stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
        return order;
    }
        return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    } 


    const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
    if (event.target.checked) {
    const newSelecteds = patterns.map((n) => n.id);
    setSelected(newSelecteds);
        return;
    }
        setSelected([]);
    };


    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        }
            setSelected(newSelected);
        };
    

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };

    const handleChangeDense = (event) => {
    setDense(event.target.checked);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;
    
    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - patterns.length) : 0;

    return (
        <div>
            {!loading && 
            <p>It's loading</p>
            }
            {loading &&
                <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mt: 2, mx: 'auto' }}>
                    <Toolbar>
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            variant='h6'
                            id='tableTitle'
                            component='div'
                            >
                            Pattern Editor
                        </Typography>
                    </Toolbar>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 700 }}
                        aria-labelledby='tableTitle'
                        size={dense ? 'small' : 'medium'}
                        >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={patterns.length}
                    />
                    <TableBody>
                    {stableSort(patterns, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((pattern, id) => {
                            const isItemSelected = isSelected(id);
                            const labelId = `enhanced-table-checkbox-${id}`;
                        return (
                        <TableRow
                            hover
                            onClick={(event) => handleClick(event, id)}
                            role='checkbox'
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            selected={isItemSelected}
                            key={id}
                        >
                            <TableCell padding='checkbox'>
                                <Checkbox
                                color='primary'
                                checked={isItemSelected}
                                inputProps={{
                                'aria-labelledby': labelId,
                            }}
                            />
                            </TableCell>
                            <TableCell
                                component='th'
                                id={labelId}
                                scope='row'
                                padding='none'
                                align='right'
                              
                            >
                            {pattern.id}
                            </TableCell>
                            <TableCell align='left' key={pattern.name} >{pattern.name}</TableCell>
                            <TableCell align='left' key={pattern.craft}>{pattern.craft}</TableCell>
                            <TableCell align='left' key={pattern.difficulty}>{pattern.difficulty}</TableCell>
                            <TableCell align='right' key={pattern.hookSize} >{pattern.hookSize}</TableCell>
                            <TableCell align='right'>
                                <Tooltip title='Delete'>
                                    <IconButton 
                                        onClick={() => deletePattern(pattern.id)}
                                        selected={isItemSelected}
                                        >  
                                    <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                        );
                        })}
                        {emptyRows > 0 && (
                        <TableRow
                        style={{
                            height: (dense ? 33 : 53) * emptyRows,
                        }}
                        >
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={patterns.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}  
                />
            </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense}/>}
                    label='Dense padding'
                />
                <div className='dataCreate'>
                <Button onClick={onClickpatternEditForm} variant='contained' className='dataformpageButton'>Pattern Create</Button>
                
                </div>
                {newPatternChange ? 
                <div className='dataFormPage'>
                    <DataForm/>
                    <Button 
                    variant='contained' sx={{m: 1 }}
                    onClick={onClickpatternEditFormClose} 
                    className='dataformpageButton'
                    >
                    Pattern Create Closed
                    </Button>
                    </div>
                :null}
            </Box>}
        </div>
    );
}

export default EnhancedTable;