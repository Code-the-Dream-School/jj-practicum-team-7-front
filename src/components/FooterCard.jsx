import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const FooterCard = ({
  variant = "landing",
  footerLogo,
}) => {
  // choose spacing/margins depending on variant
  const containerClasses =
    variant === "landing"
      ? "relative mx-12 md:mx-24 py-6 flex flex-col md:flex-row justify-between items-center overflow-visible"
      : "relative py-6 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center overflow-visible";

  return (
    <footer className="mt-6 text-sm w-full relative">
      <div
        className={containerClasses}
        style={{ boxShadow: "0 -4px 6px -4px rgba(0,0,0,0.15)" }}
      >
        {/* Background blobs */}
        <div className="absolute -top-6 -left-6 w-40 h-40 bg-green-400/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>

        {/* Left block */}
        <div className="mb-4 md:mb-0 relative z-10 p-2">
          <strong className="text-green-600">PeerQuests</strong>
          <p className="text-gray-600">
            Tackle challenges with your peers — one day at a time.
          </p>
        </div>

        {/* Center block */}
        <div className="text-center text-gray-700 relative z-10 p-2">
          <h2 className="text-sm font-medium">
            <img src={footerLogo} alt="Logo" className="mx-auto h-8" />
          </h2>
          <p className="text-sm mt-1">
            © Natalia, Darya, Romanna, and Lima
            <br />
            2025
          </p>
        </div>

        {/* Right block */}
        <div className="flex gap-5 text-xl relative z-10 p-2">
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
      </div>
    </footer>
  );
};

export default FooterCard;
