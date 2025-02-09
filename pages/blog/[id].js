import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import Navbar from "../../components/Navbar/Navbar";
import { FaChevronLeft as ChevronLeftIcon, FaChevronCircleLeft } from "react-icons/fa";
import Subscribe from "../../components/Subscribe/Subscribe";
import Footer from "../../components/Footer/Footer";


export const getStaticPaths = async () => {
  const response = await axios.get(
    `https://dnamazcapital.blog/wp-json/wp/v2/blog`
  );
  const blogs = response.data;
  const paths = blogs.map(blog =>{
    return {
      params: {id: blog.id.toString()}
    }
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async(context) =>{
  const id = context.params.id
  const response = await axios.get(`https://dnamazcapital.blog/wp-json/wp/v2/blog/${id}`)
  const oneBlog = response.data
  return{ 
    props: {oneBlog: oneBlog}
  }
}

const SingleBlog = ({oneBlog}) => {
  const { acf, excerpt, date, title, id, featured_media, content } = oneBlog;

  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchMedia() {
      const mediaResponse = await axios.get(
        `https://dnamazcapital.blog/wp-json/wp/v2/media/${featured_media}`
      );
      setImage(mediaResponse.data);
    }
    fetchMedia();
  }, [featured_media]);

  

  const router = useRouter();
  const dated = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dated);
    
  if (!image) {
    return <div>Loading...</div>;
  }
  console.log(image)
  const { media_details, alt_text} = image;
  const imageUrl = media_details.sizes.full.source_url;

  return (
    <>
    <div className="bg-[#C8C8C8]/50 text-[#2C393F]">
      <Navbar />
      <div className="max-w-[1200px] sm:mx-2 md:mx-4 lg:mx-28 p-4 ">
        <div className="mt-[18vh] md:mt-[15vh] lg:mt-[20vh] w-full flex flex-col">
          <div
            className="flex space-x-2 items-center cursor-pointer "
            onClick={() => router.push("/blog")}
          >
            <FaChevronCircleLeft color="#1D5506" size={30}/>{" "}
            <span className="text-[#939495]">Back</span>
          </div>
          <div className="mt-5 font-bold text-xl sm:text-4xl md:text-[40px] text-black">
            {title.rendered}{ <span className="font-medium text-xl" dangerouslySetInnerHTML={{__html:excerpt?.rendered}}/>}
          </div>
          <div className="mt-2">
            <span className="text-[#1D5506] font-bold">{acf.category}</span>
            <span className="text-[#939495]"> | {formattedDate}</span>
          </div>
        </div>
        <div className=""></div>
        
          <img
            className="mt-6 w-[100%] mx-auto"
            src={imageUrl}
            alt={alt_text}
            
          />
    
        <div className="sm:text-xl mt-8" dangerouslySetInnerHTML={{__html:content.rendered}}>
          {/* <ReactMarkdown>{content.rendered}</ReactMarkdown> */}
          {/* Use optional chaining operator */}
        </div>
      </div>
      <Subscribe />
      <Footer />
      </div>
    </>
  );
};

export default SingleBlog;