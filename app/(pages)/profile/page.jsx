"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { CameraIcon, MapPinIcon, LinkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Header from "../../../components/layout/Header";
import { useLoading } from "../../../components/ui/LoadingProvider";
import { updateUser } from "../../../lib/store/authSlice";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const resumeDefaults = { resumeSummary: "Senior Software Developer with 5+ years building scalable fintech, healthcare, e-commerce, and developer platforms using React, Next.js, TypeScript, Node.js, React Native, and AI-assisted workflows.", experienceDetails: "Senior Software Developer — Programming.com (Client: Appinventiv), Dec 2025–Present\nBuilt loan origination and healthcare workflows using React, Next.js, TypeScript, and Node.js. Implemented OCR/KYC, role-based access, multi-step forms, i18n, and frontend performance improvements.\n\nSenior Software Developer — OneDAO, Jun 2024–Aug 2025\nArchitected a full-stack fundraising platform for startups and investors across web and React Native. Implemented Auth0, JWT, Google OAuth, PostgreSQL schemas, Node.js REST microservices, Azure DevOps CI/CD, and mentoring.\n\nSenior Software Developer — Accenture (Client: Verizon), May 2020–May 2023\nDeveloped high-traffic e-commerce modules for product catalog, checkout, accounts, and order management using Angular, React Native, TypeScript, REST APIs, microservices, and CI/CD.\n\nProgram Ready Trainer II — Concentrix, Jun 2016–May 2020\nDelivered technical training and troubleshooting support for AT&T broadband services with 90%+ customer satisfaction.", projectDetails: "Sammaan Capital — Loan Origination Platform: React, Next.js, TypeScript, React Hook Form, Zod, Node.js, Azure DevOps. Built onboarding, OCR-based KYC, role-based dashboards, and loan processing workflows.\n\nPonteo — Healthcare Platform: React, Next.js, TypeScript, Redux Toolkit, Node.js, REST APIs, Tailwind CSS. Built healthcare workflows and reusable responsive UI modules.\n\nOneDAO — Fintech Fundraising Platform: React, React Native, Node.js, Express.js, PostgreSQL, MongoDB, Auth0, Redis. Built startup and investor workflows, authentication, schemas, REST microservices, and CI/CD.\n\nVerizon E-commerce Platform: Angular, React Native, TypeScript, Node.js, REST APIs, Azure DevOps, AWS, microservices. Built catalog, checkout, account, and order management modules.", githubUrl: "https://github.com/Badrish96" };
const emptyProfile = { name: "Badrish Choubey", username: "Badrish96", email: "badrishchoubeystar@gmail.com", firstName: "Badrish", middleName: "", lastName: "Choubey", mobilePhone: "9540840758", countryCode: "+91", gender: "", nationality: "Indian", dateOfBirth: "", currentSalary: "", currentSalaryCurrency: "INR", expectedSalary: "1600000", expectedSalaryCurrency: "INR", compensationHikeExpectations: "", availableToJoin: "", currentLocation: "Gurugram, Haryana, India", relevantExperienceYears: "5", educationDetails: "", certifications: "", achievements: "", languages: "English, Hindi", workAuthorization: "", noticePeriod: "", linkedinUrl: "https://linkedin.com/in/badrish-choubey-368857ba/", portfolioUrl: "", ...resumeDefaults, userType: "developer", bio: resumeDefaults.resumeSummary, location: "Gurugram, Haryana, India", website: "", avatar: "", skills: ["React.js", "Next.js", "TypeScript", "Node.js", "React Native", "Angular", "REST APIs", "PostgreSQL", "MongoDB", "Azure DevOps"], preferredRoles: ["Frontend Developer", "Senior Software Developer", "Full Stack Developer"], preferredLocations: ["Gurugram", "Bangalore", "Noida", "Delhi NCR"], experienceYears: "9", expectedCompensation: "1600000" };
const resumeProfileDefaults = { name: "Badrish Choubey", username: "Badrish96", firstName: "Badrish", middleName: "N/A", lastName: "Choubey", mobilePhone: "9540840758", countryCode: "+91", gender: "Male", nationality: "Indian", dateOfBirth: "1997-03-02", currentSalary: "1350000", currentSalaryCurrency: "INR", expectedSalary: "1600000", expectedSalaryCurrency: "INR", compensationHikeExpectations: "1600000", availableToJoin: "0", currentLocation: "Gurugram, Haryana, India", relevantExperienceYears: "5", educationDetails: "MCA from Lovely Professional University (LPU)\nBA from Delhi University (DU)", certifications: "Full Stack Developer certification from upGrad", achievements: "Delivered 90%+ customer satisfaction while providing AT&T broadband training and support.\nBuilt enterprise fintech, healthcare, and e-commerce workflows using modern web and mobile technologies.\nImplemented authentication, REST microservices, PostgreSQL schemas, and Azure DevOps CI/CD pipelines.\nMentored junior developers and supported production performance improvements.", workAuthorization: "Yes", noticePeriod: "0", linkedinUrl: "https://linkedin.com/in/badrish-choubey-368857ba/", githubUrl: "https://github.com/Badrish96", portfolioUrl: "https://my-portfolio-frontend-chi-five.vercel.app/", website: "https://my-portfolio-frontend-chi-five.vercel.app/", experienceYears: "9", expectedCompensation: "1600000" };

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
    setProfile((current) => mergeProfileData(current, user));
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
        setProfile((current) => mergeProfileData(current, data.user));
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
        body: JSON.stringify({ ...profile, skills: toList(profile.skills), preferredRoles: toList(profile.preferredRoles), preferredLocations: toList(profile.preferredLocations), experienceYears: numberOrUndefined(profile.experienceYears), expectedCompensation: numberOrUndefined(profile.expectedCompensation), currentSalary: numberOrUndefined(profile.currentSalary), expectedSalary: numberOrUndefined(profile.expectedSalary), availableToJoin: numberOrUndefined(profile.availableToJoin), relevantExperienceYears: numberOrUndefined(profile.relevantExperienceYears) }),
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
      <main className="w-full px-4 py-10 sm:px-6 lg:px-8 xl:px-10">
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
              <div><strong className="block text-lg text-[var(--fg)]">5+</strong>Years</div>
              <div><strong className="block text-lg text-[var(--fg)]">{profile.stats?.followersCount || 0}</strong>Followers</div>
              <div><strong className="block text-lg text-[var(--fg)]">{profile.stats?.followingCount || 0}</strong>Following</div>
            </div>
          </aside>

          <form onSubmit={handleSave} className="rounded-3xl border border-[var(--primary)]/25 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:bg-[#1f252c] sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4"><h2 className="text-xl font-semibold text-[var(--fg)]">Profile details</h2><button type="button" onClick={() => setIsEditing((value) => !value)} className="rounded-lg border border-[var(--primary)]/30 px-4 py-2 text-sm font-medium text-[var(--primary)]">{isEditing ? "Cancel" : "Edit profile"}</button></div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" value={profile.name} onChange={handleChange} disabled={!isEditing} />
              <Field label="First name" name="firstName" value={profile.firstName} onChange={handleChange} disabled={!isEditing} />
              <Field label="Middle name" name="middleName" value={profile.middleName} onChange={handleChange} disabled={!isEditing} />
              <Field label="Last name" name="lastName" value={profile.lastName} onChange={handleChange} disabled={!isEditing} />
              <Field label="Username" name="username" value={profile.username} onChange={handleChange} disabled={!isEditing} />
              <Field label="Email" name="email" value={profile.email} disabled />
              <Field label="Mobile phone" name="mobilePhone" value={profile.mobilePhone} onChange={handleChange} disabled={!isEditing} />
              <Field label="Country code" name="countryCode" value={profile.countryCode} onChange={handleChange} disabled={!isEditing} placeholder="+91" />
              <Field label="Gender" name="gender" value={profile.gender} onChange={handleChange} disabled={!isEditing} />
              <Field label="Nationality" name="nationality" value={profile.nationality} onChange={handleChange} disabled={!isEditing} />
              <Field label="Date of birth" name="dateOfBirth" type="date" value={profile.dateOfBirth} onChange={handleChange} disabled={!isEditing} />
              <label className="block text-sm font-medium text-[var(--fg)]">Account type<select name="userType" value={profile.userType} onChange={handleChange} disabled={!isEditing} className="mt-2 w-full rounded-xl border border-[var(--primary)]/25 bg-[var(--bg)] px-4 py-3 text-[var(--fg)] disabled:opacity-60"><option value="developer">Developer</option><option value="recruiter">Recruiter</option><option value="student">Student</option></select></label>
              <Field label="Location" name="location" value={profile.location} onChange={handleChange} disabled={!isEditing} icon={<MapPinIcon className="h-4 w-4" />} />
              <Field label="Website" name="website" value={profile.website} onChange={handleChange} disabled={!isEditing} icon={<LinkIcon className="h-4 w-4" />} />
              <Field label="Skills (comma separated)" name="skills" value={toText(profile.skills)} onChange={handleChange} disabled={!isEditing} />
              <Field label="Preferred roles (comma separated)" name="preferredRoles" value={toText(profile.preferredRoles)} onChange={handleChange} disabled={!isEditing} />
              <Field label="Preferred locations (comma separated)" name="preferredLocations" value={toText(profile.preferredLocations)} onChange={handleChange} disabled={!isEditing} />
              <Field label="Years of experience" name="experienceYears" type="number" min="0" max="80" value={profile.experienceYears ?? ""} onChange={handleChange} disabled={!isEditing} />
              <Field label="Expected compensation" name="expectedCompensation" type="number" min="0" value={profile.expectedCompensation ?? ""} onChange={handleChange} disabled={!isEditing} />
              <Field label="Current salary" name="currentSalary" type="number" min="0" value={profile.currentSalary ?? ""} onChange={handleChange} disabled={!isEditing} />
              <Field label="Current salary currency" name="currentSalaryCurrency" value={profile.currentSalaryCurrency} onChange={handleChange} disabled={!isEditing} placeholder="USD" />
              <Field label="Expected salary" name="expectedSalary" type="number" min="0" value={profile.expectedSalary ?? ""} onChange={handleChange} disabled={!isEditing} />
              <Field label="Expected salary currency" name="expectedSalaryCurrency" value={profile.expectedSalaryCurrency} onChange={handleChange} disabled={!isEditing} placeholder="USD" />
              <Field label="Compensation hike expectations" name="compensationHikeExpectations" value={profile.compensationHikeExpectations} onChange={handleChange} disabled={!isEditing} placeholder="e.g. 30% or negotiable" />
              <Field label="Available to join (days)" name="availableToJoin" type="number" min="0" value={profile.availableToJoin ?? ""} onChange={handleChange} disabled={!isEditing} />
              <Field label="Current location" name="currentLocation" value={profile.currentLocation} onChange={handleChange} disabled={!isEditing} />
              <Field label="Relevant experience (years)" name="relevantExperienceYears" type="number" min="0" max="80" value={profile.relevantExperienceYears ?? ""} onChange={handleChange} disabled={!isEditing} />
              <Field label="Notice period / joining availability" name="noticePeriod" value={profile.noticePeriod} onChange={handleChange} disabled={!isEditing} />
              <Field label="Work authorization" name="workAuthorization" value={profile.workAuthorization} onChange={handleChange} disabled={!isEditing} />
              <Field label="Languages" name="languages" value={profile.languages} onChange={handleChange} disabled={!isEditing} />
              <Field label="LinkedIn URL" name="linkedinUrl" value={profile.linkedinUrl} onChange={handleChange} disabled={!isEditing} />
              <Field label="GitHub URL" name="githubUrl" value={profile.githubUrl} onChange={handleChange} disabled={!isEditing} />
              <Field label="Portfolio URL" name="portfolioUrl" value={profile.portfolioUrl} onChange={handleChange} disabled={!isEditing} />
            </div>
            <label className="mt-5 block text-sm font-medium text-[var(--fg)]">Bio<textarea name="bio" value={profile.bio} onChange={handleChange} disabled={!isEditing} maxLength={1000} rows={5} className="mt-2 w-full resize-y rounded-xl border border-[var(--primary)]/25 bg-[var(--bg)] px-4 py-3 text-[var(--fg)] disabled:opacity-60" placeholder="Tell people a little about yourself" /></label>
            <ResumeTextArea label="Professional summary" name="resumeSummary" value={profile.resumeSummary} onChange={handleChange} disabled={!isEditing} />
            <ResumeTextArea label="Education" name="educationDetails" value={profile.educationDetails} onChange={handleChange} disabled={!isEditing} placeholder="Degree, institution, graduation year" />
            <label className="mt-5 block text-sm font-medium text-[var(--fg)]">Experience details<textarea name="experienceDetails" value={profile.experienceDetails} onChange={handleChange} disabled={!isEditing} maxLength={3000} rows={5} className="mt-2 w-full resize-y rounded-xl border border-[var(--primary)]/25 bg-[var(--bg)] px-4 py-3 text-[var(--fg)] disabled:opacity-60" placeholder="Describe your relevant experience" /></label>
            <ResumeTextArea label="Projects" name="projectDetails" value={profile.projectDetails} onChange={handleChange} disabled={!isEditing} />
            <ResumeTextArea label="Certifications" name="certifications" value={profile.certifications} onChange={handleChange} disabled={!isEditing} />
            <ResumeTextArea label="Achievements" name="achievements" value={profile.achievements} onChange={handleChange} disabled={!isEditing} />
            {isEditing && <button type="submit" className="mt-6 w-full rounded-xl bg-gradient-to-r from-[var(--primary)] to-blue-500 px-4 py-3 font-semibold text-white shadow-lg">Save changes</button>}
          </form>
        </div>
      </main>
    </div>
  );
}

