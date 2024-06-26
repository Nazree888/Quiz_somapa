import React from 'react'
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Box, FormHelperText } from '@mui/material';
function tableData() {

    const [data, setData] = useState([
        { firstName: 'Wilbur', lastName: 'Rogers', gender: 'M', score: 80.00 },
        { firstName: 'Lorenzo', lastName: 'Underwood', gender: 'M', score: 40.50 },
        { firstName: 'Pearl', lastName: 'Johnson', gender: 'F', score: 60.45 },
        { firstName: 'Russell', lastName: 'Patrick', gender: 70.50 },
        { firstName: 'Nicolas', lastName: 'Watts', gender: 'M', score: 34.25 },
        { firstName: 'Anny', lastName: 'Bates', gender: 'F', score: 74.50 },
      ]);
  return (

    <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
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
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{typeof row.score === 'number' ? row.score.toFixed(2) : row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  )
}

export default tableData