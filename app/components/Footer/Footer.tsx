"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
type Props = {};

const Footer = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="footer relative pt-14 break-words ">
        <div className="max-w-[1280px] mx-auto relative z-[2] overflow-hidden"></div>
        <div className="bg-[#161b22]">
          <div className="max-w-[1280px] mx-auto text-[12px] md:flex flex-row-reverse py-6 justify-between items-center px-4">
            <li className="text-[#ffffff] mx-auto cursor-pointer w-[100px] text-hover-effect">
              Made with ❤️
            </li>

            <ul className="flex items-center mb-4 sm:mb-0 text-[#7d8590] flex-wrap"></ul>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="fixed bottom-0 z-20 right-5 flex items-center justify-center ">
          <Link
            target="_blank"
            href="https://github.com/OpenAIEngineer"
            className="z-20 text-white flex items-center gap-2 flex-col shrink-0 grow-0 justify-around 
            rounded-lg
           mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10"
          >
            <img
              height={50}
              width={50}
              className="rounded-full"
              src="/github-logo.png"
              alt=""
            />
          </Link>
          <Link
            target="_blank"
            href="https://developers.google.com/profile/u/Luis-Ai-Engineer"
            className="z-20 text-white flex items-center gap-2 flex-col shrink-0 grow-0 justify-around 
                   rounded-lg
                  mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10"
          >
            <img
              height={50}
              width={50}
              className="rounded-full"
              src="/aigif.gif"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
