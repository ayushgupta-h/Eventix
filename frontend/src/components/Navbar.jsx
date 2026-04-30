import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTicketAlt, FaBars, FaTimes } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
  ];

  return (
    <motion.nav
      className="bg-dark-card border-b border-dark-border sticky top-0 z-50 glass-effect"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <FaTicketAlt className="text-3xl text-primary" />
              </motion.div>
              <span className="text-2xl font-bold gradient-text">Eventix</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <motion.span
                  className="text-gray-300 hover:text-primary transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.span>
              </Link>
            ))}

            {user ? (
              <>
                <Link to="/my-bookings">
                  <motion.span
                    className="text-gray-300 hover:text-primary transition-colors"
                    whileHover={{ y: -2 }}
                  >
                    My Bookings
                  </motion.span>
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin">
                    <motion.span
                      className="text-gray-300 hover:text-primary transition-colors"
                      whileHover={{ y: -2 }}
                    >
                      Admin
                    </motion.span>
                  </Link>
                )}
                <motion.button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <motion.button
                    className="text-gray-300 hover:text-primary transition-colors"
                    whileHover={{ y: -2 }}
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-primary"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-dark-hover"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
              >
                <div className="block text-gray-300 hover:text-primary py-2">
                  {link.name}
                </div>
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/my-bookings" onClick={() => setIsOpen(false)}>
                  <div className="block text-gray-300 hover:text-primary py-2">
                    My Bookings
                  </div>
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setIsOpen(false)}>
                    <div className="block text-gray-300 hover:text-primary py-2">
                      Admin
                    </div>
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-red-500 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <div className="block text-gray-300 hover:text-primary py-2">
                    Login
                  </div>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <div className="block text-gray-300 hover:text-primary py-2">
                    Register
                  </div>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
