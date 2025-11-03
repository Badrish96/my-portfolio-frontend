import React from 'react'
import { motion } from "framer-motion";
import { FireIcon } from '@heroicons/react/24/outline';
function TopBlogs() {
 const topBlogs = [
    {
      title: "Building Scalable Microservices with Spring Boot",
      views: "2.3K",
      readTime: "5 min",
    },
    {
      title: "React Performance Optimization Techniques",
      views: "1.8K",
      readTime: "8 min",
    },
    {
      title: "My Journey from Trainer to Full Stack Developer",
      views: "1.5K",
      readTime: "6 min",
    },
    {
      title: "Authentication with JWT and Auth0",
      views: "1.2K",
      readTime: "7 min",
    },
    {
      title: "Building React Native Apps: Best Practices",
      views: "980",
      readTime: "10 min",
    },
  ];

  return (
    <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-6 space-y-6">
              {/* Top Blogs */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="backdrop-blur-xl bg-white/80 dark:bg-[#1f252c] rounded-2xl border border-[var(--primary)]/30 shadow-xl p-6"
              >
                <div className="flex items-center gap-2 mb-6">
                  <FireIcon className="w-6 h-6 text-[var(--primary)]" />
                  <h3 className="text-xl font-bold text-[var(--fg)]">
                    Top Blogs
                  </h3>
                </div>
                <div className="space-y-4">
                  {topBlogs.map((blog, index) => (
                    <div
                      key={index}
                      className="group cursor-pointer hover:bg-[var(--primary)]/5 p-3 rounded-xl transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl font-bold text-[var(--primary)] opacity-30">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-[var(--fg)] mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                            {blog.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-[var(--fg)] opacity-60">
                            <span>{blog.views} views</span>
                            <span>•</span>
                            <span>{blog.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="backdrop-blur-xl bg-white/80 dark:bg-[#1f252c] rounded-2xl border border-[var(--primary)]/30 shadow-xl p-6"
              >
                <h3 className="text-lg font-bold text-[var(--fg)] mb-4">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React.js",
                    "Spring Boot",
                    "Node.js",
                    "AWS",
                    "MongoDB",
                    "TypeScript",
                    "Next.js",
                    "Microservices",
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 cursor-pointer hover:bg-[var(--primary)]/20 transition-all"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
  )
}

export default TopBlogs
