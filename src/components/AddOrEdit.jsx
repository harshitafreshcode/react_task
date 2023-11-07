/* eslint-disable react/prop-types */
import { Container, Box, Typography, TextField, Grid, Button } from '@mui/material';
import { useEffect, useState } from 'react';

// constants
const initialEmployee = {
    firstName: '',
    lastName: '',
    email: '',
};

const API_BASE_URL = 'https://reqres.in/api/users';


const AddOrEdit = ({ actionType }) => {
    const [employee, setEmployee] = useState(initialEmployee);

    const onChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    useEffect(() => {
        console.log('employee: ', employee);
    }, [employee]);

    const addEmployee = async () => {
        try {
            const savedEmployee = await fetch(API_BASE_URL, {
                method: 'POST',
                body: JSON.stringify({
                    first_name: employee.firstName,
                    last_name: employee.firstName,
                    email: employee.email,
                })
            });

            const newEmployee = await savedEmployee.json();
            console.log('add employee: ', newEmployee);
        } catch (error) {
            console.log('Error while adding employee: ', error);
        }
    }

    const handleSubmit = () => {
        if (actionType === 'Add') {
            addEmployee();
        } else {
            // edit employee
        }
    }

    return (
        <Container maxWidth="xl">
            <Box sx={{ marginTop: '50px', marginBottom: '20px' }}>
                <Typography>{actionType} Employee</Typography>
            </Box>

            <Box component="form" noValidate autoComplete='off' sx={{ maxWidth: '500px', }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="firstName"
                            value={employee.firstName}
                            onChange={onChange}
                            label="First Name"
                            variant='outlined'
                            sx={{ width: '100%' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            name="lastName"
                            value={employee.lastName}
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
                <Button variant='contained' onClick={() => handleSubmit()}>{actionType} Employee</Button>
            </Box>

        </Container>
    )
};

export default AddOrEdit;
