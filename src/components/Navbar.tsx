
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Accommodations", path: "/listings" },
    { name: "Transport", path: "/transport" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-serif font-medium tracking-wide"
            onClick={closeMenu}
          >
            <span className={isScrolled ? "text-foreground" : "text-white"}>
              Stay<span className="text-gold">Beyond</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium text-sm tracking-wide transition-all ${
                  isScrolled
                    ? isActive(link.path)
                      ? "text-gold"
                      : "text-foreground hover:text-gold"
                    : isActive(link.path)
                    ? "text-gold"
                    : "text-white hover:text-gold"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/listings"
              className="px-4 py-2 bg-gold hover:bg-gold-dark text-white rounded-md transition-all text-sm font-medium"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X
                className={isScrolled ? "text-foreground" : "text-white"}
                size={24}
              />
            ) : (
              <Menu
                className={isScrolled ? "text-foreground" : "text-white"}
                size={24}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg animate-fade-in-down">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium text-sm py-2 ${
                    isActive(link.path)
                      ? "text-gold"
                      : "text-foreground hover:text-gold"
                  }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/listings"
                className="px-4 py-2 bg-gold hover:bg-gold-dark text-white rounded-md transition-all text-sm font-medium text-center"
                onClick={closeMenu}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
