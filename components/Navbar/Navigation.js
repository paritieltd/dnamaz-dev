import React, { useEffect, useState } from "react";
import Button from "../Button";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { CgClose } from "react-icons/cg"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import Dropdown from "../Dropdown/Dropdown";
import { AboutMenuItems, FocusMenuItems } from "../Dropdown/DropdownItems";

const Navigation = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [rotateCheveronAbout, setRotateCheveronAbout] = useState(false);
  const [rotateCheveronFocus, setRotateCheveronFocus] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [focusDropdown, setFocusDropdown] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const router = useRouter();

  const changeNavBg = (e) => {
    window.scrollY >= 100 ? setNavBg(true) : setNavBg(false);
  };

  const handleClick = () => setNavbarOpen(!navbarOpen);
  const closeMobileMenu = () => setNavbarOpen(false);

  const onMouseEnterAbout = () => {
    setAboutDropdown(true);
    setRotateCheveronAbout(true);
  };
  const onMouseEnterAFocus = () => {
    setFocusDropdown(true);
    setRotateCheveronFocus(true);
  };

  const onMouseLeaveAbout = () => {
    setAboutDropdown(false);
    setRotateCheveronAbout(false);
  };

  const onMouseLeaveFocus = () => {
    setFocusDropdown(false);
    setRotateCheveronFocus(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);
  return (
    <nav
      className={`${
        navBg && "bg-white z-50"
      } flex items-center justify-between py-4 px-5 lg:px-20 font-semibold fixed w-full my-0`}
    >
      <div className="flex w-full lg:w-auto justify-between items-center">
        <a href="/">
          <div>
            <Image
              width={80}
              height={70}
              src="/images/namaz-logo.png"
              alt="Logo"
              className="!w-10 !h-10"
            />
            <div className="flex justify-end w-full">
              <Image
                src="/images/namaz-logo-bottom.png"
                alt="rc"
                className="mt-1 h-auto"
                width={50}
                height={8}
              />
            </div>
          </div>
        </a>
        {navbarOpen ? (
          <CgClose
            onClick={handleClick}
            className="w-6 h-auto block lg:hidden"
          />
        ) : (
          <AiOutlineMenu
            onClick={handleClick}
            className="w-6 h-auto block lg:hidden"
          />
        )}
      </div>

      <ul className="hidden lg:flex items-center space-x-10 text-nav font-lex">
        <li className="hover:font-extrabold hover:text-primary">
          <Link href="/">Home</Link>
        </li>
        <li onMouseEnter={onMouseEnterAbout} onMouseLeave={onMouseLeaveAbout}>
          <div className={`!flex lg:block justify-center`}>
            <div
              className={`flex items-center ${
                router.pathname === "/about"
                  ? "text-[#1D5506] !font-extrabold"
                  : router.pathname === "/about/board-member"
                  ? "text-[#1D5506] !font-extrabold"
                  : router.pathname === "/about/team-member"
                  ? "text-[#1D5506] !font-extrabold"
                  : router.pathname === "/about/sharia-advisers"
                  ? "text-[#1D5506] !font-extrabold"
                  : router.pathname === "/about/our-values"
                  ? "text-[#1D5506] !font-extrabold"
                  : router.pathname === "/about/funding-profiles"
                  ? "text-[#1D5506] !font-extrabold"
                  : ""
              }`}
            >
              <span className="hover:font-extrabold hover:text-primary">
                About
              </span>
              <span className={`${rotateCheveronAbout ? "-rotate-90" : ""}`}>
                <RiArrowDropDownLine className="w-8 h-auto" />
              </span>
            </div>
          </div>
          {aboutDropdown && <Dropdown menuItems={AboutMenuItems} />}
        </li>
        <li onMouseEnter={onMouseEnterAFocus} onMouseLeave={onMouseLeaveFocus}>
          <a className={`!flex lg:block justify-center`}>
            <div
              className={`flex items-center ${
                router.pathname === "/our-focus/portfolio"
                  ? "text-[#1D5506] !font-extrabold"
                  : router.pathname === "/our-focus/fixed-income"
                  ? "text-[#1D5506] !font-extrabold"
                  : router.pathname === "/our-focus/mutual-fund"
                  ? "text-[#1D5506] !font-extrabold"
                  : router.pathname === "/our-focus/sukuk-issuance"
                  ? "text-[#1D5506] !font-extrabold"
                  : router.pathname === "/our-focus/financial-advisory"
                  ? "text-[#1D5506] !font-extrabold"
                  : router.pathname === "/our-focus/research"
                  ? "text-[#1D5506] !font-extrabold"
                  : router.pathname === "/our-focus/training"
                  ? "text-[#1D5506] !font-extrabold"
                  : ""
              }`}
            >
              <span className="hover:font-extrabold hover:text-primary">
                Our Focus{" "}
              </span>
              <span className={`${rotateCheveronFocus ? "-rotate-90" : ""}`}>
                <RiArrowDropDownLine className="w-8 h-auto" />
              </span>
            </div>
          </a>
          {focusDropdown && (
            <Dropdown
              menuItems={FocusMenuItems}
              closeMobileMenu={closeMobileMenu}
            />
          )}
        </li>
        <li className="hover:font-extrabold hover:text-primary">
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/contact">
            <Button text="Talk to US" />
          </Link>
        </li>
      </ul>
      {/* Mobile */}
      {navbarOpen && (
        <div>
          <ul className="backdrop-blur-xl grid h-[500px] py-10 lg:hidden absolute z-50 top-28 left-0 bg-[#242222] w-full justify-center text-center items-center text-white font-lex">
            <li className="hover:font-extrabold">
              <a
                onClick={() => {
                  router.push("/");
                  closeMobileMenu;
                }}
              >
                Home
              </a>
            </li>
            <li
              onMouseEnter={onMouseEnterAbout}
              onMouseLeave={onMouseLeaveAbout}
            >
              <div className={`!flex lg:block justify-center`}>
                <div
                  className={`flex items-center ${
                    router.pathname === "/about"
                      ? "text-[#1D5506] !font-extrabold"
                      : router.pathname === "/about/board-member"
                      ? "text-[#1D5506] !font-extrabold"
                      : router.pathname === "/about/team-member"
                      ? "text-[#1D5506] !font-extrabold"
                      : router.pathname === "/about/sharia-advisers"
                      ? "text-[#1D5506] !font-extrabold"
                      : router.pathname === "/about/our-values"
                      ? "text-[#1D5506] !font-extrabold"
                      : router.pathname === "/about/funding-profiles"
                      ? "text-[#1D5506] !font-extrabold"
                      : ""
                  }`}
                >
                  <span className="hover:font-extrabold w-full">About</span>
                  <span
                    className={`${rotateCheveronAbout ? "-rotate-90" : ""}`}
                  >
                    <RiArrowDropDownLine className="w-8 h-auto" />
                  </span>
                </div>
              </div>
              {aboutDropdown && <Dropdown menuItems={AboutMenuItems} />}
            </li>
            <li
              onMouseEnter={onMouseEnterAFocus}
              onMouseLeave={onMouseLeaveFocus}
            >
              <a>
                <div
                  className={`flex items-center ${
                    router.pathname === "/our-focus/portfolio"
                      ? "text-[#1D5506] !font-extrabold"
                      : router.pathname === "/our-focus/fixed-income"
                      ? "text-[#1D5506] !font-extrabold"
                      : router.pathname === "/our-focus/mutual-fund"
                      ? "text-[#1D5506] !font-extrabold"
                      : router.pathname === "/our-focus/sukuk-issuance"
                      ? "text-[#1D5506] !font-extrabold"
                      : router.pathname === "/our-focus/financial-advisory"
                      ? "text-[#1D5506] !font-extrabold"
                      : router.pathname === "/our-focus/research"
                      ? "text-[#1D5506] !font-extrabold"
                      : router.pathname === "/our-focus/training"
                      ? "text-[#1D5506] !font-extrabold"
                      : ""
                  }`}
                >
                  <span className="hover:font-extrabold w-full">
                    Our Focus{" "}
                  </span>
                  <span
                    className={`${rotateCheveronFocus ? "-rotate-90" : ""}`}
                  >
                    <RiArrowDropDownLine className="w-8 h-auto" />
                  </span>
                </div>
              </a>
              {focusDropdown && (
                <Dropdown
                  menuItems={FocusMenuItems}
                  closeMobileMenu={closeMobileMenu}
                />
              )}
            </li>
            <li className="hover:font-extrabold">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="flex w-full">
              <Link href="/contact">
                <Button text="Talk to US" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
