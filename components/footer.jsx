import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1f0036] text-white py-12">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center space-y-8">
        {/* Logo/Brand Name */}
        <div className="text-2xl font-bold gradient-title">
          <span>BrainWave AI</span>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center space-x-6">
          <Link href="/about" className="text-sm text-gray-400 hover:text-violet-500 transition">
            About Us
          </Link>
          <Link href="/features" className="text-sm text-gray-400 hover:text-violet-500 transition">
            Features
          </Link>
          <Link href="/pricing" className="text-sm text-gray-400 hover:text-violet-500 transition">
            Pricing
          </Link>
          <Link href="/contact" className="text-sm text-gray-400 hover:text-violet-500 transition">
            Contact
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mt-6">
          <a href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-violet-500 transition">
            Twitter
          </a>
          <a href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-violet-500 transition">
            Facebook
          </a>
          <a href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-violet-500 transition">
            LinkedIn
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} Workflow Automator. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
