import { Box, Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';

const allAccounts = [
  {
    id: 1,
    name: "SBI",
    balance: 111523,
    createdAt: Date()
  },
  {
    id: 2,
    name: "HDFC",
    balance: 99923,
    createdAt: Date()
  },
  {
    id: 3,
    name: "ICICI",
    balance: 14523,
    createdAt: Date()
  },
  {
    id: 4,
    name: "Paytm Wallet",
    balance: 523,
    createdAt: Date()
  }
];

function ManageAccounts() {
  return (
    <Container maxWidth="xl" sx={{ marginTop: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ marginBottom: 2 }}>
          My Accounts
        </Typography>
        <Button variant='contained' sx={{ textTransform: "none" }}>Add Account</Button>
      </Box>
      <Box sx={{ height: "100%", width: "100%" }}>
        {allAccounts.map((val, idx) => (
          <Card sx={{ margin: "15px 0", display: "flex", justifyContent: "space-between" }} key={idx}>
            <CardContent>
              <Typography variant="h5" component="div">
                {val.name}
              </Typography>
              <Typography sx={{ fontSize: 18, letterSpacing: 0.8 }} color="text.secondary" variant="p" component="div">
                Balance:&nbsp;
                <Typography variant='p' sx={{ display: "inline", letterSpacing: 0.8 }} color="text.primary">
                  ₹{val.balance}
                </Typography>
              </Typography>
              <Typography component='span' sx={{ fontSize: 12 }} color="text.secondary">
                Date Added: {getFormattedDate(val.createdAt)}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
              <Button size="small">Edit</Button>
              <Button size="small">Delete</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  )
}

const getFormattedDate = (s) => {
  let d = new Date(s);
  return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
};

export default ManageAccounts;