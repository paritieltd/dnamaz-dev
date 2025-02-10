import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { BlogPostCard } from "../../components/Cards/Cards";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Subscribe from "../../components/Subscribe/Subscribe";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Blog = () => {
  const router = useRouter();
  const [allBlog, setAllBlog] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const API_ENABLED = false;

  useEffect(() => {
    if (!API_ENABLED) return;
    async function fetchBlog() {


      const response = await axios.get(
        `https://dnamazcapital.blog/wp-json/wp/v2/blog`
      );
      setAllBlog(response.data);
    }
    fetchBlog();
  }, []);

  if (!allBlog || !API_ENABLED) {
    // return <div></div>;
    return null;
  }
  // console.log(allBlog);
  {
    /* slider*/
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3.2,
    slidesToScroll: 1,
    autoplay: true,
    initialSlide: 0,
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
  {
    /*Pagination*/
  }
  const articlePerPage = 6;
  const articlePassed = articlePerPage * pageNumber;
  const displayArticles = 
  API_ENABLED && allBlog?
    allBlog.slice(articlePassed, articlePassed + articlePerPage)
    .map((blog, i) => {
      return <BlogPostCard key={i} {...blog} />;
    }): null;
  const pageCount = Math.ceil(allBlog.length / articlePerPage);

  const pageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="bg-[#C8C8C8]/50 text-[#2C393F]">
      <Navbar />
      {/* {(allPosts)} */}
      <div className="max-w-[1400px] sm:mx-2 md:mx-4 lg:mx-28 p-4 mx-auto">
        <div className="h-[45vh] md:h-[30vh] lg:h-[35vh] xl:h-[20vh] w-full flex-col flex  justify-end">
          
            <h1 className="text-2xl md:text-3xl mb-2 font-bold">
              WE HAVE A VARIETY OF ARTICLES FOR YOU.{" "}
            </h1>
            <p className="md:text-xl font-medium">
              Our articles are very informative, educative and easy to
              understand because we believe that the articles carter for various
              types of investor&#39;s knowledge.
            </p>
          
        </div>
        <div className="mt-20">
          <div >
            <h1 className="text-2xl font-extrabold uppercase">
              Article Category Header
            </h1>
            <div className="w-[88px] h-1 bg-[#1D5506]"></div>
          </div>

          {/* Large Screens */}

          <div className="mt-10 hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 ">
            {displayArticles}{" "}
          </div>
          {API_ENABLED && allBlog && allBlog.length > articlePerPage ? (
          <ReactPaginate
            breakLabel="..."
            nextLabel={<FaArrowAltCircleRight size={30}/>}
            pageCount={pageCount}
            onPageChange={pageChange}
            pageRangeDisplayed={5}
            previousLabel={<FaArrowAltCircleLeft size={30}/>}
            containerClassName={"hidden md:flex justify-center items-center"}
            pageLinkClassName={"flex items-center justify-center h-[40px] w-[40px] mx-[5px] rounded font-bold border-2 border-[#1D5506] hover:bg-[#1D5506] hover:text-[#fff]"}
            previousLinkClassName={" h-[40px] w-[40px] mx-[10px] rounded font-bold"}
            nextLinkClassName={" h-[40px] w-[40px] mx-[10px] rounded font-bold"}
            activeLinkClassName={"rounded text-[#fff] bg-[#1D5506]"}
          />
        ) : null}
          {/* Small Screens */}
          <div className="mt-10 md:hidden overflow-hidden lg:mx-28">
            <Slider {...settings}>
            {API_ENABLED && allBlog ? (
          allBlog.map((blog, i) => <BlogPostCard key={i} {...blog} />)
              ) : null}
              {/* {allBlog.map((blog, i) => (
                <BlogPostCard key={i} {...blog} />
              ))} */}
            </Slider>
          </div>
        </div>
      </div>

      <Subscribe />
      <Footer />
    </div>
  );
};

export default Blog;
