"use client";
import Image from "next/image";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero-section/Hero";
import StickyNav from "./components/Navbar/StickyNav";
import Productivity from "./components/Productivity/Productivity";
import Collaboration from "./components/Collaboration/Collaboration";
import Security from "./components/Security/Security";
import Globe from "./components/Footer/Globe";
import Footer from "./components/Footer/Footer";
import Chat from "./components/ChatPage";
import ChatPage from "./components/ChatPage";

export default function Home() {
  return (
    <div className=" ">
      <div className="relative z-50">
        <div className="absolute">
          <Navbar />
        </div>
      </div>
      <div>
        <div className="overflow-hidden">
          <div className="relative">
            <img
              className="absolute top-0 transition ease-in duration-200 max-xl:right-[-1050px] xl:right-[-970px] -z-30 image"
              width="4377"
              src="https://github.githubassets.com/images/modules/site/home-campaign/hero-bg.webp"
              alt=""
            />
          </div>
          <div className="hero-section px-3 ">
            <Hero />
          </div>
          <StickyNav />
          <div
            id="productivity"
            className="home-campaign-productivity px-4 pt-8 overflow-hidden"
          >
            <Productivity />
          </div>
          <div
            id="collaboration"
            className="home-campaign-productivity px-4 pt-8  overflow-hidden"
          >
            <Collaboration />
          </div>
          <div
            id="security"
            className="home-campaign-productivity px-4 pt-8 pb-16 overflow-hidden"
          >
            <Security />
          </div>
          <Globe />
          <div className="my-10"></div>
          <ChatPage />
        </div>
      </div>
      <Footer />
    </div>
  );
}
