"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/badrish-choubey-368857ba/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/Badrish96",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "Email",
      url: "mailto:badrishchoubeystar@gmail.com",
      icon: <EnvelopeIcon className="w-5 h-5" />,
    },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Full Stack Development",
    "Mobile App Development",
    "Backend API Design",
    "Cloud Deployment",
    "Technical Consulting",
    "Team Leadership",
  ];

  return (
    <footer className="relative overflow-hidden bg-[#1A1E23]">
      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Badrish <span className="text-[#0ea5a1]">Choubey</span>
            </h3>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Full Stack Developer with 4+ years of experience building scalable
              web and mobile applications. Passionate about creating innovative
              solutions that make a difference.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-[#0ea5a1]/30 flex items-center justify-center text-white hover:bg-[#0ea5a1] hover:text-white hover:border-[#0ea5a1] transition-all duration-300 shadow-lg"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#0ea5a1] transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#0ea5a1] group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="text-gray-300 text-sm flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5a1]"></span>
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <EnvelopeIcon className="w-5 h-5 text-[#0ea5a1] flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:badrishchoubeystar@gmail.com"
                  className="hover:text-[#0ea5a1] transition-colors break-all"
                >
                  badrishchoubeystar@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <PhoneIcon className="w-5 h-5 text-[#0ea5a1] flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+919540840758"
                  className="hover:text-[#0ea5a1] transition-colors"
                >
                  +91 9540840758
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <MapPinIcon className="w-5 h-5 text-[#0ea5a1] flex-shrink-0 mt-0.5" />
                <span>Gurugram, Haryana, India</span>
              </li>
            </ul>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-6 px-6 py-2.5 bg-gradient-to-r from-[#0ea5a1] to-[#12F7D6] text-white rounded-full font-semibold text-sm hover:shadow-xl transition-all duration-300"
            >
              Let's Work Together
            </motion.a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} Badrish Choubey. All rights reserved. Built with
            <span className="text-[#0ea5a1]"> Next.js</span> &
            <span className="text-[#0ea5a1]"> Tailwind CSS</span>
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              className="text-gray-400 hover:text-[#0ea5a1] transition-all text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-gray-400 hover:text-[#0ea5a1] transition-all text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-[#0ea5a1] to-[#12F7D6] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUpIcon className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}