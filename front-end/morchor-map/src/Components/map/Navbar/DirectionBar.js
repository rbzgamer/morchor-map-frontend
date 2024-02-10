import { Box, IconButton, TextField } from "@mui/material"
import SendIcon from "@mui/icons-material/Send";

export const DirectionBar = () => {
    return (
        <div style={{ display: "flex" }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Origin"
            variant="standard"
            size="small"
          />
          <TextField
            id="standard-basic"
            label="Destination"
            variant="standard"
            size="small"
          />
        </Box>
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
        >
          <SendIcon />
        </IconButton>
      </div>
    )
}