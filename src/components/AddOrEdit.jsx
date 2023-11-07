/* eslint-disable react/prop-types */
import { Container, Box, Typography, TextField, Grid, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAlert } from '../store/slices/alerts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { addNewEmployee } from '../store/slices/employees';

// constants
const initialEmployee = {
    first_name: '',
    last_name: '',
    email: '',
};

const API_BASE_URL = 'https://reqres.in/api/users';
const ACTION_ADD = 'Add';
const ACTION_EDIT = 'Edit';

const AddOrEdit = ({ actionType }) => {
    const [employee, setEmployee] = useState(initialEmployee);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { employeeId } = useParams();
    const employees = useSelector((state) => state.employees);
    const editableEmployee = employees?.find(employee => employee.id === Number(employeeId));


    useEffect(() => {
        if (actionType === ACTION_EDIT) {
            if (!employee) {
                navigate('/');
            }

            setEmployee(editableEmployee);
        }
    }, [actionType]);

    if (!employee && actionType === ACTION_EDIT) {
        return navigate('/');
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const addEmployee = async () => {
        try {
            setLoading(true);
            const savedEmployee = await fetch(API_BASE_URL, {
                method: 'POST',
                body: JSON.stringify(employee)
            });

            const newEmployee = await savedEmployee.json();
            console.log('add employee: ', newEmployee);
            dispatch(addAlert({
                severity: 'success',
                message: 'Employee added successfully!'
            }));
            dispatch(addNewEmployee({
                id: newEmployee?.id,
                avatar: 'https://reqres.in/img/faces/1-image.jpg',
                ...employee
            }));
            navigate('/');
        } catch (error) {
            console.log('Error while adding employee: ', error);
            dispatch(addAlert({
                severity: 'error',
                message: 'Failed to add new employee!'
            }));
        } finally {
            setLoading(false);
        }
    }

    const editEmployee = async () => {
        try {
            setLoading(true);
            const { id, ...employeeData } = employee;
            const savedEmployee = await fetch(`${API_BASE_URL}/${employeeId}`, {
                method: 'PATCH',
                body: JSON.stringify(employeeData)
            });

            const editedEmployee = await savedEmployee.json();
            console.log('edit employee: ', editedEmployee);
            dispatch(addAlert({
                severity: 'success',
                message: 'Employee updated successfully!'
            }));
            navigate('/');
        } catch (error) {
            console.log('Error while editing employee: ', error);
            dispatch(addAlert({
                severity: 'error',
                message: 'Failed to edit employee!'
            }));
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = () => {
        if (actionType === ACTION_ADD) {
            addEmployee();
        } else {
            editEmployee();
        }
    }

    return (
        <Container maxWidth="xl">
            <Box sx={{ marginTop: '50px', marginBottom: '20px' }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{actionType} Employee</Typography>
            </Box>

            <Box component="form" noValidate autoComplete='off' sx={{ maxWidth: '600px', }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="first_name"
                            value={employee.first_name}
                            onChange={onChange}
                            label="First Name"
                            variant='outlined'
                            sx={{ width: '100%' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            name="last_name"
                            value={employee.last_name}
                            onChange={onChange}
                            label="Last Name"
                            variant='outlined'
                            sx={{ width: '100%' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            name="email"
                            value={employee.email}
                            onChange={onChange}
                            label="Email"
                            variant='outlined'
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <Button
                    variant='outlined'
                    onClick={() => handleSubmit()}
                    disabled={!employee?.first_name || !employee?.last_name || !employee?.email || loading}
                    startIcon={loading ? (
                        <CircularProgress size={20} variant='indeterminate' sx={{ color: 'gray' }} />
                    ) : null}
                >{actionType}</Button>
            </Box>
        </Container>
    )
};

export default AddOrEdit;
