import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const allTransactions = () => {
  return (
    <Container maxWidth="xl" sx={{ marginTop: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ marginBottom: 2 }}>
          My Transactions
        </Typography>
        <Button
          size='small'
          variant='contained'
          sx={{ textTransform: "none", background: "orange", fontSize: 18 }}
        // onClick={}
        >
          Add Transaction
        </Button>
      </Box>
      <Box sx={{ height: "100%", width: "100%" }}>

      </Box>
    </Container>
  )
}

export default allTransactions;