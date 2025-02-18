import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaTimes, FaBars, FaChevronDown } from "react-icons/fa";
import Dropdown from "../Dropdown/Dropdown";
import { AboutMenuItems, FocusMenuItems,ProductMenuItems } from "../Dropdown/DropdownItems";
import styles from "./Navbar.module.css";
import Image from "next/image";
import logo from "../../public/images/Dnamaz-logoo.png";

function Navbar() {
  const [click, setClick] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [focusDropdown, setFocusDropdown] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const [rotateCheveronAbout, setRotateCheveronAbout] = useState(false);
  const [rotateCheveronFocus, setRotateCheveronFocus] = useState(false);
  const [rotateCheveronProduct, setRotateCheveronProduct] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnterAbout = () => {
    setAboutDropdown(true);
    setRotateCheveronAbout(true);
  };
  const onMouseEnterAFocus = () => {
    setFocusDropdown(true);
    setRotateCheveronFocus(true);
  };
  const onMouseEnterProduct=()=>{
    setProductDropdown(true);
    setRotateCheveronProduct(true);
  }

  const onMouseLeaveAbout = () => {
    setAboutDropdown(false);
    setRotateCheveronAbout(false);
  };
  const onMouseLeaveFocus = () => {
    setFocusDropdown(false);
    setRotateCheveronFocus(false);
  };
  const onMouseLeaveProduct=()=>{
    setProductDropdown(false);
    setRotateCheveronProduct(false);
  }

  const changeBg = () => {
    // (window.scrollY);
    if (window.scrollY >= 40) {
      setNavBg(true);
    } else {
      setNavBg(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", changeBg);
    }
  });

  const router = useRouter();

  return (
    <>
      <div className={`${navBg ? "!bg-[#F6F6F6]" : ""} w-full fixed h-[100px] pt-2 z-[10000000] font-Lex`}>
        <nav className={`${styles.navbar} flex items-center`}>
          <div className="flex items-center">
            <a
              className={`w-[150px] ${styles.navbar_logo} pt-8 flex items-center`}
              onClick={() => {
                router.push("/");
                closeMobileMenu;
              }}
            >
              <Image src={logo} width={"80px"} height={"80px"} alt="logo"  />
            </a>
            <div className={styles.menu_icon} onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
          </div>
          <ul
            className={
              click ? styles.nav_menu + " " + styles.active : styles.nav_menu
            }
            onClick={closeMobileMenu}
          >
            <li className={styles.nav_item}>
              <a
                className={`${
                  router.pathname === "/"
                    ? "text-[#1D5506] !font-extrabold"
                    : ""
                } ${styles.nav_links}`}
                onClick={() => {
                  router.push("/");
                  closeMobileMenu;
                }}
              >
                Home
              </a>
            </li>
            <li
              className={styles.nav_item}
              onMouseEnter={onMouseEnterAbout}
              onMouseLeave={onMouseLeaveAbout}
            >
              <div
                className={`!flex lg:block justify-center ${styles.nav_links}`}
              >
                <div
                  className={`flex items-center space-x-1 ${
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
                  <span>About</span>
                  <span
                    className={`${rotateCheveronAbout ? "-rotate-90" : ""}`}
                  >
                    <FaChevronDown size={15} />
                  </span>
                </div>
              </div>
              {aboutDropdown && <Dropdown menuItems={AboutMenuItems} />}
            </li>
            <li
              className={styles.nav_item}
              onMouseEnter={onMouseEnterAFocus}
              onMouseLeave={onMouseLeaveFocus}
            >
              <a
                className={`!flex space-x-1 lg:block justify-center ${styles.nav_links}`}
              >
                <div
                  className={`flex items-center space-x-1 ${
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
                  <span>Our Focus </span>
                  <span
                    className={`${rotateCheveronFocus ? "-rotate-90" : ""}`}
                  >
                    <FaChevronDown size={15} />
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
            {/* <li className={styles.nav_item}>
              {/* <a
                className={`${
                  router.pathname === "/blog"
                    ? "text-[#1D5506] !font-extrabold"
                    : ""
                } ${styles.nav_links}`}
                onClick={() => {
                  router.push("/blog");
                  handleClick;
                }}
              > */}
             <li onMouseEnter={onMouseEnterProduct} onMouseLeave={onMouseLeaveProduct} className={styles.nav_item}>
                <div className={`!flex lg:block justify-center ${styles.nav_links}`}>
                  <div
            className={`flex items-center space-x-1 ${
              router.pathname === "/open-account#dnamazCapital"
              ? "text-[#1D5506] !font-extrabold"
              : router.pathname === "/open-account#accountOpening"
              ? "text-[#1D5506] !font-extrabold"
              :""
            }`}
            >
            <span className="font-bold hover:text-primary cursor-pointer">
            Our Product
              </span>
              <span className={`${rotateCheveronProduct ? "-rotate-90" : ""}`}>
                <FaChevronDown size={15} />
              </span>
            </div>
          </div>
          {productDropdown && <Dropdown menuItems={ProductMenuItems} />}
        </li>
                {/* Our Product */}
              {/* </a> 
            </li> */}
            <li className={`${styles.nav_item}`}>
              <a
                className="text-center inline-flex justify-center items-center h-[40px] w-[180px] bg-custom-primary cursor-pointer text-white rounded-xl mx-auto"
                onClick={() => {
                  router.push("/contact");
                  closeMobileMenu();
                }}
              >
                Talk to Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
export default Navbar;
