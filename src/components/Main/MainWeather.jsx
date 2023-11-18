import { Grid, TextField, Typography, Box, Divider } from "@mui/material";

import Sunny from "../../assets/Sunny.gif";
import "./style.css";
import { useContext } from "react";
import { LocationContext } from "../../context/LocationContext";
import { capitalizeFirstWord } from "../../utils/letter/capitalizeFirstWord";
import SearchBox from "../Search/SearchBox";
import { WeatherContext } from "../../context/WeatherContext";
import { UnitContext } from "../../context/UnitContext";
import { convertToCelsius } from "../../utils/unitConversion";
import CloudCondition from "../CloudCondition/CloudCondition";
import RainCondition from "../RainConditon/RainCondition";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import Location from "../Location/Location";
export default function MainWeather() {
  function getDayName(date = new Date(), locale = "en-US") {
    return date.toLocaleDateString(locale, { weekday: "long" });
  }
  const { state } = useContext(LocationContext);
  const weatherConditions = useContext(WeatherContext);
  const { isCelsius, setCelsius } = useContext(UnitContext);
  console.log("Weather conditions", weatherConditions.temperature);
  return (
    <Grid xs={4} item sx={{ borderRight: "2px solid #F5F5F5" }}>
      <Box>
        <SearchBox />
        <Box sx={{ marginTop: 4 }}>
          <WeatherIcon />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h2" component="p">
            <span style={{ fontWeight: "300" }}>
              {isCelsius
                ? convertToCelsius(weatherConditions.temperature)
                : weatherConditions.temperature}
            </span>
            <sup>{isCelsius ? "\u00b0C" : "\u00b0F"}</sup>
          </Typography>
        </Box>
        <Box display="flex" alignItems="baseline" gap={1}>
          <Typography variant="h6" component="p">
            {getDayName()},
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ fontWeight: 200, color: "#9BA4B5" }}
          >
            {new Date().getHours()}:{new Date().getMinutes()}
          </Typography>
        </Box>
        <Divider sx={{ width: "300px", marginY: 3 }} />
        <Box>
          <CloudCondition />
          <RainCondition />
          <Box sx={{width: "300px"}}>
            <Location />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
