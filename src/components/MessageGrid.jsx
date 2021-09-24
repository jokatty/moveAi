/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({ ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary }));

export default function MessageGrid({ message }) {
  return (
    <Box sx={{ flexGrow: 1 }} style={{ marginTop: '20px', marginBottom: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item style={{ fontSize: '1rem' }}>{message}</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
