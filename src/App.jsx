import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Box, FormHelperText } from '@mui/material';
import infor from '../sample-data.json';

import IconBxsPencil from './assets/pen.jsx'
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye';

const App = () => {
  const [formData, setFormData] = useState({ firstname: '', lastname: '', gender: '', score: '' });
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(infor);
  const [editState, setEditState] = useState(false);
  const [editID, setEditID] = useState(0);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.firstname = formData.firstname ? "" : "First name is required";
    tempErrors.lastname = formData.lastname ? "" : "Last name is required";
    tempErrors.gender = formData.gender ? "" : "Gender is required";
    tempErrors.score = formData.score ? "" : "Score is required";
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
      const formattedScore = parseFloat(formData.score).toFixed(2); 
      setData([...data, { ...formData, score: formattedScore }]);
      setFormData({ firstname: '', lastname: '', gender: '', score: '' });
      setErrors({});
    }
  };


  const handleCancel = () => {
    setFormData({ firstname: '', lastname: '', gender: '', score: '' });
    setErrors({})
    setEditState(false)
  };

  const edit = (firstname, lastname, gender, score , id) => {
    setFormData({ firstname: firstname, lastname: lastname, gender: gender, score: score });
    setEditState(true)
    setEditID(id)
    
  }
  
  const handleEdit = () => {
    setData(prevData =>
      prevData.map(item =>
        
        item.id === editID ? { ...formData, score: parseFloat(formData.score).toFixed(2)} : item
        
      )
    ); 
    setEditState(false)
    setFormData({ firstname: '', lastname: '', gender: '', score: '' });
  }

  return (
    <Box p={3}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8} container spacing={8} justifyContent="center">
          <Grid item xs={5}>
            <FormControl fullWidth error={Boolean(errors.firstname)}>
              <TextField
                label="First name"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                error={Boolean(errors.firstname)}
                helperText={errors.firstname}
              />
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth error={Boolean(errors.lastname)}>
              <TextField
                label="Last name"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                error={Boolean(errors.lastname)}
                helperText={errors.lastname}
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
                <MenuItem value="">‎</MenuItem>
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
            <Button variant="contained" fullWidth onClick={editState ? handleEdit : handleSubmit}>{editState ? "Edit": "Add"}</Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined" fullWidth onClick={handleCancel}>Cancel</Button>
          </Grid>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '6%' }}>No.</TableCell>
              <TableCell style={{ width: '5%' }}></TableCell>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell onClick={() => edit(row.firstname, row.lastname, row.gender, row.score, row.id)}>
                  
                  <IconBxsPencil />
                
                </TableCell>
                <TableCell>{row.firstname}</TableCell>
                <TableCell>{row.lastname}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{typeof row.score === 'number' ? row.score.toFixed(2) : row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default App;
