import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  Cell,
} from "recharts";
import { useNavigate } from "react-router-dom";

// Triangle bar shape
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = ({ fill, x, y, width, height }) => {
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const generatePeakData = (height) => {
  const data = [];
  for (let i = -10; i <= 10; i++) {
    data.push({
      x: i,
      y: Math.max(height - Math.abs(i) * 100, 0),
    });
  }
  return data;
};

const colors = ["#0088FE", "#FFBB28", "#00C49F", "#FF8042", "#8884d8", "#82ca9d"];

const Bookings = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments);

    const storedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];
    setDoctors(storedDoctors);
  }, []);

  const handleCancel = (id) => {
    const updated = appointments.filter((appt) => appt.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center mt-20 px-4">
        <h2 className="text-2xl font-semibold">
          You have not Booked any Appointments yet
        </h2>
        <p className="text-gray-500 mt-4 max-w-md mx-auto">
          Our platform connects you with verified, experienced doctors across
          various specialities – all at your convenience.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition cursor-pointer"
        >
          Book an Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      {/* Triangle Bar Chart */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow mb-10">
        <div className="w-full h-[300px] sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={appointments}
              margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="fee"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {appointments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Area Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {doctors.map((doc, index) => (
          <div key={doc.id} className="bg-white rounded-xl shadow p-4 text-center">
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={generatePeakData(Number(doc.fee))}>
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="y"
                    stroke={colors[index % colors.length]}
                    fill={colors[index % colors.length]}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
              />
              <p className="font-semibold">{doc.name}</p>
              <p className="text-sm text-gray-500">{doc.speciality}</p>
              <p className="text-sm text-blue-600 font-medium mt-1">{doc.fee} Taka</p>
            </div>
          </div>
        ))}
      </div>

      {/* Appointments List */}
      <h2 className="text-2xl font-semibold mb-6 text-center">
        My Today Appointments
      </h2>

      <div className="space-y-6 mb-12">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="p-4 sm:p-6 bg-white rounded-xl shadow flex flex-col h-full"
          >
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{appt.name}</h3>
                <p className="text-sm text-gray-600">
                  {appt.education} – {appt.speciality}
                </p>
              </div>
              <div className="text-sm text-gray-700">
                <p>
                  Appointment Fee: <strong>{appt.fee} Taka</strong> + VAT
                </p>
              </div>
            </div>

            <div className="mt-auto pt-4 text-center">
              <button
                onClick={() => handleCancel(appt.id)}
                className="w-full sm:w-auto text-red-500 border border-[1px] sm:border-2 border-red-500 rounded-full hover:bg-red-50 transition font-semibold text-sm sm:text-base px-4 sm:px-[116px] py-2"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
