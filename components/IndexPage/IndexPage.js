import React, { useEffect, useState } from "react";
import AOS from "aos";
import axios from "axios";
import {
  AdvertCard,
  AreaFocusCard,
  ArticleCard,
  ExclusiveVideo,
  ExperienceCard,
} from "../Cards/Cards";
import { ArrowIcon } from "../SvgIcon/SvgIcon";
import styles from "./IndexPage.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedinIn,
  FaPaperPlane,
  FaAngleRight,
  FaTwitter,
} from "react-icons/fa";
import halal from "../../public/images/Halal.png";
import Wallet from "../../public/images/Wallet.png";
import ladies from "../../public/images/no-bg-banner.png";
import tesbao from "../../public/images/tesbao.png";
import Modal from "../Modal/modal";
import send from "../../public/images/send.png";

export const Experience = [
  {
    icon: "./images/IntegritIcon.png",
    title: "Integrity",
    desc: "We believe that transparency, honesty and communication is key in investor relations",
  },
  {
    icon: "./images/BusinessIcon.png",
    title: "Business",
    desc: "Our primary funding profiles and business activities are focused on Shari’ah permissible products",
  },
  {
    icon: "./images/BackgroundDigital.png",
    title: "Digital",
    desc: "We operate digitally as we are now in a digital age. So you can open account digitally.",
  },
];

