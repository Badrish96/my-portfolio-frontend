"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FireIcon,
  ClockIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookmarkIcon,
  EyeIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowUpIcon as ArrowUpIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/24/solid";
import Header from "../../../components/layout/Header";
import Search from "../../../components/ui/Search";

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("hot");
  const [viewMode, setViewMode] = useState("card"); // card or list
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { id: "hot", name: "Hot", icon: FireIcon },
    { id: "new", name: "New", icon: ClockIcon },
    { id: "top", name: "Top", icon: RocketLaunchIcon },
    { id: "trending", name: "Trending", icon: ChartBarIcon },
  ];

  const categories = [
    "All",
    "Web Development",
    "Mobile Development",
    "Backend",
    "DevOps",
    "Career",
    "Tutorials",
    "News",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogs = [
    {
      id: 1,
      title:
        "Building Production-Ready Microservices with Spring Boot and Kubernetes",
      excerpt:
        "A comprehensive guide to building, deploying, and scaling microservices architecture. Learn about service discovery, load balancing, circuit breakers, and container orchestration with real-world examples from my work at OneDAO.",
      author: "Badrish Choubey",
      authorRole: "Full Stack Developer",
      avatar: "BC",
      category: "Backend",
      tags: ["Spring Boot", "Microservices", "Kubernetes", "Docker"],
      timestamp: "2 hours ago",
      readTime: "12 min read",
      votes: 156,
      comments: 34,
      views: "2.3K",
      thumbnail: null,
      upvoted: false,
      bookmarked: false,
    },
    {
      id: 2,
      title: "React Performance: From Good to Great",
      excerpt:
        "Deep dive into React performance optimization techniques. Covering lazy loading, code splitting, memoization, virtual scrolling, and advanced patterns like useCallback, useMemo, and React.memo with practical benchmarks.",
      author: "Badrish Choubey",
      authorRole: "Full Stack Developer",
      avatar: "BC",
      category: "Web Development",
      tags: ["React.js", "Performance", "Optimization", "Best Practices"],
      timestamp: "5 hours ago",
      readTime: "10 min read",
      votes: 243,
      comments: 56,
      views: "4.1K",
      thumbnail: null,
      upvoted: true,
      bookmarked: true,
    },
    {
      id: 3,
      title:
        "Implementing JWT Authentication with Auth0 in React and Spring Boot",
      excerpt:
        "Step-by-step guide to implementing secure authentication using JWT tokens and Auth0. Includes integration with Google SSO, refresh token handling, and protecting API routes in both frontend and backend.",
      author: "Badrish Choubey",
      authorRole: "Full Stack Developer",
      avatar: "BC",
      category: "Web Development",
      tags: ["JWT", "Auth0", "Security", "Authentication"],
      timestamp: "1 day ago",
      readTime: "15 min read",
      votes: 189,
      comments: 42,
      views: "3.2K",
      thumbnail: null,
      upvoted: false,
      bookmarked: false,
    },
    {
      id: 4,
      title: "My Journey: From Program Trainer to Full Stack Developer",
      excerpt:
        "How I transitioned from training employees at Concentrix to becoming a full-stack developer at Accenture and OneDAO. The challenges, the learning path, resources that helped, and advice for career switchers.",
      author: "Badrish Choubey",
      authorRole: "Full Stack Developer",
      avatar: "BC",
      category: "Career",
      tags: ["Career", "Personal Growth", "Learning", "Story"],
      timestamp: "2 days ago",
      readTime: "8 min read",
      votes: 387,
      comments: 78,
      views: "6.8K",
      thumbnail: null,
      upvoted: false,
      bookmarked: true,
    },
    {
      id: 5,
      title: "Building React Native Apps: Lessons from Production",
      excerpt:
        "Real-world lessons from building React Native apps at scale. Navigation patterns, state management, native module integration, debugging techniques, and deployment strategies for both iOS and Android.",
      author: "Badrish Choubey",
      authorRole: "Full Stack Developer",
      avatar: "BC",
      category: "Mobile Development",
      tags: ["React Native", "Mobile", "iOS", "Android"],
      timestamp: "3 days ago",
      readTime: "11 min read",
      votes: 134,
      comments: 29,
      views: "1.9K",
      thumbnail: null,
      upvoted: false,
      bookmarked: false,
    },
    {
      id: 6,
      title: "PostgreSQL Performance Tuning for High-Traffic Applications",
      excerpt:
        "Advanced PostgreSQL optimization techniques for applications handling 10,000+ concurrent users. Covering indexing strategies, query optimization, connection pooling, and database partitioning.",
      author: "Badrish Choubey",
      authorRole: "Full Stack Developer",
      avatar: "BC",
      category: "Backend",
      tags: ["PostgreSQL", "Database", "Performance", "SQL"],
      timestamp: "4 days ago",
      readTime: "14 min read",
      votes: 201,
      comments: 45,
      views: "2.7K",
      thumbnail: null,
      upvoted: false,
      bookmarked: false,
    },
  ];

  const [blogList, setBlogList] = useState(blogs);

  const handleUpvote = (id) => {
    setBlogList(
      blogList.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              upvoted: !blog.upvoted,
              votes: blog.upvoted ? blog.votes - 1 : blog.votes + 1,
            }
          : blog
      )
    );
  };

  const handleBookmark = (id) => {
    setBlogList(
      blogList.map((blog) =>
        blog.id === id ? { ...blog, bookmarked: !blog.bookmarked } : blog
      )
    );
  };

  const filteredBlogs = blogList.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[var(--bg)] transition-colors duration-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 mt-8 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--fg)] mb-2">
              Developer <span className="text-[var(--primary)]">Blog</span>
            </h1>
            <p className="text-[var(--fg)] opacity-70 text-lg">
              Insights, tutorials, and stories from the world of software
              development
            </p>
          </motion.div>
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar - Filters & Categories */}
            <div className="col-span-12 lg:col-span-3">
              <div className="sticky top-6 space-y-6">
                {/* Sort Filters */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="backdrop-blur-xl bg-white/80 dark:bg-[#1f252c] rounded-2xl border border-[var(--primary)]/30 shadow-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <FunnelIcon className="w-5 h-5 text-[var(--primary)]" />
                    <h3 className="font-bold text-[var(--fg)]">Sort By</h3>
                  </div>
                  <div className="space-y-2">
                    {filters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          activeFilter === filter.id
                            ? "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30"
                            : "text-[var(--fg)] hover:bg-[var(--primary)]/5"
                        }`}
                      >
                        <filter.icon className="w-5 h-5" />
                        <span className="font-medium">{filter.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Categories */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="backdrop-blur-xl bg-white/80 dark:bg-[#1f252c] rounded-2xl border border-[var(--primary)]/30 shadow-xl p-4"
                >
                  <h3 className="font-bold text-[var(--fg)] mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                          selectedCategory === category
                            ? "bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                            : "text-[var(--fg)] hover:bg-[var(--primary)]/5"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Main Content - Blog List */}
            <div className="col-span-12 lg:col-span-9">
              {/* View Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-6"
              >
                <p className="text-[var(--fg)] opacity-70">
                  {filteredBlogs.length} articles found
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("card")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "card"
                        ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                        : "text-[var(--fg)] hover:bg-[var(--primary)]/5"
                    }`}
                  >
                    <Squares2X2Icon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "list"
                        ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                        : "text-[var(--fg)] hover:bg-[var(--primary)]/5"
                    }`}
                  >
                    <ListBulletIcon className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>

              {/* Blog Cards */}
              <div className={viewMode === "card" ? "space-y-6" : "space-y-4"}>
                {filteredBlogs.map((blog, index) => (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group backdrop-blur-xl bg-white/80 dark:bg-[#1f252c] rounded-2xl border border-[var(--primary)]/30 shadow-xl hover:shadow-2xl hover:border-[var(--primary)]/60 transition-all duration-300 overflow-hidden"
                  >
                    <div className={viewMode === "card" ? "p-6" : "flex"}>
                      {/* Upvote Section (Reddit-style) */}
                      <div
                        className={`flex ${
                          viewMode === "card"
                            ? "flex-row items-center gap-4 mb-4"
                            : "flex-col items-center p-4 bg-[var(--bg)]/30"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <button
                            onClick={() => handleUpvote(blog.id)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                              blog.upvoted
                                ? "bg-[var(--primary)]/20 text-[var(--primary)]"
                                : "hover:bg-[var(--primary)]/10 text-[var(--fg)]"
                            }`}
                          >
                            {blog.upvoted ? (
                              <ArrowUpIconSolid className="w-5 h-5" />
                            ) : (
                              <ArrowUpIcon className="w-5 h-5" />
                            )}
                          </button>
                          <span
                            className={`font-bold text-sm ${
                              blog.upvoted
                                ? "text-[var(--primary)]"
                                : "text-[var(--fg)]"
                            }`}
                          >
                            {blog.votes}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1">
                        {viewMode === "card" && (
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                              {blog.avatar}
                            </div>
                            <div>
                              <p className="font-semibold text-[var(--fg)] text-sm">
                                {blog.author}
                              </p>
                              <p className="text-xs text-[var(--fg)] opacity-60">
                                {blog.authorRole}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className={viewMode === "list" ? "p-6 pt-4" : ""}>
                          {/* Category Badge */}
                          <span className="inline-block px-3 py-1 text-xs rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 mb-3">
                            {blog.category}
                          </span>

                          {/* Title */}
                          <h2 className="text-xl font-bold text-[var(--fg)] mb-2 group-hover:text-[var(--primary)] transition-colors cursor-pointer">
                            {blog.title}
                          </h2>

                          {/* Excerpt */}
                          <p
                            className={`text-[var(--fg)] opacity-80 mb-4 ${
                              viewMode === "card"
                                ? "line-clamp-3"
                                : "line-clamp-2"
                            }`}
                          >
                            {blog.excerpt}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {blog.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 text-xs rounded-md bg-[var(--bg)]/50 text-[var(--fg)] opacity-70 hover:opacity-100 cursor-pointer transition-all"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* Meta Info */}
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4 text-sm text-[var(--fg)] opacity-60">
                              <span className="flex items-center gap-1">
                                <ClockIcon className="w-4 h-4" />
                                {blog.readTime}
                              </span>
                              <span className="flex items-center gap-1">
                                <EyeIcon className="w-4 h-4" />
                                {blog.views}
                              </span>
                              <span>{blog.timestamp}</span>
                            </div>

                            <div className="flex items-center gap-3">
                              <button className="flex items-center gap-1 text-[var(--fg)] hover:text-[var(--primary)] transition-all">
                                <ChatBubbleLeftIcon className="w-5 h-5" />
                                <span className="text-sm font-medium">
                                  {blog.comments}
                                </span>
                              </button>
                              <button className="text-[var(--fg)] hover:text-[var(--primary)] transition-all">
                                <ShareIcon className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleBookmark(blog.id)}
                                className="text-[var(--fg)] hover:text-[var(--primary)] transition-all"
                              >
                                {blog.bookmarked ? (
                                  <BookmarkIconSolid className="w-5 h-5 text-[var(--primary)]" />
                                ) : (
                                  <BookmarkIcon className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Load More Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-center"
              >
                <button className="px-8 py-3 bg-gradient-to-r from-[var(--primary)] to-blue-500 text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Load More Articles
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
