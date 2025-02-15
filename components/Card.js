"use client"
import React, { useEffect, useState } from "react";
import {
  HiArrowDownRight,
  HiArrowLongRight,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import { CiPaperplane } from "react-icons/ci";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./Button";
import Modal from "./Modal/modal";
import { motion } from "framer-motion";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ExclusiveVideo } from "./Cards/Cards";
// import Image from "next/image";
import { ArticleCard } from "./Cards/Cards";
import Marquee from "react-fast-marquee";
import { AreaFocusCard } from "./Cards/Cards";
import { AdvertCard } from "./Cards/Cards";
import AOS from "aos";
import "aos/dist/aos.css";
import { icons } from "react-icons";

const Card = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [threeBlog, setAllBlog] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const API_ENABLED = false;

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const handleAfterChange = (i) => {
    setActiveIndex(i);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if(!API_ENABLED) return;
    async function fetchBlog() {
      try {
        const controller = new AbortController();
        const response = await axios.get(
          `https://dnamazcapital.blog/wp-json/wp/v2/blog?per_page=3`
        );
        setAllBlog(response.data);
        
      } catch (error) {
        // console.error("Error fetching blog data:", error.message);
        if (error.name !== "AbortError") {
          console.error("Error fetching blog data:", error.message);
          setAllBlog(null); 
        // setAllBlog([]);
      }
      }
    }
    fetchBlog();
    return () => controller.abort();
  }, []);

  // if (!threeBlog) {
  //   return <div></div>;
  // }

  const focus = [
    {
      id: 1,
      image: "./images/pm.png",
      text: "Portfolio/Fund Management",
      url: "/our-focus/portfolio",
    },
    {
      id: 2,
      image: "./images/mutual-fund-slider.png",
      text: "Mutual Funds",
      url: "/our-focus/mutual-fund",
    },
    {
      id: 3,
      image: "./images/training.jpg",
      text: "Training and Conferences",
      url: "/our-focus/training",
    },
    {
      id: 4,
      image: "./images/wealth-management.jpg",
      text: "Wealth Management & Financial Planning",
      url: "/our-focus/wealth-management",
    },
    {
      id: 5,
      image: "./images/Financial-Advisory-Services-2.png",
      text: "Financial Advisory Services",
      url: "/our-focus/financial-advisory",
    },
  ];

  const advertData = [
    {
      image: "./images/house.jpg",
      text: "Your dream house doesn't cost a fortune",
      url: "/our-focus/wealth-management",
      button: "Get it Now",
    },
    {
      image: "./images/car.jpg",
      text: "You deserve a new car",
      url: "/our-focus/wealth-management",
      button: "Get one today",
    },
    {
      image: "./images/gadget.jpg",
      text: "Looking to have new appliances for your home?",
      url: "/our-focus/wealth-management",
      button: "Get it Now",
    },
  ];

  const expSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const expnSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: "",
    nextArrow: "",
    arrows: false,
    afterChange: handleAfterChange,
  };

  const readmeSettings = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    centerMode: false,
    prevArrow: false,
    nextArrow: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3.1,
    slidesToScroll: 1,
    autoplay: true,
    initialSlide: 0,
    prevArrow: false,
    nextArrow: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div id="about" className="relative font-lex">
      <Modal isOpen={modalOpen} onClose={handleModalClose} />
      {/* md:mt-36 lg:mt-48 xl:mt-60 lg:mx-10*/}
      {/* bg-[linear-gradient(to_right,#DDFFF7,#FAFFF8,#FAFFF8,#FBFFFA,#DDEFFF)] */}
      {/* bg-[linear-gradient(to_bottom, rgba(255, 255, 255, 0.6), #fff)] */}
      {/* bg-gradient-to-b from-[rgba(255, 255, 255, 0.6)]  to-[#fff]*/}
      <div className="relative w-[90%] px-1 bg-gradient-to-b from-[#ffffff99] backdrop-blur-3xl to-[#fff] shadow-lg lg:mb-[30rem] max-sm:mb-[7rem] rounded-xl mx-auto  lg:-mt-[20.5rem]   z-15 border-2 py-10">
        {/* <Marquee direction="right" delay="2" gradient="false" gradientWidth={0}> */}
          <div className="hidden md:block">
            <h2 className="text-center font-extrabold text-2xl md:text-5xl font-mont">
              Creating Extraordinary Customer Experience.
            </h2>
            <p className="text-center font-medium mt-3 text-xl font-mont">
              We Are a Shariah Compliant Fund Management Company
            </p>
          </div>
        {/* </Marquee>   */}
        <div className="block md:hidden px-6 md:px-0">
          <h2 className=" text-center font-bold text-2xl font-mont">
            Creating Extraordinary Customer Experience.
          </h2>
          <p className="text-center mt-3 text-lg font-mont">
            We Are a Shariah Compliant Fund Management Company
          </p>
        </div>
        <div>
          <Slider {...expSettings}>
            {advertData?.map((item, i) => (
              <AdvertCard
                key={i}
                item={item}
                i={i}
                handleModalOpen={handleModalOpen}
              />
            ))}{" "}
          </Slider>
        </div>
        <div className="grid md:grid-cols-3 gap-12 mt-24 max-w-6xl mx-auto ">
          <div
            data-aos="fade-right"
            className="bg-gray-200 text-primary hover:text-gray-200 hover:bg-primary p-6 grid gap-4"
          >
            <img src="images/shape-2.png" alt="Shape" />
            <p className="text-2xl md:text-3xl font-bold">Integrity</p>
            <p className="text-md md:text-lg font-semibold">
              We believe that transparency, honesty and communication is key in
              investor relations
            </p>
            <p className="flex justify-end">
              <HiOutlineChevronRight />
            </p>
          </div>
          <div
            data-aos="fade-up-left"
            className="text-primary bg-gray-200 hover:text-gray-200 hover:bg-primary p-6 grid gap-4"
          >
            <img src="images/shape-2.png" alt="Shape" />
            <p className="text-2xl md:text-3xl font-bold">Digital</p>
            <p className="text-md md:text-lg font-semibold">
              {` Our primary funding profiles and business activities are focused
                on Shari'ah permissible products`}
            </p>
            <p className="flex justify-end">
              <HiOutlineChevronRight />
            </p>
          </div>
          <div
            data-aos="fade-left"
            className="text-primary bg-gray-200 hover:text-gray-200 hover:bg-primary p-6 grid gap-4"
          >
            <img src="images/shape-2.png" alt="Shape" />
            <p className="text-2xl md:text-3xl font-bold">Business</p>
            <p className="text-md md:text-lg font-semibold">
              We operate digitally as we are now in a digital age. So you can
              open account digitally.
            </p>
            <p className="flex justify-end">
              <HiOutlineChevronRight />
            </p>
          </div>
        </div>
      </div>
      {/* <div className="">
        <img
          src="images/rosary.png"
          alt="rosary"
          className="w-[1200px] mx-auto h-auto z-10 -mt-[300px] md:-mt-[650px]"
        />
      </div> */}
      {/* focus */}
      <div id="focus" className="-mt-20 md:-mt-60 relative">
        <img
          src="/images/green-bg.png"
          alt="background"
          className="relative h-[600px] sm:h-[500px] md:h-[450px] w-full bg-primary"
        />
        <div className="absolute -mt-[450px] md:-mt-96">
          <p className="text-center  text-3xl text-white font-lex mb-8 md:mb-20">
            Area of Focus
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 px-5">
            <div className="hidden md:flex justify-center w-full">
              <Slider
                {...expnSettings}
                className="flex w-[70%] mx-[15%] h-[500px] border-none rounded-xl"
              >
                {focus?.map((item, i) => (
                  <AreaFocusCard key={i} item={item} i={i} />
                ))}
              </Slider>
            </div>
            <div className="hidden md:flex">
              <ul className="text-2xl md:text-3xl grid gap-8 md:gap-10">
                {focus?.map((item, i) => (
                  <li
                    key={i}
                    className={
                      activeIndex === i
                        ? `${
                            item.url === "/our-focus/wealth-management" ||
                            item.url === "/our-focus/financial-advisory"
                              ? "text-primary"
                              : "text-white"
                          } py-2 font-semibold space-x-2 items-center font-Lex flex text-2xl md:text-3xl`
                        : "py-2 space-x-3  font-Lex flex font-normal  items-center text-2xl md:text-3xl"
                    }
                    onClick={() => router.push(item.url)}
                  >
                    {activeIndex === i ? (
                      <div className={`flex gap-2 items-center`}>
                        <CiPaperplane
                          className={`${
                            item.url === "/our-focus/wealth-management" ||
                            item.url === "/our-focus/financial-advisory"
                              ? "text-primary"
                              : "text-white"
                          }  w-10 h-auto`}
                        />
                        {item.text}{" "}
                      </div>
                    ) : (
                      <div
                        className={`${
                          item.url === "/our-focus/wealth-management" ||
                          item.url === "/our-focus/financial-advisory"
                            ? "text-primary"
                            : "text-white"
                        } `}
                      >
                        {item.text}{" "}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex md:hidden space-x-4">
              <ul className="text-2xl md:text-3xl grid gap-8 md:gap-10 text-white">
                <li className="flex items-center font-semibold space-x-2">
                  <Link
                    className="flex items-center pl-8 py-3 my-6 space-x-3 "
                    href="/our-focus/portfolio"
                  >
                    Portfolio/Fund Management
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center pl-8 py-3 my-6 space-x-3 "
                    href="/our-focus/mutual-fund"
                  >
                    Mutual Funds
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center pl-8 py-3 my-6 space-x-3 "
                    href="/our-focus/training"
                  >
                    Training and Conferences
                  </Link>
                </li>
                <li className="text-white md:text-black">
                  <Link className="" href="/our-focus/wealth-management">
                    Wealth Management & Financial Planning
                  </Link>
                </li>
                <li className="text-white md:text-black">
                  <Link className="" href="/our-focus/financial-advisory">
                    Financial Advisory Services
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 md:mt-96 bg-white">
        <div className="flex justify-between items-center w-full md:mr-48">
        {/* hidden md:flex */}
          <div className="w-1/2 hidden md:flex flex-col ">
            <img src="images/women.png" alt="women" />
            {/* <div className="relative w-0 h-0 border-t-[100px] border-b-[100px] border-l-[100px] border-transparent block rotate-[14deg] -mt-[33rem] ml-[42rem] z-15 border-l-blue-500"></div> */}
            {/* <div className=" relative z-15 bg-white w-[13em] h-[35em] block rotate-[14deg] rounded-br-[7em] -mt-[33rem] ml-[40rem]"></div> */}
          </div>
          <div className="md:max-w-sm grid gap-10  mx-auto py-10 md:py-0 px-5 md:px-0 md:text-left">
            <p className="text-2xl md:text-3xl font-lex font-bold">
              Ethically Invest with us today{" "}
            </p>
            <p className="text-lg md:text-xl font-mont">
              {`At D'Namaz our target audience is everyone irrespective of
                religion, belief, culture, status or tribe. Islamic Finance is
                about profit sharing and loss bearing, and therefore prohibits
                interest!`}
            </p>
            <a href="/open-account" className="flex justify-start">
              <Button text="Get Started" />
            </a>
          </div>
        </div>
      </div>

      {/* Article */}
      <div className="my-20">
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-lex font-bold text-gray-600 mb-10">
            Read Our Articles
          </p>
        </div>
        {/* Large Screens */}
        <div className="mt-4 md:flex flex-col">
          <div className="my-8 hidden md:flex rounded-2xl">
            <Slider {...readmeSettings} className="mx-2">
            {threeBlog && threeBlog.length > 0 ? (
              threeBlog.map((oneBlog, i) => <ArticleCard key={i} {...oneBlog} />)
                ) : (
                     ""
                        )}
              {/* {threeBlog?.map((oneBlog, i) => (
                <ExclusiveVideo key={i} {...oneBlog} />
              ))} */}
            </Slider>
          </div>
          {/* small screens */}
          <div className="md:hidden overflow-hidden rounded-2xl">
            <Slider {...settings}>
            {threeBlog && threeBlog.length > 0 ? (
              threeBlog.map((oneBlog, i) => <ArticleCard key={i} {...oneBlog} />)
                ) : (
                     ""
                        )}
              {/* {threeBlog?.map((oneBlog, i) => (
                <ArticleCard key={i} {...oneBlog} />
              ))} */}
            </Slider>
          </div>
          <div
            className="flex space-x-2 justify-center items-center cursor-pointer"
            onClick={() => router.push("/blog")}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="text-lg md:text-xl flex justify-center space-x-4 items-center mt-10 text-primary">
                <Link href="/blog">Read More Articles</Link>
                <HiArrowLongRight />
              </div>
            </motion.button>
          </div>
          <div id="down"></div>
        </div>
      </div>
    </div>
  );
}


export default Card;
