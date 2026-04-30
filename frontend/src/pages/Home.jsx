import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRocket, FaTicketAlt, FaUsers, FaShieldAlt } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaTicketAlt />,
      title: 'Easy Booking',
      description: 'Book tickets for your favorite events in just a few clicks',
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure Payments',
      description: 'Your transactions are protected with industry-standard security',
    },
    {
      icon: <FaUsers />,
      title: 'Community',
      description: 'Join thousands of event enthusiasts and discover new experiences',
    },
    {
      icon: <FaRocket />,
      title: 'Instant Confirmation',
      description: 'Get instant booking confirmation and e-tickets via email',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Discover Amazing{' '}
              <span className="gradient-text">Events</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Book tickets for concerts, sports, conferences, and more. Your next
              unforgettable experience is just a click away.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link to="/events">
                <motion.button
                  className="bg-gradient-to-r from-primary to-accent-purple text-white px-8 py-4 rounded-lg text-lg font-semibold"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  Explore Events
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-20 h-20 bg-primary rounded-full opacity-20 blur-xl"
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-32 h-32 bg-accent-purple rounded-full opacity-20 blur-xl"
              animate={{
                y: [0, 30, 0],
                x: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute top-1/2 right-1/4 w-24 h-24 bg-accent-pink rounded-full opacity-20 blur-xl"
              animate={{
                y: [0, -20, 0],
                x: [0, 15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-dark-card">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="gradient-text">Eventix</span>?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-dark-bg p-6 rounded-xl border border-dark-border"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
                }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: index * 0.1 },
                  y: {
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              >
                <motion.div
                  className="text-4xl text-primary mb-4"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary to-accent-purple p-12 rounded-2xl"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users and start booking amazing events today!
            </p>
            <Link to="/register">
              <motion.button
                className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                Create Free Account
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
