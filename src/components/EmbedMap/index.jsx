"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";

const convertToEmbedLink = (mapLink) => {
  const paramsStart = mapLink.indexOf("/@");
  const paramsEnd = mapLink.indexOf("?");

  if (paramsStart === -1 || paramsEnd === -1) {
    throw new Error("Invalid Google Maps link format.");
  }

  const params = mapLink.substring(paramsStart, paramsEnd);
  const embedBase = "https://www.google.com/maps/embed";
  const embedLink = `${embedBase}${params}?pb=!1m18!1m12!1m3!1d3151.836856509317!2d-87.6216614!3d41.8874455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2ca924587447%3A0x880c1ae8574967ef!2sHyatt%20Regency%20Chicago!5e0!3m2!1sen!2sus!4v1594917101000!5m2!1sen!2sus`;

  return embedLink;
};

const EmbedMap = ({ link }) => {
    const [embedLink, setEmbedLink] = useState("")
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(link, {
          maxRedirects: 0,
          validateStatus: null,
        });
        if (response.status === 301 || response.status === 302) {
          const fullUrl = response.headers.location;
          setEmbedLink(convertToEmbedLink(fullUrl))
        } else {
          console.error("Failed to resolve shortened URL");
        }
      } catch (error) {
        console.error("Error fetching full URL:", error);
      }
    })();
  }, []);

  return (
    <div className="md:w-[50vw] w-[97vw]">
      {embedLink ? (
        <iframe
          src={embedLink}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default EmbedMap;
