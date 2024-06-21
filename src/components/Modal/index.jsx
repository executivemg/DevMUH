"use client";

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { CancelSharp, Mail, Phone } from "@mui/icons-material";
import { Avatar } from "@mui/material";

export default function TransitionsModal({ organizer, contact }) {
  React.useEffect(() => {
    console.log(organizer);
  }, [organizer]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [toggleModal, setToggleModal] = React.useState(false);
  const organizerName = `${organizer?.first_name} ${organizer?.last_name}`;

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`text-white p-2 rounded-lg bg-gradient-to-tr from-[#2C3BFA] to-[#B10C61]`}
      >
        Contact Organier
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div
            className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#fffffff8]  shadow-2xl py-9 ${
              !toggleModal ? "sm:py-12" : "sm:py-3"
            } sm:px-8 px-4 min-w-[95vw] sm:min-w-[730px]`}
          >
            <h1 className="text-4xl font-extrabold">Organizer Details</h1>

            <div className="mt-8 text-2xl flex items-center gap-2">
              <Avatar src={organizer?.image_url} /> {organizerName}
            </div>
            <div className="ml-12">
              <a
                target="_blank"
                href={`mailto:${contact?.for_contact_email}`}
                className="flex gap-1 items-center mt-2"
              >
                <Mail /> {contact?.for_contact_email}
              </a>
              <a
                target="_blank"
                href={`tel:${contact?.for_contact_phone}`}
                className="flex gap-1 items-center mt-2"
              >
                <Phone /> {contact?.for_contact_phone}
              </a>
            </div>

            <button
              className="absolute top-[-5px] right-[-8px]"
              onClick={handleClose}
            >
              <CancelSharp fontSize="large" />
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
