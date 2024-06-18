import React, { useState } from 'react';
import { Modal, SwipeableDrawer } from '@mui/material';

const SeatModal = ({ seat }) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <h2>/{seat.alias}</h2>
        <div>
          <p className='text-gray text-[0.875rem] '>
            Name: <span className='font-[600] text-gray-light'>{seat.name}</span>
          </p>
        </div>
      </div>
    </Modal>
  )
}

const drawerBleeding = 56;

// :::::::::::::::::::::::: MAIN COMPONENT
const SeatPicker = ({ open, toggleDrawer, seats }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleOnClick = (seat) => {
    setModalData(seat);
    setOpenModal(true);
  }

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
      {openModal && <SeatModal seat={modalData} />}
      <div className='h-[80vh] md:h-[60vh] overflow-x-auto w-full bg-primary shadow-[0_0_2px_4px_rgba(150,150,255,0.2)] '>
        <div className='flex flex-col gap-[2rem] p-[2rem] mx-auto max-w-[60rem] '>
          <h2 className='text-base uppercase font-[600] '>List of available seats</h2>
          <div className='grid grid-cols-[repeat(auto-fill,minmax(3rem,1fr))] gap-[0.875rem] md:gap-[1rem] '>
            {seats.map((seat, index) => (
              <button
                key={index}
                onClick={()=>handleOnClick(seat)}
                className='group flex items-center justify-center text-center h-[3rem] w-[3rem] rounded-[4px] bg-gray/10 hover:bg-gray/20 ease-250 active:bg-white/50 active:text-base hover:scale-[1.01] border-solid border-white/10 border-0 hover:border-[1px] '
              >
                <p className='font-[600] text-gray-light text-[0.875rem] group-hover:text-base ease-250 '>{seat.alias}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
}

export default SeatPicker;
