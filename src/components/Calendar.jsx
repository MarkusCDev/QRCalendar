import React, { useState } from "react";
import QRCode from "qrcode.react";

const CalendarEvent = () => {
  const [qrCodeContent, setQRCodeContent] = useState("");
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    customDescription: "",
    date: "",
  });

  const predefinedDescriptions = [
    "Website: https://www.bestbuy.com",
    "Appointment: https://www.bestbuy.com/services/triage/home",
    "Membership: https://www.bestbuy.com/services/planlist",
    "Custom...",
  ];

  const generateQRCode = () => {
    let startTime = "";
    let endTime = "";

    if (eventDetails.date) {
      const [month, day, year] = eventDetails.date.split("/");
      startTime = `${year}${month}${day}T100000`;
      endTime = `${year}${month}${day}T210000`;
    }

    const description =
      eventDetails.description === "Custom..."
        ? eventDetails.customDescription
        : eventDetails.description;

    const icsData = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventDetails.title}
DESCRIPTION:${description}
DTSTART:${startTime}
DTEND:${endTime}
END:VEVENT
END:VCALENDAR
    `.trim();

    const errorCorrectionLevel = "L";
    const qrCodeData = {
      errorCorrectionLevel,
      value: icsData,
    };

    setQRCodeContent(qrCodeData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={eventDetails.title}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Description:</label>
        <select
          name="description"
          value={eventDetails.description}
          onChange={handleInputChange}
        >
          {predefinedDescriptions.map((desc, index) => (
            <option key={index} value={desc}>
              {" "}
              {desc}{" "}
            </option>
          ))}
        </select>
        {eventDetails.description === "Custom..." && (
          <input
            type="text"
            name="customDescription"
            value={eventDetails.customDescription}
            placeholder="Enter custom description"
            onChange={handleInputChange}
          />
        )}
      </div>

      <div>
        <label>Date (MM/DD/YYYY):</label>
        <input
          type="text"
          name="date"
          value={eventDetails.date}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCodeContent && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <QRCode
            value={qrCodeContent.value}
            level={qrCodeContent.errorCorrectionLevel}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarEvent;
