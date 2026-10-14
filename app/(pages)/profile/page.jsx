"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { CameraIcon, MapPinIcon, LinkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Header from "../../../components/layout/Header";
import { useLoading } from "../../../components/ui/LoadingProvider";
import { updateUser } from "../../../lib/store/authSlice";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const emptyProfile = { name: "", username: "", email: "", userType: "developer", bio: "", location: "", website: "", avatar: "" };

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const { startLoading, stopLoading } = useLoading();
  const [profile, setProfile] = useState(emptyProfile);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isEditing, setIsEditing] = useState(false);

  const getToken = () => window.localStorage.getItem("authToken") || window.sessionStorage.getItem("authToken");
  const saveUser = (user) => {
    const storage = window.localStorage.getItem("authToken") ? window.localStorage : window.sessionStorage;
    storage.setItem("authUser", JSON.stringify(user));
    dispatch(updateUser(user));
    window.dispatchEvent(new Event("auth-user-updated"));
    setProfile((current) => ({ ...current, ...user }));
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }
    const loadProfile = async () => {
      startLoading();
      try {
        const response = await fetch(`${API_BASE}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Unable to load profile.");
        setProfile((current) => ({ ...current, ...data.user }));
      } catch (error) {
        setMessage({ type: "error", text: error.message });
      } finally {
        stopLoading();
      }
    };
    loadProfile();
  }, [router, startLoading, stopLoading]);

  const handleChange = (event) => setProfile((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSave = async (event) => {
    event.preventDefault();
    setMessage({ type: "", text: "" });
    startLoading();
    try {
      const response = await fetch(`${API_BASE}/api/auth/profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ name: profile.name, username: profile.username, userType: profile.userType, bio: profile.bio, location: profile.location, website: profile.website }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to update profile.");
      saveUser(data.user);
      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully." });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      stopLoading();
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Choose an image up to 5 MB." });
      return;
    }
    const formData = new FormData();
    formData.append("avatar", file);
    setMessage({ type: "", text: "" });
    startLoading();
    try {
      const response = await fetch(`${API_BASE}/api/auth/profile/avatar`, { method: "POST", headers: { Authorization: `Bearer ${getToken()}` }, body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to upload image.");
      saveUser(data.user);
      setMessage({ type: "success", text: "Profile photo updated." });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      stopLoading();
      event.target.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--primary)]">Account</p>
          <h1 className="mt-2 text-4xl font-bold text-[var(--fg)]">Your profile</h1>
          <p className="mt-2 text-[var(--fg)]/70">Keep your professional details up to date.</p>
        </div>

        {message.text && <p role={message.type === "error" ? "alert" : "status"} className={`mb-5 rounded-xl border p-3 text-sm ${message.type === "error" ? "border-red-400/30 bg-red-500/10 text-red-500" : "border-emerald-400/30 bg-emerald-500/10 text-emerald-500"}`}>{message.text}</p>}

        <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
          <aside className="rounded-3xl border border-[var(--primary)]/25 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:bg-[#1f252c]">
            <div className="relative mx-auto h-36 w-36">
              {profile.avatar ? <img src={profile.avatar} alt="Profile" className="h-36 w-36 rounded-full border-4 border-[var(--primary)]/40 object-cover" /> : <UserCircleIcon className="h-36 w-36 text-[var(--primary)]/50" />}
              <button type="button" onClick={() => fileInput.current?.click()} className="absolute bottom-1 right-1 rounded-full bg-[var(--primary)] p-3 text-slate-950 shadow-lg" aria-label="Change profile photo"><CameraIcon className="h-5 w-5" /></button>
              <input ref={fileInput} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
            <h2 className="mt-5 text-center text-xl font-semibold text-[var(--fg)]">{profile.name || "Your name"}</h2>
            <p className="mt-1 text-center text-sm text-[var(--fg)]/60">@{profile.username || "username"}</p>
            <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs text-[var(--fg)]/70">
              <div><strong className="block text-lg text-[var(--fg)]">{profile.stats?.postsCount || 0}</strong>Posts</div>
              <div><strong className="block text-lg text-[var(--fg)]">{profile.stats?.followersCount || 0}</strong>Followers</div>
              <div><strong className="block text-lg text-[var(--fg)]">{profile.stats?.followingCount || 0}</strong>Following</div>
            </div>
          </aside>

          <form onSubmit={handleSave} className="rounded-3xl border border-[var(--primary)]/25 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:bg-[#1f252c] sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4"><h2 className="text-xl font-semibold text-[var(--fg)]">Profile details</h2><button type="button" onClick={() => setIsEditing((value) => !value)} className="rounded-lg border border-[var(--primary)]/30 px-4 py-2 text-sm font-medium text-[var(--primary)]">{isEditing ? "Cancel" : "Edit profile"}</button></div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" value={profile.name} onChange={handleChange} disabled={!isEditing} />
              <Field label="Username" name="username" value={profile.username} onChange={handleChange} disabled={!isEditing} />
              <Field label="Email" name="email" value={profile.email} disabled />
              <label className="block text-sm font-medium text-[var(--fg)]">Account type<select name="userType" value={profile.userType} onChange={handleChange} disabled={!isEditing} className="mt-2 w-full rounded-xl border border-[var(--primary)]/25 bg-[var(--bg)] px-4 py-3 text-[var(--fg)] disabled:opacity-60"><option value="developer">Developer</option><option value="recruiter">Recruiter</option><option value="student">Student</option></select></label>
              <Field label="Location" name="location" value={profile.location} onChange={handleChange} disabled={!isEditing} icon={<MapPinIcon className="h-4 w-4" />} />
              <Field label="Website" name="website" value={profile.website} onChange={handleChange} disabled={!isEditing} icon={<LinkIcon className="h-4 w-4" />} />
            </div>
            <label className="mt-5 block text-sm font-medium text-[var(--fg)]">Bio<textarea name="bio" value={profile.bio} onChange={handleChange} disabled={!isEditing} maxLength={1000} rows={5} className="mt-2 w-full resize-y rounded-xl border border-[var(--primary)]/25 bg-[var(--bg)] px-4 py-3 text-[var(--fg)] disabled:opacity-60" placeholder="Tell people a little about yourself" /></label>
            {isEditing && <button type="submit" className="mt-6 w-full rounded-xl bg-gradient-to-r from-[var(--primary)] to-blue-500 px-4 py-3 font-semibold text-white shadow-lg">Save changes</button>}
          </form>
        </div>
      </main>
    </div>
  );
}

function Field({ label, icon, ...props }) {
  return <label className="block text-sm font-medium text-[var(--fg)]">{label}<span className="relative mt-2 block">{icon && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg)]/50">{icon}</span>}<input {...props} className={`w-full rounded-xl border border-[var(--primary)]/25 bg-[var(--bg)] px-4 py-3 text-[var(--fg)] disabled:opacity-60 ${icon ? "pl-10" : ""}`} /></span></label>;
}
