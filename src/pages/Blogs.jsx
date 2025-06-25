import blogs from "../data/question.json";

const Blogs = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-blue-800">
        Todays Blog
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {blogs.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              {item.question}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">{item.ans}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
