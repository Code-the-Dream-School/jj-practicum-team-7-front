import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../assets/logo.svg";

const Landing = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className=" md:px-24">
        <img
          src={logo}
          alt="App Logo"
          className="w-40 h-28 mb-6"
          style={{ clipPath: "inset(0 0 0 2px)" }}
        />
      </header>

      {/* Hero Section */}
      <div className="relative text-white px-12 md:px-24">
        <div className="relative w-full h-[400px]">
          <img
            src="images/hero_img.jpg"
            alt="PeersQuests hero image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-center px-12 md:px-24 ml-4 md:ml-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
            Welcome to PeerQuests
          </h1>
          <p className="mb-5 text-lg text-white">
            Join daily challenges with your peers and build better habits
            together!
          </p>
          <Link
            to="/login"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Go to Login
          </Link>
        </div>
      </div>

      {/* FAQs */}
      <section className="py-8">
        <h2 className="text-2xl font-semibold mb-6 px-12 md:px-24 text-left">
          Getting Started - FAQs
        </h2>

        <div className="px-12 md:px-24">
          <div className="mb-6">
            <p className="text-green-600 font-semibold">Is PeerQuests free?</p>
            <p className="text-gray-600">
              Yes, PeerQuests is completely free to use!
            </p>
          </div>
          <hr className="my-6" />

          <div className="mb-6">
            <p className="text-green-600 font-semibold">
              Can I join multiple challenges?
            </p>
            <p className="text-gray-600">
              Absolutely! You can participate in as many challenges as you like.
            </p>
          </div>
          <hr className="my-6" />

          <div className="mb-6">
            <p className="text-green-600 font-semibold">
              How do I add friends?
            </p>
            <p className="text-gray-600">
              Use the invite option on the Create Challenge screen to add
              friends.
            </p>
          </div>
        </div>
      </section>
      <hr className="my-6 border-black mx-12 md:mx-24" />

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center px-12 md:px-24 py-6 mb-6 text-sm">
        <div className="mb-4 md:mb-0">
          <strong className="text-green-600">PeerQuests</strong>
          <p className="text-gray-600">
            Tackle challenges with your peers — one day at a time.
          </p>
        </div>
        <div className="flex gap-5 text-xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-500"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-700"
          >
            <FaLinkedin />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;