export const focus = [
  {
    image: "./images/pm.png",
    text: "Portfolio/Fund Management",
    url: "/our-focus/portfolio",
  },
  {
    image: "./images/mutual-fund-slider.png",
    text: "Mutual Funds",
    url: "/our-focus/mutual-fund",
  },
  {
    image: "./images/wealth-management.jpg",
    text: "Wealth Management & Financial Planning",
    url: "/our-focus/wealth-management",
  },
  {
    image: "./images/Financial-Advisory-Services-2.png",
    text: "Financial Advisory Services",
    url: "/our-focus/financial-advisory",
  },
  {
    image: "./images/training.jpg",
    text: "Training and Conferences",
    url: "/our-focus/training",
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

const IndexPage = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [threeBlog, setAllBlog] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const API_ENABLED = false;

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
    AOS.init({
      offset: 200,
      duration: 700,
    });
  }, []);

  useEffect(() => {
    if(!API_ENABLED) return;
    async function fetchBlog() {
      const response = await axios.get(
        `https://dnamazcapital.blog/wp-json/wp/v2/blog?per_page=3`
      );
      setAllBlog(response.data);
    }
    fetchBlog();
  }, []);

  if (!threeBlog) {
    return <div></div>;
  }

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

  const advertSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-[#baf8ba]/[.2] from-5% via-[#f8f8f8] via-10% to-[#baf8ba]/[.2] to-95% pb-4">
      <Modal isOpen={modalOpen} onClose={handleModalClose} />
      <div className="flex flex-col items-center w-[100vw] ">
        <div className="flex flex-col justify-center items-center text-[#393939] z-[20000] mt-[125px]">
          <h1 className="text-2xl font-bold md:text-3xl md:font-extrabold font-Lato lg:text-5xl xl:text-6xl">
            {" "}
            Earn More...{" "}
          </h1>
          <h1 className="text-2xl font-bold md:text-3xl md:font-extrabold font-Lato lg:text-5xl xl:text-6xl">
            The <span className="text-[#1D5506]">Ethical & Halal</span> More.
          </h1>
          <div className="flex flex-col justify-center items-center mt-2 md:mt-6 ">
            <p className="font-normal text-[12px] md:font-medium md:text-sm lg:text-sm xl:text-base">
              Tailored to every investor’s current and future
            </p>
            <p className="font-normal text-[12px] md:font-medium md:text-sm lg:text-sm xl:text-base">
              wealth aspiration.
            </p>
          </div>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <span
              onClick={() => router.push("/open-account")}
              className="w-36 h-6 rounded-xl text-sm font-normal font-outfit bg-[#1D5506] text-white hover:bg-white hover:text-[#1D5506] hover:border hover:border-[#1D5506] mt-6 mb-1 md:mb-10 md:w-36 md:h-8 md:font-normal md:text-base flex justify-center items-center md:rounded-2xl lg:mt-10 lg:text-lg lg:w-44 xl:w-52 xl:text-xl xl:h-12 lg:h-10"
            >
              Get Started
            </span>
          </motion.button>
        </div>

        <div className="md:z-50">
          <p className="font-normal lg:mt-10 font-Lex text-sm md:font-medium md:text-sm lg:text-sm xl:text-sm mb-1 text-[#322E29]">
            Follow us for more
          </p>
          <div className="flex justify-between text-[#1D5506] ">
            <a
              className="hover:cursor-pointer"
              href="https://www.facebook.com/DnamazCapital"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-sm lg:text-base xl:text-xl" />
            </a>
            <a
              className="underline"
              href="https://www.instagram.com/dnamazcapital/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagramSquare className="text-sm lg:text-base xl:text-xl" />
            </a>
            <a
              className="underline"
              href="https://twitter.com/d_namazcapital"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-sm lg:text-base xl:text-xl" />
            </a>
            <a
              className="underline"
              href="https://www.linkedin.com/company/d-namaz-capital-limited/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="text-sm lg:text-base xl:text-xl" />
            </a>
          </div>
        </div>
        <div className="flex justify-between items-center w-[100%] -mt-20 md:-mt-44 lg:-mt-60">
          <div className="w-[20%]">
            <Image src={Wallet} alt="Wallet" className="w-[100%]" />
          </div>
          <div className="w-[20%]">
            <Image src={halal} alt="halal" className="w-[100%]" />
          </div>
        </div>

        {/* Overlay */}
        <div className="bg-[#ffffff]/[0.7] backdrop-blur py-[9%] px-[3%] w-[92%] md:p-[3%] mx-[4%] rounded-xl -mt-[25px] md:-mt-[40px] lg:-mt-[60px] xl:-mt-[160px] z-30">
          <div className="hidden md:block ">
            <Marquee
              direction="right"
              delay="2"
              gradient="false"
              gradientWidth={0}
              className="sm:pb-[2px] md:pb-[4px] lg:pb-[6px] bg-[#ffffff]/[0] "
            >
              
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-center font-Lex font-bold text-xl sm:text-xl md:text-[20px] text-[#2C393F] lg:text-[30px]">
                  Creating Extraordinary Customer Experience.
                </h2>

                <p className="text-center sm:text-[9px] mt-3 text-[#322E29] md:text-[13px] lg:text-[16px]">
                  We Are a Shariah Compliant Fund Management Company
                </p>
              </div>
            </Marquee>
          </div>
          <div className="md:hidden">
            <h2 className="text-center font-bold text-xl sm:text-2xl md:text-[20px] md:font-extrabold text-[#2C393F] lg:text-[30px]">
              Creating Extraordinary Customer Experience.
            </h2>
            <p className="text-center sm:text-[12px] mt-3 text-[#322E29] md:text-[14px] lg:text-[20px]">
              We Are a Shariah Compliant Fund Management Company
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
          <div className="flex flex-col lg:flex-row gap-[2%] flex-wrap justify-center">
            {Experience.map((item, i) => (
              <ExperienceCard item={item} key={i} />
            ))}
          </div>
        </div>
      </div>
      <div className="rotate-[7.82deg] hidden -mt-[45rem]  md:flex justify-center items-center relative">
        <Image src={tesbao} width={1200} height={1200} alt="tesbao" />
      </div>

      {/* Area of Focus */}
      <div
        className={`${styles.back} h-[40vh] md:h-[300px] lg:h-[500px] xl:h-[500px] md:-mt-8 lg:-mt-[12rem] lg:mb-8 z-40`}
      >
        <div className={`${styles.overlay} px-12 py-8`}></div>
      </div>
      <div className="-mt-[40vh] md:-mt-[300px] md:h-[400px] lg:h-[700px] lg:-mt-[480px] z-20000 mb-16 xl:-mt-[490px] xl:h-[750px]">
        <h1 className="text-center font-Lex font-extrabold text-white text-xl md:text-2xl lg:text-3xl mb-4 md:mb-8 lg:mb-12">
          Area of focus
        </h1>
        <div className="flex items-center">
          <div className="hidden md:flex justify-center w-[50%]">
            <Slider
              {...expnSettings}
              className="flex w-[70%] mx-[15%] h-[100%] border-none rounded-xl"
            >
              {focus?.map((item, i) => (
                <AreaFocusCard key={i} item={item} i={i} />
              ))}
            </Slider>
          </div>
          <div className="">
            <ul
              className={`hidden md:flex flex-col md:gap-8 lg:gap-20 ${styles.list}`}
            >
              {focus?.map((item, i) => (
                <li
                  key={i}
                  className={
                    activeIndex === i
                      ? "font-semibold items-center font-Lex flex text-base md:text-[1.2rem] text-white lg:text-2xl xl:text-3xl"
                      : "font-Lex flex font-normal text-base md:text-[1.2rem] text-white items-center lg:text-2xl xl:text-3xl"
                  }
                  onClick={() => router.push(item.url)}
                >
                  {activeIndex === i ? (
                    <div className="flex gap-2 items-center">
                      <Image src={send} width={30} height={20} alt="pointer" />
                      {item.text}{" "}
                    </div>
                  ) : (
                    <div>{item.text} </div>
                  )}
                </li>
              ))}
            </ul>
            <ul className={`h-auto md:hidden flex-col gap-8 `}>
              {focus?.map((item, i) => (
                <li
                  key={i}
                  className="group ml-2 font-Lex flex items-center gap-4 mb-4 font-normal text-xl hover:font-bold text-white "
                  onClick={() => router.push(item.url)}
                >
                  <Image
                    src={send}
                    width={30}
                    height={20}
                    alt="pointer"
                    className="hidden"
                  />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      

      {/* Ethical Section */}
      <div className="flex w-[100vw] h-auto bg-white items-center mb-4 gap md:mb-8">
        <div className="hidden md:flex relative w-[50vw]">
          <Image
            src={ladies}
            alt="people"
            className={`${styles.diagonal} w-[50vw] `}
          />
          <div className={`${styles.slantLine} ${styles.left}`}></div>
          <div className={`${styles.slantLine} ${styles.right}`}></div>
        </div>

        <div className="flex flex-col w-[95%] ml-[5%] md:w-[45vw] my-16 md:mx-[2.5vw] justify-center">
          <h1 className="font-Lex text-3xl font-extrabold mb-8 xl:text-5xl">
            Ethically Invest
            <br />
            with Us today
          </h1>
          <p className="font-medium text-sm w-[70%] xl:text-base">
            At D’Namaz our target audience is ‘everyone’ irrespective of
            religion, belief, culture, status or tribe. Islamic Finance is about
            profit sharing and loss bearing, and therefore prohibits interest!
          </p>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <span
              onClick={() => router.push("/open-account")}
              className="w-36 h-8 rounded-xl text-sm font-normal font-outfit bg-[#1D5506] text-white hover:bg-white hover:text-[#1D5506] hover:border hover:border-[#1D5506] mt-6 mb-1 md:mb-10 md:w-36 md:h-10 md:font-normal md:text-base flex justify-center items-center md:rounded-2xl lg:mt-10 lg:text-lg lg:w-44 xl:w-52 xl:text-xl xl:h-14 lg:h-12"
            >
              Get Started
            </span>
          </motion.button>
        </div>
      </div>
      {/* Article */}
      <div className="my-6" data-aos="fade-up">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-2xl font-extrabold">Read Our Articles</h1>
          <div className="h-1 w-[70px] bg-[#1D5506]"></div>
        </div>
        {/* Large Screens */}
        <div className="mt-4 md:flex flex-col">
          <div className="my-8 hidden md:flex rounded-2xl">
            <Slider {...readmeSettings} className="mx-2">
            {threeBlog && threeBlog.length > 0 ? (
              threeBlog.map((oneBlog, i) => <ExclusiveVideo key={i} {...oneBlog} />)
              ) : (
                ""
                  )}
              {/* {threeBlog?.map((oneBlog, i) => (
                <ExclusiveVideo key={i} {...oneBlog} />
              ))} */}
            </Slider>
          </div>
          {/* small screens */}
          <div className="md:hidden overflow-hidden">
            <Slider {...settings}>
            {threeBlog && threeBlog.length > 0 ? (
              threeBlog.map((oneBlog, i) => <ExclusiveVideo key={i} {...oneBlog} />)
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
              <div className="flex items-center justify-center space-x-2">
                <h2 className="text-lg font-bold text-[#1D5506] mt-4">
                  Read More Articles
                </h2>
                <span className="mt-4">
                  <ArrowIcon />
                </span>
              </div>
            </motion.button>
          </div>
          <div id="down"></div>
        </div>
      </div>
    </div>
  );
};
export default IndexPage;
