import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 text-center max-w-md w-full animate-fade-in">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3159/3159066.png"
          alt="Thank you"
          className="w-24 h-24 mx-auto mb-4 drop-shadow"
        />
        <h1 className="text-3xl font-bold text-blue-700 mb-2">
          Thank You!
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          We appreciate your feedback. It helps us improve and grow!
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
