import  React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if(value === 0) history.push("/");
    else if(value === 1) history.push("/moviepage");
    else if(value === 2) history.push("/searchpage")
  }, [value, history]);
 
  
  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          console.log("newValue: ", newValue)
          setValue(newValue);
        }}
        style={{ backgroundColor: "#101010" }}
      >
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Trend"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Movies"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
