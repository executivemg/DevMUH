import { AddEvent, Header } from "@/components";
import React from "react";

export default function Organizer() {
  return (
    <>
      <Header navigate dashboard />
      <div className="mt-10 overflow-x-hidden">
        <AddEvent />
      </div>
    </>
  );
}
