import { useParams, useNavigate } from "react-router-dom";
import doctors from "../data/doctors.json";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const storedAppointments = localStorage.getItem("appointments");
    const allAppointments = storedAppointments ? JSON.parse(storedAppointments) : [];
    const matchedFromStorage = allAppointments.find((doc) => doc.regNumber === id);

    const found = doctors.find((doc) => doc.regNumber === id) || matchedFromStorage;
    setDoctor(found);
  }, [id]);

  const [appointments, setAppointments] = useState(() => {
    const stored = localStorage.getItem("appointments");
    return stored ? JSON.parse(stored) : [];
  });

  const alreadyBooked = doctor && appointments.some((appt) => appt.regNumber === doctor.regNumber);

  const handleBook = () => {
    if (alreadyBooked) {
      toast.error("❌ You have already booked this doctor.");
      return;
    }

    const updatedAppointments = [...appointments, doctor];
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);

    toast.success(`✅ Appointment scheduled for Dr. ${doctor.name} successfully.`);

    navigate("/bookings");
  };

  if (!doctor) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Doctor Not Found</h2>
        <p className="text-gray-700 mb-4">
          The registration number you entered <span className="font-semibold text-blue-600">({id})</span> does not match any doctor in our system.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition cursor-pointer"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const isAvailableToday = doctor.availability.includes(today);

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayIndex = new Date().getDay();
  let nextAvailable = null;
  for (let i = 1; i < 7; i++) {
    const checkDay = weekDays[(todayIndex + i) % 7];
    if (doctor.availability.includes(checkDay)) {
      nextAvailable = checkDay;
      break;
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="bg-gray-50 mt-6 mb-6 rounded-xl p-6 shadow-sm space-y-4 text-center">
        <h2 className="text-3xl font-bold">Doctor’s Profile Details</h2>
        <p className="text-gray-500 font-bold max-w-2xl mx-auto mt-2 justify-between">
          {doctor.education} - {doctor.speciality}
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row gap-6 items-start">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-44 h-44 rounded-xl object-cover mt-12"
        />

        <div className="flex-1 space-y-2 text-gray-700">
          <h3 className="text-2xl font-bold">{doctor.name}</h3>
          <p>{doctor.education}</p>
          <p>{doctor.speciality}</p>
          <p>
            <strong>Working at</strong> <br />
            {doctor.workplace}
          </p>
          <div className="w-full border-t border-dashed border-black my-2"></div>
          <p>
            <strong>Reg No:</strong> {doctor.regNumber}
          </p>
          <div className="w-full border-t border-dashed border-black my-2"></div>

          <div className="flex items-center gap-2 flex-wrap">
            <strong>Availability:</strong>
            {doctor.availability.map((day, idx) => (
              <span
                key={idx}
                className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full"
              >
                {day}
              </span>
            ))}
          </div>

          <p className="text-lg">
            <strong>Consultation Fee:</strong>{" "}
            <span className="text-blue-600 font-semibold">
              Taka : {doctor.fee}
            </span>{" "}
            <span className="text-sm text-gray-500">
              (incl. Vat){" "}
              <span className="text-blue-600">Per Consultation</span>
            </span>
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <div className="bg-gray-50 mt-6 rounded-xl p-6 shadow-sm space-y-4">
        <div className="text-center font-extrabold text-2xl">
          <h4>Book an Appointment</h4>
        </div>
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">Availability</h4>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isAvailableToday
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {isAvailableToday
              ? "Doctor Available Today"
              : `Not Available Today`}
          </span>
        </div>

        {!isAvailableToday && (
          <div className="text-blue-600 text-sm font-medium">
            📅 Next available day: <strong>{nextAvailable}</strong>
          </div>
        )}
        <div className="w-full border-t border-dashed border-black my-2"></div>

        <div className="text-yellow-700 font-medium text-[10px] bg-yellow-50 px-4 py-3 rounded-full flex items-center gap-2 border border-yellow-300">
          ⚠️ Due to high patient volume, we are currently accepting appointments
          for today only. We appreciate your understanding and cooperation.
        </div>
        <div className="w-full border-t border-0 border-black my-2"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-sm">
          {weekDays.map((day, idx) => {
            const isToday = day === today;
            const isAvailable = doctor.availability.includes(day);
            return (
              <div
                key={idx}
                className={`px-3 py-2 rounded-xl font-medium ${
                  isAvailable
                    ? isToday
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-400 line-through"
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>

        <button
          onClick={handleBook}
          disabled={!isAvailableToday}
          className={`w-full text-white text-lg py-3 rounded-full transition ${
            isAvailableToday
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isAvailableToday
            ? "Book Appointment Now"
            : "Booking Unavailable Today"}
        </button>
      </div>
    </div>
  );
};

export default DoctorDetails;
