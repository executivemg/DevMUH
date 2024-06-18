import React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';

const drawerBleeding = 56;

const StyledBox = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

// :::::::::::::::::::::::: MAIN COMPONENT
const SeatPicker = ({ open, toggleDrawer, seats }) => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <div className='h-[80vh] md:h-[60vh] w-full bg-primary shadow-[0_0_2px_4px_rgba(150,150,255,0.2)] '>

      </div>
    </SwipeableDrawer>
  );
}

export default SeatPicker;
