import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  PhotoIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookmarkIcon,
  EllipsisHorizontalIcon,
  ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/24/solid";

function BlogsSection() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Badrish Choubey",
      authorRole: "Full Stack Developer",
      avatar: "BC",
      title: "Building Scalable Microservices with Spring Boot",
      content:
        "Microservices architecture has become the go-to solution for building scalable applications. In this post, I'll share my experience building microservices at OneDAO using Spring Boot, JWT authentication, and PostgreSQL...",
      image: null,
      tags: ["Spring Boot", "Microservices", "Backend"],
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      shares: 3,
      liked: false,
      bookmarked: false,
      readTime: "5 min read",
    },
    {
      id: 2,
      author: "Badrish Choubey",
      authorRole: "Full Stack Developer",
      avatar: "BC",
      title: "React Performance Optimization Techniques",
      content:
        "Performance is crucial for modern web applications. Here are some advanced techniques I've used to optimize React apps: lazy loading, code splitting, memoization, and virtual scrolling. Let's dive deep into each...",
      image: null,
      tags: ["React.js", "Performance", "Frontend"],
      timestamp: "1 day ago",
      likes: 45,
      comments: 12,
      shares: 7,
      liked: true,
      bookmarked: true,
      readTime: "8 min read",
    },
    {
      id: 3,
      author: "Badrish Choubey",
      authorRole: "Full Stack Developer",
      avatar: "BC",
      title: "My Journey from Trainer to Full Stack Developer",
      content:
        "Transitioning from a program trainer at Concentrix to a full-stack developer wasn't easy. Here's how I did it, the challenges I faced, and the lessons I learned along the way. If you're thinking about switching careers...",
      image: null,
      tags: ["Career", "Personal Growth", "Story"],
      timestamp: "3 days ago",
      likes: 67,
      comments: 23,
      shares: 15,
      liked: false,
      bookmarked: false,
      readTime: "6 min read",
    },
  ]);

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: posts.length + 1,
        author: "Badrish Choubey",
        authorRole: "Full Stack Developer",
        avatar: "BC",
        title: newPost.title,
        content: newPost.content,
        image: null,
        tags: [],
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        bookmarked: false,
        readTime: "3 min read",
      };
      setPosts([post, ...posts]);
      setNewPost({ title: "", content: "" });
      setShowCreatePost(false);
    }
  };

  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleBookmark = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, bookmarked: !post.bookmarked } : post
      )
    );
  };

  return (
    <div className="col-span-12 lg:col-span-7">
      {/* Create Post Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/80 dark:bg-[#1f252c] rounded-2xl border border-[var(--primary)]/30 shadow-xl p-6 mb-6"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-blue-500 flex items-center justify-center text-white font-bold text-lg">
            BC
          </div>
          <button
            onClick={() => setShowCreatePost(true)}
            className="flex-1 text-left px-4 py-3 bg-[var(--bg)]/50 rounded-full text-[var(--fg)] opacity-60 hover:opacity-100 transition-all"
          >
            What's on your mind, Badrish?
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCreatePost(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-[var(--fg)] hover:bg-[var(--primary)]/10 rounded-lg transition-all"
          >
            <PlusIcon className="w-5 h-5 text-[var(--primary)]" />
            <span className="text-sm font-medium">Write Article</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-[var(--fg)] hover:bg-[var(--primary)]/10 rounded-lg transition-all">
            <PhotoIcon className="w-5 h-5 text-[var(--primary)]" />
            <span className="text-sm font-medium">Add Photo</span>
          </button>
        </div>
      </motion.div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCreatePost(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl backdrop-blur-xl bg-white/90 dark:bg-[#1f252c]/90 rounded-2xl border border-[var(--primary)]/30 shadow-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[var(--fg)]">
                Create Blog Post
              </h3>
              <button
                onClick={() => setShowCreatePost(false)}
                className="w-8 h-8 rounded-full hover:bg-[var(--primary)]/10 flex items-center justify-center transition-all"
              >
                <XMarkIcon className="w-5 h-5 text-[var(--fg)]" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Blog Title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              className="w-full px-4 py-3 mb-4 bg-[var(--bg)]/50 border border-[var(--primary)]/30 rounded-xl text-[var(--fg)] placeholder:text-[var(--fg)]/50 focus:outline-none focus:border-[var(--primary)]"
            />
            <textarea
              placeholder="Write your blog content..."
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              rows={8}
              className="w-full px-4 py-3 mb-4 bg-[var(--bg)]/50 border border-[var(--primary)]/30 rounded-xl text-[var(--fg)] placeholder:text-[var(--fg)]/50 focus:outline-none focus:border-[var(--primary)] resize-none"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCreatePost(false)}
                className="px-6 py-2 border border-[var(--primary)]/30 text-[var(--fg)] rounded-lg hover:bg-[var(--primary)]/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="px-6 py-2 bg-gradient-to-r from-[var(--primary)] to-blue-500 text-white rounded-lg hover:shadow-xl transition-all"
              >
                Publish
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Blog Posts */}
      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="backdrop-blur-xl bg-white/80 dark:bg-[#1f252c] rounded-2xl border border-[var(--primary)]/30 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            {/* Post Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-blue-500 flex items-center justify-center text-white font-bold">
                    {post.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--fg)]">
                      {post.author}
                    </h4>
                    <p className="text-sm text-[var(--fg)] opacity-60">
                      {post.authorRole} • {post.timestamp}
                    </p>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-full hover:bg-[var(--primary)]/10 flex items-center justify-center transition-all">
                  <EllipsisHorizontalIcon className="w-5 h-5 text-[var(--fg)]" />
                </button>
              </div>

              {/* Post Content */}
              <h2 className="text-xl font-bold text-[var(--fg)] mb-2">
                {post.title}
              </h2>
              <p className="text-[var(--fg)] opacity-80 mb-3 line-clamp-3">
                {post.content}
              </p>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-[var(--fg)] opacity-60 mb-4">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>

              <button className="text-[var(--primary)] font-medium text-sm hover:underline">
                Read more →
              </button>
            </div>

            {/* Post Actions */}
            <div className="px-6 py-4 border-t border-[var(--primary)]/20 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 text-[var(--fg)] hover:text-[var(--primary)] transition-all group"
                >
                  {post.liked ? (
                    <HeartIconSolid className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  )}
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-[var(--fg)] hover:text-[var(--primary)] transition-all group">
                  <ChatBubbleLeftIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-[var(--fg)] hover:text-[var(--primary)] transition-all group">
                  <ShareIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{post.shares}</span>
                </button>
              </div>
              <button
                onClick={() => handleBookmark(post.id)}
                className="text-[var(--fg)] hover:text-[var(--primary)] transition-all"
              >
                {post.bookmarked ? (
                  <BookmarkIconSolid className="w-5 h-5 text-[var(--primary)]" />
                ) : (
                  <BookmarkIcon className="w-5 h-5 hover:scale-110 transition-transform" />
                )}
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default BlogsSection;
