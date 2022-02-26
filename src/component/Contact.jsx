import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Navbar from "./Navbar";

export default function MyModal() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const listContacts = [
    {
      id: 1,
      logo: "-",
      title: "Twitter",
      link: "https://twitter.com/RainfogM",
    },
    {
      id: 2,
      logo: "-",
      title: "Telegram",
      link: "https://t.me/Zhafran_Bahij",
    },
    {
      id: 3,
      logo: "-",
      title: "Instagram",
      link: "https://www.instagram.com/rainfog.mzb/",
    },
    {
      id: 4,
      logo: "-",
      title: "Discord",
      link: "https://discord.com/users/684600978686869524",
    },
  ];
  return (
    <div className="h-screen">
      <Navbar />
      <div className=" min-h-screen bg-neutral-800 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={openModal}
            className="px-4 py-2 text-sm font-medium text-sky-300 bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Contact Me
          </button>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-neutral-800 shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-sky-100 "
                  >
                    Contact Me at :
                  </Dialog.Title>
                  <div className="mt-2">
                    <ul>
                      {listContacts.map((contact) => (
                        <li>
                          <a
                            href={contact.link}
                            target="_blank"
                            className="block text-lg text-sky-300 mt-1 hover:bg-blue-800 active:bg-blue-900 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300 hover:rounded-lg px-4 py-2"
                          >
                            {contact.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      Wakatta, Sankyu
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}
