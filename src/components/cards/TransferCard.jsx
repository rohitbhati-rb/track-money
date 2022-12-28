import { Card, CardContent, Chip, Typography } from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import { getFormattedDate } from "../../helpers";

const TransferCard = ({ data }) => {
  return (
    <Card
      sx={{
        margin: "15px 0",
        display: "flex",
        justifyContent: "space-between",
        borderLeft: "3px solid",
        borderWidth: { sm: "5px" },
        borderColor: "#40c4ff"
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
            {data.description}
          </Typography>
          <Typography variant="h6" component="div" sx={{ color: "#40c4ff" }}>
            ₹{data.amount}
          </Typography>
        </Typography>
        <Typography sx={{ fontSize: 14, display: "flex", alignItems: "center" }} color="text.primary" variant="p" component="div">
          {data.fromAcc.name} <EastIcon fontSize="small" sx={{ margin: "0 10px" }} /> {data.toAcc.name}
        </Typography>
        <Typography component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography component="div" sx={{ maxWidth: "50%" }}>
            {data.tags.map((val) => (
              <Chip key={val.id} label={val.name} size="small" sx={{ background: "#40c4ff", color: "black", marginRight: 1, fontWeight: "bold", fontSize: 10 }} />
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

export default TransferCard;
