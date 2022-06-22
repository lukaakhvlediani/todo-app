import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { addWeather } from "./redux/actions/actions";
import { useDispatch } from "react-redux";

export const Weather = () => {
  const [open, setOpen] = useState(false);
  const [parameters, setParameters] = useState([]);
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weather, setWeather] = useState("");
  const [uv, setUv] = useState("");
  const [wind, setWind] = useState("");
  const [rain, setRain] = useState("");
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState("");
  const [pressure, setPressure] = useState("");
  const [weatherItem, setWeatherItem] = useState([]);
  const [edit, setEdit] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const { weatherArray: getWeather } = useSelector((state) => ({
    weatherArray: state.weatherArray,
  }));
  console.log(getWeather, "THIS IS WEATHER");
  const handleSubmition = async () => {
    setOpen(false);
    console.log("AHAAHAHAHAHA");
    const adding = {
      edit: false,
      city: city,
      _id: Math.floor(Math.random() * 100000),
      weather: weather,
      temperature: temperature,
      uv: uv,
      wind: wind,
      rain: rain,
      humidity: humidity,
      visibility: visibility,
      pressure: pressure,
    };
    try {
      dispatch(addWeather(adding));
    } catch (err) {
      console.log(err);
    }
    if (city.length) {
      setWeatherItem(weatherItem.concat(adding));
      console.log(weatherItem);
    }
  };

  let navigate = useNavigate();
  const getData = () => {
    fetch("db.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson.cities[0].name, "123");
        let arr = Array.from(myJson.cities);
        console.log(arr);
        setData(arr);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const names = [
    "ID",
    "Cities",
    "Weather",
    "Temperature",
    "UV Index",
    "Wind",
    "Rainfall",
    "Humidity",
    "Visibility",
    "Pressure",
  ];
  console.log(city);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setParameters(typeof value === "string" ? value.split(",") : value);
  };

  const handleEditing = (id) => {
    // const index = weatherItem.findIndex((item) => item.id === id);
    // console.log(index)
    weatherItem.edit = !weatherItem.edit;
    setEdit(!edit);
    setOpen(true);
    console.log(edit);
  };

  // const editing = () =>{

  // }

  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Go Back
      </button>
      <div>
        <div>
          <Button align="left" variant="outlined" onClick={handleClickOpen}>
            Create
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Item</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                ref={inputRef}
                id="name"
                label="ID"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                ref={inputRef}
                id="name"
                label="City"
                onChange={(event) => setCity(event.target.value)}
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                ref={inputRef}
                id="name"
                label="Weather"
                onChange={(event) => setWeather(event.target.value)}
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                ref={inputRef}
                margin="dense"
                id="name"
                label="Temperature"
                onChange={(event) => setTemperature(event.target.value)}
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                ref={inputRef}
                label="UV Index"
                onChange={(event) => setUv(event.target.value)}
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                ref={inputRef}
                id="name"
                label="Wind"
                onChange={(event) => setWind(event.target.value)}
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                ref={inputRef}
                id="name"
                label="Rainfall"
                onChange={(event) => setRain(event.target.value)}
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Humidity"
                ref={inputRef}
                onChange={(event) => setHumidity(event.target.value)}
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Visibility"
                ref={inputRef}
                onChange={(event) => setVisibility(event.target.value)}
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                ref={inputRef}
                id="name"
                label="Pressure"
                onChange={(event) => setPressure(event.target.value)}
                type="email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmition}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Cities</TableCell>
                <TableCell align="left">Weather</TableCell>
                <TableCell align="left">Temperature</TableCell>
                <TableCell align="left">UV Index</TableCell>
                <TableCell align="left">Wind</TableCell>
                <TableCell align="left">Rainfall</TableCell>
                <TableCell align="left">Humidity</TableCell>
                <TableCell align="left">Visibility</TableCell>
                <TableCell align="left">Pressure</TableCell>
              </TableRow>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Parameters
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={parameters}
                  onChange={handleChange}
                  input={<OutlinedInput label="Parameters" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={parameters.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableHead>
            <TableBody>
              {data &&
                data.length > 0 &&
                data.map((datas) => (
                  <TableRow
                    key={datas.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {datas.id}
                    </TableCell>
                    <TableCell align="left">{datas.name}</TableCell>
                    <TableCell align="left">{datas.weather}</TableCell>
                    <TableCell align="left">{datas.FEELSLIKE}</TableCell>
                    <TableCell align="left">{datas.UVINDEX}</TableCell>
                    <TableCell align="left">{datas.WIND}</TableCell>
                    <TableCell align="left">{datas.RAINFALL}</TableCell>
                    <TableCell align="left">{datas.HUMIDITY}</TableCell>
                    <TableCell align="left">{datas.VISIBILITY}</TableCell>
                    <TableCell align="left">{datas.PRESSURE}</TableCell>
                  </TableRow>
                ))}
              {getWeather?.map((items, index) => (
                <TableRow
                  onDoubleClick={handleEditing}
                  key={items.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {items.id}
                  </TableCell>
                  <TableCell align="left">{items.city}</TableCell>
                  <TableCell align="left">{items.weather}</TableCell>
                  <TableCell align="left">{items.temperature}</TableCell>
                  <TableCell align="left">{items.uv}</TableCell>
                  <TableCell align="left">{items.wind}</TableCell>
                  <TableCell align="left">{items.rain}</TableCell>
                  <TableCell align="left">{items.humidity}</TableCell>
                  <TableCell align="left">{items.visibility}</TableCell>
                  <TableCell align="left">{items.pressure}</TableCell>
                </TableRow>
              ))}
              {weatherItem.edit ? (
                <div>
                  <Dialog open={open} onClose={handleClose}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                  </Dialog>
                </div>
              ) : (
                <TableRow
                  onDoubleClick={handleEditing}
                  key={weatherItem.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{inputRef.current?.value}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
