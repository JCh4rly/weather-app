import { IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import MoreVertIcon from '@mui/icons-material/LocationOn';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLocation } from "../../slice/weatherSlice";

const LocationSelect = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const locations = useSelector((state: any) => state.weather.locations);
  const currentLocation = useSelector((state: any) => state.weather.location);
  const dispatch = useDispatch();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (item: any) => {
    dispatch(setCurrentLocation(item));
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <>
    <IconButton aria-label="settings" onClick={handleClick}>
      <MoreVertIcon />
    </IconButton>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{'aria-labelledby': 'basic-button'}}
    >
      {locations.map((item: any, index: number) => (
        <MenuItem key={index} selected={item.name === currentLocation?.name} onClick={() => handleSelect(item)}>{ item.name }</MenuItem>
      ))}
    </Menu>
  </>
}

export default LocationSelect;
