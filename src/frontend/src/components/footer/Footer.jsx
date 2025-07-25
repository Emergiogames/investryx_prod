import React from "react";

function Footer() {
  return (
    <>
      {/* <!-- component --> */}
      <div className="">
        <footer
          className="bg-slate-900 rounded-ss-5xl rounded-ee-5xl"
          aria-labelledby="footer-heading"
        >
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
            <div className="xl:grid xl:grid-cols-2 xl:gap-8">
              <div className="space-y-4">
                <img
                  className="max-w-48"
                  src="/images/white_emergio_inv.svg"
                  alt="Company name"
                />
                <div className="xl:flex justify-end">
                  <p className="leading-6 max-w-sm text-gray-100">
                  Investryx bridges the gap between demand and supply across all business sectors, fostering seamless connections and enhancing opportunitie for sustainable growth.
                  </p>
                </div>

                <div className="flex space-x-6">
                  <a href="#" className="text-gray-200 hover:text-gray-500">
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-200 hover:text-gray-500">
                    <span className="sr-only">the team is on fire</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.074.945A4.993 4.993 0 0 0 6 5v.032c.004.6.114 1.176.311 1.709.16.428-.204.91-.61.7a5.023 5.023 0 0 1-1.868-1.677c-.202-.304-.648-.363-.848-.058a6 6 0 1 0 8.017-1.901l-.004-.007a4.98 4.98 0 0 1-2.18-2.574c-.116-.31-.477-.472-.744-.28Zm.78 6.178a3.001 3.001 0 1 1-3.473 4.341c-.205-.365.215-.694.62-.59a4.008 4.008 0 0 0 1.873.03c.288-.065.413-.386.321-.666A3.997 3.997 0 0 1 8 8.999c0-.585.126-1.14.351-1.641a.42.42 0 0 1 .503-.235Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-200 hover:text-blue-4      00"
                  >
                    <span className="sr-only">X</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M2.75 2a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 1.5 0v-2.624l.33-.083A6.044 6.044 0 0 1 8 11c1.29.645 2.77.807 4.17.457l1.48-.37a.462.462 0 0 0 .35-.448V3.56a.438.438 0 0 0-.544-.425l-1.287.322C10.77 3.808 9.291 3.646 8 3a6.045 6.045 0 0 0-4.17-.457l-.34.085A.75.75 0 0 0 2.75 2Z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-200 hover:text-gray-500">
                    <span className="sr-only">GitHub</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-200 hover:text-gray-500">
                    <span className="sr-only">YouTube</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className=" mt-16 grid  xl:mt-0">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div className="mt-10 md:mt-0">
                    <h3 className="text-lg font-semibold leading-6 text-gray-100">
                      Serivces{" "}
                    </h3>
                    <ul role="list" className="mt-6 space-y-4">
                      <li>
                        <a
                          href="/about-us"
                          className="text leading-6 text-gray-200 hover:text-gray-900"
                        >
                          Company{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="/q&a"
                          className="text leading-6 text-gray-200 hover:text-gray-900"
                        >
                          Q&A
                        </a>
                      </li>
                      <li>
                        <a
                          href="/subscribe"
                          className="text leading-6 text-gray-200 hover:text-gray-900"
                        >
                          Pricing
                        </a>
                      </li>
                      <li>
                        <a
                          href="/howtosell-business"
                          className="text leading-6 text-gray-200 hover:text-gray-900"
                        >
                          How To?
                        </a>
                      </li>
                      <li>
                        <a
                          href="/contact_us"
                          className="text leading-6 text-gray-200 hover:text-gray-900"
                        >
                          Enquiry
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className=" pt-8 md:pt-0 text-lg font-semibold leading-6 text-gray-100">
                      Contact
                    </h3>
                    <ul role="list" className="mt-6 space-y-4">
                      <li className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="orange"
                          className="size-7"
                        >
                          <path
                            fillRule="evenodd"
                            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <a
                          href="#"
                          className="ml-2 text leading-6 text-gray-200 hover:text-gray-400"
                        >
                         9th Floor, Noel Focus, Seaport - Airport Rd, CSEZ, Chittethukara, Kochi, Kakkanad, Kerala 682037
                        </a>
                      </li>

                      {/* <li>
                <a href="#" className="text leading-6 text-gray-200 hover:text-gray-900">Temp house</a>
              </li> */}
                      <li className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="orange"
                          className="size-7"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <a
                          href="#"
                          className="ml-2 leading-6 text-gray-200 hover:text-gray-400"
                        >
                          +91 75940 88811
                        <br/>   +91 98708 52663
                        </a>
                      </li>
                      <li className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="orange"
                          className="size-7"
                        >
                          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                        </svg>

                        <a
                          href="#"
                          className="ml-2 leading-6 text-gray-200 hover:text-gray-400"
                        >
                          info@emergiotech.com
                        </a>
                      </li>
                      <li className="flex">
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="orange"
                          className="size-7"
                        >
                          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                        </svg> */}
                        <span
                          className="ml-2 leading-6 text-yellow-300 hover:text-gray-400 cursor-pointer"
                          onClick={() => (window.location.href = "/legal_privacy")}
                        >
                          Legal and privacy policy
                        </span>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text leading-6 text-gray-200 hover:text-gray-400"
                        ></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
              <p className="text-xs leading-5 text-gray-500">
                &copy; 2024 Investryx, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
