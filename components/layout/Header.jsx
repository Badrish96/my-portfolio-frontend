"use client"

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import ThemeToggle from '../ui/ThemeToggle'
import Search from '../ui/Search'
import { useState } from 'react'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Blogs', href: '/blogs', current: false },
  { name: 'Dashboard', href: '/dashboard', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  // Manual state to handle authenticated/unauthenticated users
  // Set this to true to test authenticated state, false for unauthenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleSignOut = () => {
    setIsAuthenticated(false)
    // Add your sign out logic here
    console.log('User signed out')
  }

  return (
    <Disclosure
      as="nav"
      className="relative after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 py-4"
    >
      <div className="sm:px-6">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Image
                alt='logo'
                src="/images/portfolio-logo.png"
                width={200}
                height={200}
                className="object-cover"
                priority={true}
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 items-center">
                <div>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current ? 'text-[#12F7D6]' : 'text-gray-600 hover:text-[#12F7D6] hover:bg-white/5',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <Search />
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Conditional rendering based on authentication state */}
            {isAuthenticated ? (
              <>
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-400 hover:text-[#12F7D6] focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>

                {/* Theme toggle */}
                <ThemeToggle />

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <Image
                      alt="profile picture"
                      src="/images/profile-picture.jpg"
                      className="size-10 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10 object-cover"
                      width={50}
                      height={50}
                    />
                  </MenuButton>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <MenuItem>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden hover:text-[#12F7D6]"
                      >
                        Your Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden hover:text-[#12F7D6]"
                      >
                        Settings
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden hover:text-[#12F7D6]"
                      >
                        Sign Out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <>
                {/* Theme toggle for unauthenticated users */}
                <ThemeToggle />

                {/* Sign In and Sign Up buttons */}
                <div className="flex items-center gap-3 ml-3">
                  <a
                    href="/login"
                    className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#12F7D6] hover:bg-white/5 transition-all"
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="rounded-md px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#0ea5a1] to-[#12F7D6] text-white hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-950/50 text-white' : 'text-gray-600 hover:bg-white/5 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
          
          {/* Mobile auth buttons */}
          {!isAuthenticated && (
            <div className="pt-4 pb-3 border-t border-white/10">
              <div className="space-y-2">
                <a
                  href="/signin"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-white/5 hover:text-white"
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="block rounded-md px-3 py-2 text-base font-medium bg-gradient-to-r from-[#0ea5a1] to-[#12F7D6] text-white"
                >
                  Sign Up
                </a>
              </div>
            </div>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}