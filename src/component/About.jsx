import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import Navbar from "./Navbar";
import Anime from "./Anime";

const questions = [
  {
    id: 1,
    title: "What is Anime?",
    description:
      "Anime is hand-drawn and computer animation originating from Japan",
    source: {
      name: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Anime",
    },
  },
  {
    id: 2,
    title: "What is Seiyuu?",
    description: `Voice actors and actresses for characters in a native
      language version anime, a video game, a radio broadcast or
      an advertisement in Japan.`,
    source: {
      name: "Yourdictionary",
      url: "https://www.yourdictionary.com/seiyuu",
    },
  },
  {
    id: 3,
    title: "Find a bug or have a advice?",
    description: `You can contact me on twitter or telegram. You could chat me with english language. Thank you`,
    source: {
      name: "Contact Me",
      url: "https://t.me/Zhafran_Bahij",
    },
  },
];

export default function About() {
  return (
    <div className="h-screen">
      <Navbar />
      <div className=" min-h-screen bg-neutral-800 flex flex-col items-center justify-center">
        <h1 className="mt-10 text-4xl sm:text-5xl text-transparent font-title font-bold bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
          About
        </h1>
        <div className="w-full px-4 pt-16">
          <div className="w-full max-w-md p-2 mx-auto bg-neutral-900 rounded-2xl">
            {questions.map((question) => (
              <Disclosure as="div" className={question.id != 1 ? "mt-2" : ""}>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      key={question.id}
                      className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-sky-300 bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-none focus-visible:ring focus-visible:ring-blue-900 focus-visible:ring-opacity-75"
                    >
                      <span>{question.title}</span>
                      <ChevronUpIcon
                        className={`${
                          open
                            ? "transform rotate-180 transition duration-300 ease-in-out "
                            : "transition duration-300 ease-in-out"
                        } w-5 h-5 text-sky-400`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-300 ease-out"
                      enterFrom="transform scale-75 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-300 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-75 opacity-0"
                    >
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        "{question.description}" -{" "}
                        <a
                          href={question.source.url}
                          target="_blank"
                          className="text-sky-300 hover:text-sky-200"
                        >
                          {question.source.name}
                        </a>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
