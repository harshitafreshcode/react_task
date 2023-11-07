import { Typography, Box, Container } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

const fields = ['id', 'first_name', 'last_name', 'email'];

const ViewEmployee = () => {
    const { employeeId } = useParams();
    const navigate = useNavigate();
    const employees = useSelector((state) => state?.employees);
    const employee = employees?.find(employee => employee?.id === Number(employeeId));


    useEffect(() => {
        if (!employee) {
            navigate('/');
        }
    }, [employeeId]);

    if (!employee) {
        return null;
    }

    return (
        <Container maxWidth="xl">
            <Box sx={{ marginBlock: '50px' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Employee Profile</Typography>
            </Box>
            <Box>
                <Stack direction="row" spacing={3} sx={{ maxWidth: '700px' }} justifyContent="center" alignItems="center">
                    <Avatar sx={{ height: '90px', width: '90px' }} src={employee.avatar} />
                    <Grid container justifyContent="start" alignItems="start" spacing={2}>
                        {fields.map(field => (
                            <Grid item xs={6}>
                                <TextField
                                    name="id"
                                    value={employee[field]}
                                    onChange={() => { }}
                                    variant='outlined'
                                    disabled={true}
                                    size="small"
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Box>
        </Container>
    )
};

export default ViewEmployee;
