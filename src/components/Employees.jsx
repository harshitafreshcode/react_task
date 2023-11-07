import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { addEmployees } from "../store/slices/employees";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";

//_mock
const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Actions'];

// constatns
const API_BASE_URL = 'https://reqres.in/api/users';

const Employees = () => {
    const employees = useSelector((state) => state.employees);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getEmployees = async () => {
        try {
            const response = await fetch(API_BASE_URL);
            const employees = await response.json();
            dispatch(addEmployees(employees.data));
        } catch (error) {
            console.log('Error while fetching the employees: ', error);
        }
    }

    useEffect(() => {
        getEmployees();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container maxWidth="xl">
            <Box sx={{ marginBlock: '50px' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" gutterBottom>Employee Management</Typography>
                    <Button variant="contained" onClick={() => navigate('/add')}>Add Employee</Button>
                </Stack>
            </Box>

            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {headers.map((header) => (
                                    <TableCell key={header}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {employees.map(({ id, first_name, last_name, email }) => (
                                <TableRow key={id}>
                                    <TableCell>{id}</TableCell>
                                    <TableCell>{first_name}</TableCell>
                                    <TableCell>{last_name}</TableCell>
                                    <TableCell>{email}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            <IconButton onClick={() => navigate(`/edit/${id}`)}>
                                                <EditIcon />
                                            </IconButton>

                                            <IconButton>
                                                <DeleteIcon />
                                            </IconButton>

                                            <IconButton onClick={() => navigate(`/view/${id}`)}>
                                                <VisibilityIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    )
}

export default Employees;
