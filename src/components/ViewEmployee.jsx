import { Typography, Box, Stack, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const ViewEmployee = () => {
    const { employeeId } = useParams();
    const employees = useSelector((state) => state.employees);
    const employee = employees?.find(employee => employee.id === Number(employeeId));

    if (!employee) {
        return null;
    }

    return (
        <Container maxWidth="xl">
            <Box sx={{ marginBlock: '50px' }}>
                <Typography variant="h6" gutterBottom>View Employee</Typography>
            </Box>
            <Box>
                <Stack direction="column" spacing={1}>
                    <Typography>
                        ID : {employee.id}
                    </Typography>

                    <Typography>
                        Name : {employee.first_name} {employee.last_name}
                    </Typography>

                    <Typography>
                        Email : {employee.email}
                    </Typography>
                </Stack>
            </Box>
        </Container>
    )
};

export default ViewEmployee;
