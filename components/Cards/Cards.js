import React, { useState, useEffect } from "react";
import styles from "./Cards.module.css";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import axios from "axios";

export const ExperienceCard = ({ item }) => {
  return (
    <div
      className={`group w-[100%] h-auto py-4 lg:w-[27vw] xl:h-[20vw] my-8 bg-[#EEEEEE] hover:bg-[#1D5506] hover:text-white `}
      data-aos={
        item.title === "Integrity"
          ? "fade-right"
          : item.title === "Business"
          ? "fade-up-left"
          : "fade-left"
      }
    >
      <img src={item.icon} alt="" className="w-[40px] h-[40px] mx-6"/>
      <div className="mx-6 my-2 xl:m-6">
        <h2 className="text-base xl:text-2xl font-bold mb-2 text-[#1D5506] group-hover:text-white">{item.title}</h2>
        <p className="text-sm font-medium xl:text-base">{item.desc}</p>
      </div>
    </div>
  );
};

export const AreaOfFocusCard = ({ item }) => {
  const router = useRouter();
  return (
    <div
      className={`max-w-[360px] h-[400px] mr-4 cursor-pointer `}
      onClick={() => router.push(item.url)}
    >
      <div className={`relative`}>
        <img
          src={item.image}
          className="w-full h-[390px] object-cover"
          alt=""
        />
        <h2 className="absolute bottom-8 leading-8 text-center  mx-auto text-[24px] font-bold text-white px-6 z-[10]">
          {item.text}
        </h2>
        <div
          className={`absolute top-0 left-0 w-full h-full ${styles.areaImage}`}
        ></div>
      </div>
    </div>
  );
};

export const AdvertCard = ({ item, i, handleModalOpen }) => {
  const router = useRouter();
  return (
    <>
      <div
        className={`w-[85%] mx-[7.5%] h-[200px]  md:h-[30vw] lg:h-[35vw] cursor-pointer rounded-xl mt-8`}
      >
        <img src={item.image} className="h-full w-full rounded-2xl object-cover" alt="" />
      </div>
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-8 justify-center items-center my-4">
        <h2 className="font-bold text-center text-sm md:text-base lg:text-xl text-[#2C393F]">
          {item.text}
        </h2>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <span
          // md:px-6 md:py-2
            className="flex items-center justify-center space-x-3 transition-all px-[92px] py-[24px]  rounded-xl duration-300  font-medium bg-primary hover:bg-white hover:text-primary hover:border border-primary text-white"
            onClick={handleModalOpen}
          >
            {item.button}
          </span>
        </motion.button>
      </div>
    </>
  );
};

export const AreaFocusCard = ({ item, i }) => {
  const router = useRouter();
  return (
    <div
      className={`w-full h-[47vw] cursor-pointer rounded-xl`}
      onClick={() => router.push(item.url)}
    >
        <img
          src={item.image}
          className="h-[600px] w-full object-cover rounded-xl bg-cover bg-center"
          alt=""
        />
    </div>
  );
};

export const ArticleCard = ({
  acf,
  excerpt,
  date,
  title,
  id,
  featured_media,
}) => {
  const [image, setImage] = useState(null);
  const API_ENABLED = false;
  useEffect(() => {
    if (!API_ENABLED) return;
    async function fetchMedia() {
      const mediaResponse = await axios.get(
        `https://dnamazcapital.blog/wp-json/wp/v2/media/${featured_media}`
      );
      setImage(mediaResponse.data);
    }

    fetchMedia();
  }, [featured_media]);
  const router = useRouter();

  if (!API_ENABLED || !image) {
    return null
    // return <div>Loading...</div>;
  }

  const { media_details, alt_text } = image;
  const imageUrl = media_details.sizes.full.source_url;
  const dated = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dated);
  return (
    <>
    <div
        className="mx-[4vw] w-[92vw] h-[300px] cursor-pointer"
        onClick={() => router.push(`/blog/${id}`)}
      >
        <div className={`relative w-full h-full`}>
          {/* <img src={imageUrl} className="w-full h-full" alt={alt_text} /> */}
          <div className="absolute bottom-4  mx-auto text-white px-3 z-10">
            <div className="z-10">
              <div className="flex justify-between mb-2">
                <p>
                  {acf.category} | {formattedDate}
                </p>
              </div>
            </div>
            <div>
              <span>
                {title.rendered}{" "}
                <span
                  className="text-white hidden md:flex"
                  dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
                ></span>
              </span>
            </div>
          </div>
          <div
            className={`absolute top-0 left-0 w-full h-full ${styles.articleImage}`}
          ></div>
        </div>
      </div>
    </>
  );
};

