"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "../ui/Search";
import ThemeToggle from "../ui/ThemeToggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Projects", href: "/#projects" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function UserAvatar({ user }) {
  if (user.avatar) {
    return (
      <Image
        alt={`${user.name || "User"} avatar`}
        src={user.avatar}
        width={40}
        height={40}
        unoptimized
        className="size-10 rounded-full border border-white/15 object-cover"
      />
    );
  }

  return (
    <span className="flex size-10 items-center justify-center rounded-full bg-[#0ea5a1] font-semibold text-white">
      {(user.name || user.username || user.email || "U").charAt(0).toUpperCase()}
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("authUser") || window.sessionStorage.getItem("authUser");
    const token = window.localStorage.getItem("authToken") || window.sessionStorage.getItem("authToken");

    if (!storedUser || !token) return;
    try {
      setUser(JSON.parse(storedUser));
    } catch {
      window.localStorage.removeItem("authUser");
      window.sessionStorage.removeItem("authUser");
    }
  }, []);

  const handleSignOut = () => {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("authUser");
    window.sessionStorage.removeItem("authToken");
    window.sessionStorage.removeItem("authUser");
    setUser(null);
  };

  const isCurrent = (item) => item.href === pathname;

  return (
    <Disclosure as="nav" className="relative border-b border-white/10 py-2">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-14 items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <DisclosureButton
                  className="group inline-flex size-10 shrink-0 items-center justify-center rounded-md text-gray-300 hover:bg-white/5 hover:text-[#12F7D6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12F7D6] xl:hidden"
                  aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                >
                  <Bars3Icon aria-hidden="true" className="size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </DisclosureButton>

                <a href="/" aria-label="Badrish Choubey home" className="flex shrink-0 items-center">
                  <Image
                    alt="Badrish Choubey"
                    src="/images/portfolio-logo.png"
                    width={200}
                    height={200}
                    className="h-10 w-32 object-contain sm:w-40 xl:w-44"
                    priority
                  />
                </a>
              </div>

              <div className="hidden flex-1 items-center justify-center gap-5 xl:flex">
                <div className="flex items-center gap-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={isCurrent(item) ? "page" : undefined}
                      className={classNames(
                        isCurrent(item) ? "text-[#12F7D6]" : "text-gray-300 hover:text-[#12F7D6]",
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <Search />
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <div className="hidden xl:block">
                  <ThemeToggle />
                </div>

                {user ? (
                  <>
                    <span className="xl:hidden" title={user.name || user.username || user.email}>
                      <UserAvatar user={user} />
                    </span>
                    <Menu as="div" className="relative hidden xl:block">
                      <MenuButton className="flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12F7D6]" aria-label="Open user menu">
                        <UserAvatar user={user} />
                      </MenuButton>
                      <MenuItems
                        anchor="bottom end"
                        className="z-20 mt-2 w-48 rounded-md border border-white/10 bg-[#1f252c] py-1 shadow-xl focus:outline-none"
                      >
                        <MenuItem>
                          <a href="/profile" className="block px-4 py-2 text-sm text-gray-200 data-focus:bg-white/5 data-focus:text-[#12F7D6]">Your Profile</a>
                        </MenuItem>
                        <MenuItem>
                          <a href="/settings" className="block px-4 py-2 text-sm text-gray-200 data-focus:bg-white/5 data-focus:text-[#12F7D6]">Settings</a>
                        </MenuItem>
                        <MenuItem>
                          <button onClick={handleSignOut} className="block w-full px-4 py-2 text-left text-sm text-gray-200 data-focus:bg-white/5 data-focus:text-[#12F7D6]">Sign Out</button>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </>
                ) : (
                  <a
                    href="/login"
                    className="rounded-md px-3 py-2 text-sm font-semibold text-[#12F7D6] transition-colors hover:bg-white/5"
                  >
                    Sign In
                  </a>
                )}

                <div className="hidden items-center gap-2 xl:flex">
                  {!user && (
                    <a href="/signup" className="rounded-md bg-gradient-to-r from-[#0ea5a1] to-[#12F7D6] px-4 py-2 text-sm font-medium text-white transition hover:shadow-lg">
                      Sign Up
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel className="border-t border-white/10 bg-[var(--bg)] px-4 pb-5 pt-4 shadow-lg xl:hidden">
            <div className="mx-auto max-w-7xl space-y-4 sm:px-2">
              <div className="max-w-full">
                <Search />
              </div>

              <nav aria-label="Main navigation" className="space-y-1">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    aria-current={isCurrent(item) ? "page" : undefined}
                    className={classNames(
                      isCurrent(item) ? "bg-white/5 text-[#12F7D6]" : "text-gray-200 hover:bg-white/5 hover:text-[#12F7D6]",
                      "block rounded-md px-3 py-3 text-base font-medium",
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </nav>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm text-gray-300">Appearance</span>
                <ThemeToggle />
              </div>

              {user ? (
                <div className="space-y-1 border-t border-white/10 pt-3">
                  <p className="px-3 pb-2 text-sm text-gray-400">Signed in as {user.name || user.username || user.email}</p>
                  <DisclosureButton as="a" href="/profile" className="block rounded-md px-3 py-2 text-sm text-gray-200 hover:bg-white/5 hover:text-[#12F7D6]">Your Profile</DisclosureButton>
                  <DisclosureButton as="a" href="/settings" className="block rounded-md px-3 py-2 text-sm text-gray-200 hover:bg-white/5 hover:text-[#12F7D6]">Settings</DisclosureButton>
                  <button onClick={handleSignOut} className="block w-full rounded-md px-3 py-2 text-left text-sm text-gray-200 hover:bg-white/5 hover:text-[#12F7D6]">Sign Out</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                  <DisclosureButton as="a" href="/login" className="rounded-md border border-white/15 px-3 py-2 text-center text-sm font-semibold text-gray-100 hover:border-[#12F7D6] hover:text-[#12F7D6]">Sign In</DisclosureButton>
                  <DisclosureButton as="a" href="/signup" className="rounded-md bg-gradient-to-r from-[#0ea5a1] to-[#12F7D6] px-3 py-2 text-center text-sm font-semibold text-white">Sign Up</DisclosureButton>
                </div>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
