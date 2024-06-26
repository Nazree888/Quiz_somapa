import React from 'react'
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Box, FormHelperText } from '@mui/material';

function addData() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', gender: '', score: '' });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.firstName = formData.firstName ? "" : "First name is required";
        tempErrors.lastName = formData.lastName ? "" : "Last name is required";
        tempErrors.gender = formData.gender ? "" : "Gender is required";
        tempErrors.score = formData.score ? "" : "กรุณากรอกคะแนน";
        if (formData.score && isNaN(formData.score)) {
            tempErrors.score = "คะแนนต้องเป็นตัวเลขเท่านั้น";
        } else if (formData.score && (Number(formData.score) < 0)) {
            tempErrors.score = "Minimum is 0";
        } else if (formData.score && (Number(formData.score) > 100)) {
            tempErrors.score = "Maximum is 100";
        }
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = () => {
        if (validate()) {
            const formattedScore = parseFloat(formData.score).toFixed(2); // Convert score to float and format to 2 decimal places
            setData([...data, { ...formData, score: formattedScore }]);
            setFormData({ firstName: '', lastName: '', gender: '', score: '' });
            setErrors({});
        }
    };

    const handleCancel = () => {
        setFormData({ firstName: '', lastName: '', gender: '', score: '' });
        setErrors({});
      };
    
    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={8} container spacing={8} justifyContent="center">
                <Grid item xs={5}>
                    <FormControl fullWidth error={Boolean(errors.firstName)}>
                        <TextField
                            label="First name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            error={Boolean(errors.firstName)}
                            helperText={errors.firstName}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={5}>
                    <FormControl fullWidth error={Boolean(errors.lastName)}>
                        <TextField
                            label="Last name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            error={Boolean(errors.lastName)}
                            helperText={errors.lastName}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item xs={8} container spacing={8} justifyContent="center">
                <Grid item xs={5} style={{ marginTop: 16 }}>
                    <FormControl fullWidth error={Boolean(errors.gender)}>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            labelId="gender-label"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="M">Male</MenuItem>
                            <MenuItem value="F">Female</MenuItem>
                            <MenuItem value="U">Unknown</MenuItem>
                        </Select>
                        {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={5} style={{ marginTop: 16 }}>
                    <FormControl fullWidth error={Boolean(errors.score)}>
                        <TextField
                            label="Score"
                            name="score"
                            value={formData.score}
                            onChange={handleChange}
                            required
                            error={Boolean(errors.score)}
                            helperText={errors.score}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item xs={8} container spacing={2} justifyContent="center">
                <Grid item xs={2}>
                    <Button variant="contained" fullWidth onClick={handleSubmit}>Add</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="outlined" fullWidth onClick={handleCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default addData