import React, { useState } from 'react';
import { Modal, SwipeableDrawer, Backdrop } from '@mui/material';

const cl = console.log.bind(console);

const SeatModal = ({ open, onClose, seat }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: { backgroundColor: 'rgba(255,255,255,0.2)' }, 
      }}
    >
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[25rem] bg-primary p-[1rem] md:p-[2rem] rounded-[8px] ">
        <h2 className="font-[700] text-[2rem] text-white mx-auto w-max mb-[1rem] ">/{seat.alias}</h2>
        <div className="flex flex-col gap-[1rem] w-full">
          <div className='flex gap-[0.5rem] items-center '>
            <p className='text-[11px] font-[600] uppercase text-base'>Name:</p> 
            <span className='text-[14px] text-white/90 capitalize '>{seat.name}</span>
          </div>
          <div className='flex gap-[0.5rem] items-center '>
            <p className='text-[11px] font-[600] uppercase text-base'>Price:</p> 
            <span className='text-[14px] text-white/90 capitalize '>${seat.price}</span>
          </div>
          <div className='flex justify-evenly text-center gap-[1rem] w-full h-max'>
            <div className='flex flex-col text-center items-center '>
              <p className='text-[11px] font-[600] uppercase text-base'>People</p> 
              <span className='text-[14px] text-white/90 capitalize '>{seat.people}</span>
            </div>
            <hr className='h-full w-[1px] bg-gray/20' />
            <div className='flex flex-col text-center items-center '>
              <p className='text-[11px] font-[600] uppercase text-base'>Serveware</p> 
              <span className='text-[14px] text-white/90 capitalize '>{seat.serveware}</span>
            </div>
          </div>
          <div className='flex flex-col gap-[0.5rem] items-center '>
            <p className='text-[11px] font-[600] uppercase text-base'>Description:</p> 
            <span className='text-[14px] text-white/90 capitalize '>{seat.desc}</span>
          </div>
        </div>

        <div className='flex flex-col gap-[1rem] items-center w-full mt-[1rem] '>
          <button
            className='flex items-center justify-center text-center w-full max-w-[15rem] h-[2.875rem] text-[0.875rem] rounded-[32px] bg-base text-white hover:bg-base-hover active:bg-opacity-[70%] ease-200'
          >Buy Ticket</button>
          <button
            onClick={onClose}
            className='flex items-center justify-center text-center w-full max-w-[15rem] h-[2.875rem] text-[0.875rem] rounded-[32px] bg-gray/10 text-white hover:bg-gray/20 border-solid border-[1px] border-white/50 active:bg-opacity-[70%] ease-200'
          >Cancel Purchase</button>
        </div>
      </div>
    </Modal>
  );
};

const drawerBleeding = 56;

// :::::::::::::::::::::::: MAIN COMPONENT
const SeatPicker = ({ open, toggleDrawer, seats }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleOnClick = (seat) => {
    setModalData(seat);
    setOpenModal(true);
    cl('new seat:', modalData);
    cl('seat:', seat);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData(null);
  };

  return (
    <div>
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
        <div className='h-[80vh] md:h-[60vh] overflow-x-auto w-full bg-primary shadow-[0_0_2px_4px_rgba(150,150,255,0.2)]'>
          <div className='flex flex-col gap-[2rem] p-[2rem] mx-auto max-w-[60rem]'>
            <h2 className='text-base uppercase font-[600]'>List of available seats</h2>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(3rem,1fr))] gap-[0.875rem] md:gap-[1rem]'>
              {seats.map((seat, index) => (
                <button
                  key={index}
                  onClick={() => handleOnClick(seat)}
                  className='group flex items-center justify-center text-center h-[3rem] w-[3rem] rounded-[4px] bg-gray/10 hover:bg-gray/20 ease-250 active:bg-white/50 active:text-base hover:scale-[1.01] border-solid border-white/10 border-0 hover:border-[1px]'
                >
                  <p className='font-[600] text-gray-light text-[0.875rem] group-hover:text-base ease-250'>{seat.alias}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </SwipeableDrawer>
      {modalData && (
        <SeatModal open={openModal} onClose={handleCloseModal} seat={modalData} />
      )}
    </div>
  );
};

export default SeatPicker;
