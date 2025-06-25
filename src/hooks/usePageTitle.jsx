// src/hooks/usePageTitle.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import doctors from "../data/doctors.json";

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = "Phudu";

    if (path === "/") {
      title = "Phudu | Home";
    } else if (path === "/blogs") {
      title = "Phudu | Blogs";
    } else if (path === "/bookings") {
      title = "Phudu | Booking";
    } else if (path.startsWith("/doctors/")) {
      const doctorId = path.split("/")[2];
      const doctor = doctors.find((doc) => doc.regNumber === doctorId);
      title = doctor
        ? `Phudu | ${doctor.name}`
        : "Phudu | Doctor Not Found";
    } else {
      title = "Phudu | Page Not Found";
    }

    document.title = title;
  }, [location]);
};

export default usePageTitle;
