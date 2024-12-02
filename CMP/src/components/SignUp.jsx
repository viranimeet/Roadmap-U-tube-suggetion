// // src/components/SignUp.js
// import React, { useState } from 'react';
// import { Container, TextField, Button, Box, Typography, Grid } from '@mui/material';

// const SignUp = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     //   const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     // POST request to your Flask signup route
//     //     fetch('http://localhost:5001/signup', {
//     //       method: 'POST',
//     //       headers: {
//     //         'Content-Type': 'application/json',
//     //       },
//     //       body: JSON.stringify(formData),
//     //     })
//     //       .then((response) => response.json())
//     //       .then((data) => {
//     //         console.log(data);
//     //         // Handle success or errors here
//     //       })
//     //       .catch((error) => console.error('Error:', error));
//     //   };





//     const handleSubmit = (e) => {
//         e.preventDefault();
//         fetch('http://localhost:5001/signup', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 if (data.success) {
//                     console.log('Signup successful:', data);
//                     // Optionally redirect the user after successful signup
//                     window.location.href = '/login'; // Redirect to login
//                 } else {
//                     console.error('Signup failed:', data.message);
//                     // Display error message to the user
//                 }
//             })
//             .catch((error) => console.error('Error:', error));
//     };


//     return (
//         <Container maxWidth="sm">
//             <Box sx={{ mt: 5, textAlign: 'center' }}>
//                 <Typography variant="h4" gutterBottom>
//                     Sign Up
//                 </Typography>
//                 <form onSubmit={handleSubmit}>
//                     <TextField
//                         fullWidth
//                         label="Email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         margin="normal"
//                         variant="outlined"
//                     />
//                     <TextField
//                         fullWidth
//                         label="Password"
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         margin="normal"
//                         variant="outlined"
//                     />
//                     <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
//                         Sign Up
//                     </Button>
//                 </form>
//             </Box>
//         </Container>
//     );
// };

// export default SignUp;





















import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Grid, Link, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5001/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log('Signup successful:', data);
                    setOpenSnackbar(true); // Open the snackbar
                    setTimeout(() => {
                        navigate('/login'); // Redirect to login after a short delay
                    }, 2000); // Redirect after 2 seconds
                } else {
                    setErrorMessage(data.message || 'Signup failed.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    {errorMessage && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {errorMessage}
                        </Typography>
                    )}
                    <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                        <Grid item>
                            <Link component="button" onClick={() => navigate('/login')}>
                                Already have an account? Login here
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Snackbar
                open={openSnackbar}
                onClose={handleSnackbarClose}
                message="User created successfully!"
                autoHideDuration={2000} // Automatically close after 2 seconds
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position the toast
            />
        </Container>
    );
};

export default SignUp;
