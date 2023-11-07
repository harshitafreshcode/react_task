import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployees, deleteEmployee } from "../store/slices/employees";
import { addAlert } from "../store/slices/alerts";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TablePagination from '@mui/material/TablePagination';

//_mock
const headers = ['ID', 'Photo', 'First Name', 'Last Name', 'Email', 'Actions'];

// constatns
const API_BASE_URL = 'https://reqres.in/api/users';

const Employees = () => {
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const employees = useSelector((state) => state.employees);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getEmployees = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}?page=${page + 1}&per_page=${pageSize}`);
            const employees = await response.json();
            dispatch(addEmployees(employees.data));
            setTotal(employees?.total);
        } catch (error) {
            console.log('Error while fetching the employees: ', error);
        }
    }

    useEffect(() => {
        getEmployees();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize]);

    const onDeleteEmployee = async (employeeId) => {
        try {
            await fetch(`${API_BASE_URL}/${employeeId}`, {
                method: 'DELETE',
            });

            dispatch(addAlert({
                severity: 'success',
                message: 'Employee deleted successfully!'
            }));

            dispatch(deleteEmployee(employeeId));
            navigate('/');
        } catch (error) {
            console.log('Error while deleting employee: ', error);
            dispatch(addAlert({
                severity: 'error',
                message: 'Failed to delete employee!'
            }));
        }
    }

    const handleChangePage = (_event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container maxWidth="xl" sx={{ marginBlock: '50px' }}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: '10px', fontWeight: 'bold' }}>Manage Employees</Typography>

            <TableContainer sx={{ border: '1px solid #80808036', borderRadius: '4px', minWidth: '800px', overflowX: 'auto' }}>
                <Box sx={{ marginBlock: '10px', marginInline: '10px' }}>
                    <Stack direction="row" justifyContent="end" alignItems="center">
                        <Button variant="outlined" onClick={() => navigate('/add')}>Add Employee</Button>
                    </Stack>
                </Box>

                <Table size="medium" sx={{ borderBlock: '1px solid #80808036' }}>
                    <TableHead >
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell
                                    key={header}
                                    sx={{
                                        fontWeight: 'bold',
                                        ...(header === 'Actions' && {
                                            width: '100px',
                                            textAlign: 'center'
                                        }),
                                        ...(header === 'ID' && {
                                            width: '15px',
                                            textAlign: 'center'
                                        })
                                    }}
                                >{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {employees.map(({ id, avatar, first_name, last_name, email }) => (
                            <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{id}</TableCell>
                                <TableCell>
                                    <Avatar src={avatar} alt={`${first_name} ${last_name}`} />
                                </TableCell>
                                <TableCell>{first_name}</TableCell>
                                <TableCell>{last_name}</TableCell>
                                <TableCell>{email}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={0.5}>
                                        <IconButton onClick={() => navigate(`/edit/${id}`)}>
                                            <EditIcon sx={{ fontSize: '18px', color: 'black' }} />
                                        </IconButton>

                                        <IconButton onClick={() => onDeleteEmployee(id)}>
                                            <DeleteIcon sx={{ fontSize: '18px', color: 'black' }} />
                                        </IconButton>

                                        <IconButton onClick={() => navigate(`/view/${id}`)}>
                                            <VisibilityIcon sx={{ fontSize: '18px', color: 'black' }} />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Box>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 20, 50, 100]}
                        count={total}
                        rowsPerPage={pageSize}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ border: 'none' }}
                    />
                </Box>
            </TableContainer>
        </Container>
    )
}

export default Employees;
