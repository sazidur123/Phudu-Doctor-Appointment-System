import { useState } from "react";
import doctors from "../data/doctors.json";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

const Home = () => {
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter((doc) => {
    const keyword = search.toLowerCase();
    return (
      doc.name.toLowerCase().includes(keyword) ||
      doc.speciality.toLowerCase().includes(keyword) ||
      doc.designation.toLowerCase().includes(keyword)
    );
  });

  const visibleDoctors = showAll
    ? filteredDoctors
    : filteredDoctors.slice(0, 6);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl mb-12  border-4 border-blue-100 p-6 md:p-8 relative">
        <h1 className="text-5xl sm:text-3xl md:text-4xl font-bold text-black mb-3 text-center">
          Dependable Care, Backed by Trusted <br /> Professionals.
        </h1>
        <p className="text-[16px] text-gray-700 text-center mb-6 font-medium sm:text-base">
          Our platform connects you with verified, experienced doctors across
          various specialties — all at your convenience. Whether it's a <br />{" "}
          routine checkup or urgent consultation, book appointments in minutes
          and receive quality care you can trust.
        </p>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search doctor by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* Banner Images */}
        <div className="flex justify-center items-center">
          <img
            src="https://i.ibb.co.com/gbn5Krm2/banner-img-1.png"
            alt="doc1"
            className="w-full sm:w-[90%] md:w-[70%] lg:w-[578px] h-auto object-cover rounded-xl shadow-lg"
          />
          <img
            src="https://i.ibb.co.com/gMmQm7n9/Whats-App-Image-2025-04-21-at-00-01-00-02b7a419.jpg"
            alt="doc2"
            className="hidden lg:block w-full lg:w-[578px] h-auto object-cover rounded-xl shadow-lg ml-6"
          />
        </div>
      </div>

      {/* Doctors Section */}
      <div className="text-center mb-6">
        <h2 className="text-[40px] sm:text-2xl font-semibold text-gray-800">
          Our Best Doctors
        </h2>
        <p className="text-[16px] sm:text-base text-gray-500">
          Our platform connects you with verified, experienced doctors across
          various specialties — all at your convenience. Whether it's a <br />{" "}
          routine checkup or urgent consultation, book appointments in minutes
          and receive quality care you can trust.
        </p>
      </div>

      {visibleDoctors.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleDoctors.map((doctor) => {
              const today = new Date().toLocaleDateString("en-US", {
                weekday: "long",
              });
              const isAvailableToday = doctor.availability.includes(today);

              return (
                <div
                  key={doctor.id}
                  className="bg-white shadow-md p-4 rounded-xl flex flex-col items-center text-center relative"
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-44 h-44 rounded-xl sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover  mb-4"
                  />
                  <div className="flex gap-3">
                    {!isAvailableToday ? (
                      <span className=" top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Unavailable
                      </span>
                    ) : (
                      <span className="  top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Available Today
                      </span>
                    )}
                    <p className="text-sm px-2 py-1 rounded-full bg-gray-200 text-black">
                      {doctor.experience}
                    </p>
                  </div>

                  <h3 className="sm:text-xl text-2xl font-extrabold text-[#0F0F0F]">
                    {doctor.name}
                  </h3>
                  <div className="flex gap-1 text-[18px] font-medium text-[#0F0F0F]">
                    <p className="text-sm text-black">{doctor.education} - </p>
                    <p className="text-sm text-black">{doctor.speciality}</p>
                  </div>
                  <div className="w-full border-t border-dashed border-black my-2"></div>
                  <div className="flex items-center gap-2 text-[18px] font-medium text-[#0F0F0F] justify-center">
                    <button>+</button>
                    Reg No : {doctor.regNumber}
                  </div>
                  <Link
                    to={`/doctors/${doctor.regNumber}`}
                    className="mt-3 text-sm text-blue-500 border-1
                     bg-white px-20 py-1 rounded-full hover:bg-blue-700 hover:text-white border-blue-500"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Toggle Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-white bg-blue-500 px-6 py-2 rounded-full border border-transparent hover:border-blue-500 hover:bg-white hover:text-blue-500 transition"
            >
              {showAll ? "Show Less Doctors" : "View All Doctors"}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center mt-6 text-red-500">
          No doctors found for this search.
        </div>
      )}

      {/* Success Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {[
          {
            icon: "https://i.ibb.co.com/PvZgCJtc/success-doctor.png",
            count: 250,
            suffix: "+",
            label: "Doctors",
          },
          {
            icon: "https://i.ibb.co.com/xq11y3yy/success-review.png",
            count: 1200,
            suffix: "+",
            label: "Appointments",
          },
          {
            icon: "https://i.ibb.co.com/Rp0WH4tQ/success-patients.png",
            count: 800,
            suffix: "+",
            label: "Satisfied Patients",
          },
          {
            icon: "https://i.ibb.co.com/Fq0p5TFj/success-staffs.png",
            count: 50,
            suffix: "+",
            label: "Total Staffs",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white shadow p-4 rounded-xl text-center"
          >
            <img src={item.icon} alt="icon" className="mx-auto w-8 h-8 mb-2" />
            <h2 className="text-lg sm:text-xl font-bold text-blue-600">
              <CountUp end={item.count} duration={2} suffix={item.suffix} />
            </h2>
            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
