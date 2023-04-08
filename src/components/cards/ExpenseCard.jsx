import { Card, CardContent, Chip, Typography } from "@mui/material";

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
        <Typography component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            {isIncome ? data.payer : data.payee}
          </Typography>
          <Typography variant="h6" component="div" sx={{ color: isIncome ? "#00e676" : "#ff5252" }}>
            {isIncome ? '+' : '-'} ₹{data.amount}
          </Typography>
        </Typography>
        <Typography component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: 12, maxWidth: "50%" }} color="text.secondary" variant="p" component="div">
            {data.description}
          </Typography>
          <Typography sx={{ fontSize: 14 }} variant="p" component="div">
            {data.account.name}
          </Typography>
        </Typography>
        <Typography component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography component="div" sx={{ maxWidth: "50%" }}>
            {data.tags.map((val) => (
              <Chip key={val.id} label={val.name} color={isIncome ? "success" : "primary"} size="small" sx={expensIncomeChipStyles} />
            ))}
          </Typography>
          <Typography sx={{ fontSize: 12, textAlign: "right" }} color="text.secondary" variant="div" component="div">
            {getFormattedDate(data.dateTime)}
          </Typography>
        </Typography>
      </CardContent>
    </Card >
  );
};

export default ExpenseCard;
