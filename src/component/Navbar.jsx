/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  HomeIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import profile from "../img/Shizuku.jpg";
import { Link } from "react-router-dom";

const navigation = [
  {
    name: "Home",
    act: "/",
    current: false,
    icon: <HomeIcon className="text-white h-7 w-7 " />,
  },
  {
    name: "About",
    act: "/about",
    current: false,
    icon: <QuestionMarkCircleIcon className="text-white h-7 w-7" />,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-gray-800 ">
      {({ open }) => (
        <>
          <div className="bg-gray-800 hidden sm:block max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="lg:block h-8 w-auto rounded-full"
                    src={profile}
                    alt="..."
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        to={item.act}
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <a
                      href="https://zhafranbahij.github.io/personal-profile/"
                      target="_blank"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Created by
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <nav className="fixed bottom-0 bg-gray-800 w-full  sm:hidden">
            <div className="flex justify-evenly space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.act}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "flex flex-col px-3 py-2 rounded-md text-base font-medium justify-items-center"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <div className="flex justify-center">{item.icon}</div>
                  <div className="flex justify-center text-xs opacity-30">
                    {item.name}
                  </div>
                </Link>
              ))}
              <a
                href="https://zhafranbahij.github.io/personal-profile/"
                target="_blank"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex flex-col
                justify-items-center"
              >
                <div className="flex justify-center">
                  <UserGroupIcon className="text-white h-7 w-7" />
                </div>
                <div className="flex justify-center text-xs opacity-30">
                  Created by
                </div>
              </a>
            </div>
          </nav>
        </>
      )}
    </Disclosure>
  );
}
