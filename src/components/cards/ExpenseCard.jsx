import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

import { COMMON_CARD_CHIP_CSS, COMMON_CARD_CSS } from "../../constants";
import { getFormattedDate } from "../../helpers";

const ExpenseCard = ({ data, OpenTxnDialog }) => {
  const isIncome = data.type === 3;
  const expensIncomeChipStyles = {
    ...COMMON_CARD_CHIP_CSS,
    background: isIncome ? "#b9f6ca" : "#ff8a80"
  }
  return (
    <Card
      onClick={() => OpenTxnDialog(data)}
      sx={{
        ...COMMON_CARD_CSS,
        borderColor: isIncome ? "#00e676" : "#ff5252"
      }}
    >
      <CardContent sx={{
        height: "100%", width: "100%", padding: "4px 14px",
        "&:last-child": {
          paddingBottom: "8px"
        }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <Typography variant="p" component="div">
              {isIncome ? data.payer : data.payee}
            </Typography>
            {/* WILL ADD THIS IN TXN DESCRIPTION DIALOG  <Typography sx={{ fontSize: 12, maxWidth: "100%" }} color="text.secondary" variant="p" component="div">
              {data.description}
            </Typography> */}
            <Typography variant="p" component="div" sx={{ maxWidth: "100%" }}>
              {data.tags.map((val) => (
                <Chip key={val.id} label={val.name} color={isIncome ? "success" : "primary"} size="small" sx={expensIncomeChipStyles} />
              ))}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
            <Typography variant="p" component="div" sx={{ color: isIncome ? "#00e676" : "#ff5252" }}>
              {isIncome ? '+' : '-'} ₹{data.amount}
            </Typography>
            {/* WILL ADD THIS IN TXN DESCRIPTION DIALOG <Typography sx={{ fontSize: { xs: 12, md: 14 } }} variant="p" component="div">
              {data.account.name}
            </Typography> */}
            <Typography sx={{ fontSize: 12 }} color="text.secondary" variant="p" component="div">
              {getFormattedDate(data.dateTime)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card >
  );
};

export default ExpenseCard;
