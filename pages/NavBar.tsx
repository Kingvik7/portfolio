import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, InboxStackIcon, MinusIcon, RectangleStackIcon, XMarkIcon } from "@heroicons/react/24/outline"

const navigation = [
  { name: 'Home', href: '#footer', current: true },
  { name: 'Featured', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'About me', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  return (
    <>
      <div className="mx-4 font-['Inter'] max-w-5xl xl:mx-auto inset-x-0 fixed md:mx-12 mt-6 z-10">
        <Disclosure as="nav" className="bg-white drop-shadow-[0_5px_10px_rgba(0,0,0,0.05)] border rounded-lg">
          {({ open }) => (
            <>
              <div className="max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {/* <img
                        className="h-8 w-8"
                        src= {require("../images/lol.png")}
                        alt="Workflow"
                      /> */}
                      <h2 className='text-gray-900 font-semibold'>VG</h2>
                    </div>
                  </div>
                  <div className="hidden items-baseline md:block">
                      <div className="ml-10 flex items-baseline space-x-5">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? ' text-gray-900 font-medium'
                                : 'text-gray-400  hover:text-gray-500',
                              'px-3 py-2 rounded-md text-sm font-normal'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-normal'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}
