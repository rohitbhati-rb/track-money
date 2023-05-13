import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import EastIcon from '@mui/icons-material/East';

import { getFormattedDate } from "../../helpers";
import { COMMON_CARD_CHIP_CSS, COMMON_CARD_CSS } from "../../constants";

const TransferCard = ({ data, OpenTxnDialog }) => {
  return (
    <Card
      onClick={() => OpenTxnDialog(data)}
      sx={COMMON_CARD_CSS}>
      <CardContent sx={{
        height: "100%", width: "100%", padding: "4px 14px",
        "&:last-child": {
          paddingBottom: "8px"
        }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <Typography sx={{ fontSize: 14, display: "flex", alignItems: "center" }} color="text.primary" variant="p" component="div">
              {data.fromAcc.name} <EastIcon fontSize="small" sx={{ margin: "0 10px" }} /> {data.toAcc.name}
            </Typography>
            <Typography component="div" sx={{ maxWidth: "100%" }}>
              {data.tags.map((val) => (
                <Chip key={val.id} label={val.name} size="small" sx={COMMON_CARD_CHIP_CSS} />
              ))}
            </Typography>
            {/* WILL ADD THIS IN TXN DESCRIPTION DIALOG <Typography variant="span" component="p" sx={{ fontSize: 12 }}>
              {data.description}
            </Typography> */}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
            <Typography variant="p" component="div" sx={{ color: "#40c4ff" }}>
              ₹{data.amount}
            </Typography>
            <Typography sx={{ fontSize: 12 }} color="text.secondary" variant="p" component="div">
              {getFormattedDate(data.dateTime)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card >
  );
};

export default TransferCard;
