// import React, { useState } from 'react';
// import { Container, TextField, Button, Box, Typography } from '@mui/material';

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         fetch('http://localhost:5001/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log('Server response:', data); // Log the entire response
//                 if (data.success) {
//                     localStorage.setItem('authToken', data.token);
//                     localStorage.setItem('userId', data.user_id);
//                     window.location.href = '/'; // Redirect on successful login
//                 } else {
//                     console.error('Login failed:', data.message);
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });
//     };


//     return (
//         <Container maxWidth="sm">
//             <Box sx={{ mt: 5, textAlign: 'center' }}>
//                 <Typography variant="h4" gutterBottom>
//                     Login
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
//                     {errorMessage && (
//                         <Typography color="error">{errorMessage}</Typography>
//                     )}
//                     <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
//                         Login
//                     </Button>
//                 </form>
//             </Box>
//         </Container>
//     );
// };

// export default Login;















import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('userId', data.user_id);
                    window.location.href = '/'; // Redirect to home or dashboard after successful login
                } else {
                    setErrorMessage(data.message || 'Login failed.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Login
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
                        Login
                    </Button>
                    <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                        <Grid item>
                            <Link component="button" onClick={() => navigate('/signup')}>
                                Not registered yet? Sign up here
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