function toList(value) {
  return Array.isArray(value) ? value : String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
}

function toText(value) {
  return Array.isArray(value) ? value.join(", ") : value || "";
}

function numberOrUndefined(value) {
  return value === "" || value == null ? undefined : Number(value);
}

function mergeProfileData(current, user) {
  const merged = { ...current, ...user };
  if (user?.email?.toLowerCase() === "badrishchoubeystar@gmail.com") {
    for (const field of ["name", "username", "firstName", "middleName", "lastName", "mobilePhone", "countryCode", "gender", "nationality", "dateOfBirth", "currentSalary", "currentSalaryCurrency", "compensationHikeExpectations", "availableToJoin", "currentLocation", "location", "bio", "resumeSummary", "experienceDetails", "educationDetails", "projectDetails", "certifications", "achievements", "workAuthorization", "noticePeriod", "githubUrl", "linkedinUrl", "portfolioUrl", "website", "experienceYears", "relevantExperienceYears", "expectedSalary", "expectedSalaryCurrency", "expectedCompensation"]) {
      if (user?.[field] == null || user[field] === "") merged[field] = resumeProfileDefaults[field] ?? current[field] ?? resumeDefaults[field];
    }
  }
  return merged;
}

function Field({ label, icon, ...props }) {
  return <label className="block text-sm font-medium text-[var(--fg)]">{label}<span className="relative mt-2 block">{icon && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg)]/50">{icon}</span>}<input {...props} className={`w-full rounded-xl border border-[var(--primary)]/25 bg-[var(--bg)] px-4 py-3 text-[var(--fg)] disabled:opacity-60 ${icon ? "pl-10" : ""}`} /></span></label>;
}

function ResumeTextArea({ label, ...props }) {
  return <label className="mt-5 block text-sm font-medium text-[var(--fg)]">{label}<textarea {...props} rows={5} className="mt-2 w-full resize-y rounded-xl border border-[var(--primary)]/25 bg-[var(--bg)] px-4 py-3 text-[var(--fg)] disabled:opacity-60" /></label>;
}