export const BlogPostCard = ({
  acf,
  excerpt,
  date,
  title,
  id,
  featured_media,
}) => {
  const [image, setImage] = useState(null);
  const API_ENABLED = false;

  useEffect(() => {
    if (!API_ENABLED) return;
    async function fetchMedia() {
      const mediaResponse = await axios.get(
        `https://dnamazcapital.blog/wp-json/wp/v2/media/${featured_media}`
      );
      setImage(mediaResponse.data);
    }

    fetchMedia();
  }, [featured_media]);
  const router = useRouter();
  if (!API_ENABLED || !image) {
    return null; // Prevent rendering
  }
  // if (!image) {
  //   return <div>Loading...</div>;
  // }

  const { media_details, alt_text } = image;
  const imageUrl = media_details.sizes.full.source_url;
  const dated = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dated);

  return (
    <div className="max-h-[500px] mb-8 mr-4 rounded">
      {/* <img src={imageUrl} className="w-full h-[250px]" alt={alt_text} /> */}
      <div className="mt-5 ml-3 sm:ml-0">
        <div>
          <span className="text-[#010206] font-bold">{title.rendered}</span>
          <span dangerouslySetInnerHTML={{ __html: excerpt?.rendered }}></span>
        </div>
        <div className="flex justify-between items-center">
          <div className="mt-2">
            <span className="text-[#1D5506] font-bold">{acf.category}</span>
            <span className="text-[#939495]"> | {formattedDate}</span>
          </div>
          <span
            className="font-bold cursor-pointer hover:text-[#1D5506]/30"
            onClick={() => router.push(`/blog/${id}`)}
          >
            Read More...
          </span>
        </div>
      </div>
    </div>
  );
};

export const ExclusiveVideo = ({
  acf,
  excerpt,
  date,
  title,
  id,
  featured_media,
}) => {
  const [image, setImage] = useState(null);
  const API_ENABLED = false;
  useEffect(() => {
    if (!API_ENABLED) return;
    async function fetchMedia() {
      const mediaResponse = await axios.get(
        `https://dnamazcapital.blog/wp-json/wp/v2/media/${featured_media}`
      );
      setImage(mediaResponse.data);
    }

    fetchMedia();
  }, [featured_media]);
  const router = useRouter();
  if (!API_ENABLED || !image) {
    return null; // Prevent rendering
  }
  // if (!image) {
  //   return <div>Loading...</div>;
  // }

  const { media_details, alt_text } = image;
  const imageUrl = media_details.sizes.full.source_url;
  const dated = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dated);
  return (
    <div
      className="md:w-[45vw] md:h-[25vw] lg:w-[30vw] lg:h-[15vw] mr-8 cursor-pointer rounded-lg"
      onClick={() => router.push(`/blog/${id}`)}
    >
      <div className={`relative w-full h-full rounded-lg`}>
        {/* <img
          src={imageUrl}
          alt={alt_text}
          className="md:w-[50vw] md:h-[40vw] lg:w-[40vw] lg:h-[25vw] rounded-lg"
        /> */}
        <div className="absolute bottom-4 mx-auto text-white px-3 z-10 rounded-lg w-full font-Lex">
          <div className="z-10">
            <div className="flex justify-between mb-2">
              <p className="underline-offset-1">{acf.category}</p>
              <p>{formattedDate}</p>
            </div>
          </div>
          <div className="w-full">
            <span>
              {title.rendered}
            </span>
          </div>
        </div>
        <div
          className={`absolute top-[60%] left-0 w-full h-[40%] bg-gradient-to-b  from-[#010206]/[0] from-0% via-[#1d5506]/[.65] via-59.8%  to-[#1D5506] to-100% rounded-lg`}
        ></div>
      </div>
    </div>
  );
};
