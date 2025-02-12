import Head from "next/head";
import axios from 'axios'
import Footer from "../components/Footer/Footer";
import IndexPage from "../components/IndexPage/IndexPage";
import Navbar from "../components/Navbar/Navbar";
import Subscribe from "../components/Subscribe/Subscribe";
import Hero from "../components/Hero";
import LandingPage from "./landing-page";
import Card from "../components/Card";

// export const getStaticProps = async () => {
//   const response = await axios.get("https://dnamaz-blog.herokuapp.com/api/posts?populate=*");
//   const data = response.data;

//   return {
//     props: {
//       posts: data,
//     },
//   };
// };

const posts = []

export default function Home({ posts }) {
  return (
    <div className="bg-[#EEEEEE]">
      <Head>
        <title>D’Namaz Capital - home</title>
        <meta name="description" content="We Are a Shariah Compliant Fund Management Company" />
        <meta name="description" content="D'Namaz Capital offers ethical and halal investment opportunities tailored to your wealth aspirations. Join us for Shariah-compliant fund management, mutual funds, and financial advisory services." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />


        <meta property="og:title" content="D'Namaz Capital - Shariah Compliant Fund Management" />
        <meta property="og:description" content="Explore ethical and halal investment opportunities with D'Namaz Capital. We provide Shariah-compliant fund management, mutual funds, and financial advisory services to meet your financial goals." />
        <meta property="og:url" content="https://dnamaz-personal.vercel.app" />
        <meta property="og:type" content="website" />

        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="D'Namaz Capital - Shariah Compliant Fund Management" />
        <meta name="twitter:description" content="Join D'Namaz Capital for ethical and halal investment solutions, including Shariah-compliant fund management and financial advisory services." />
        <link rel="icon" href="/favicon.ico" />
      </Head>     
      {/* <Navbar /> */}
      {/* <IndexPage posts={posts} /> */}
      {/* <div className="bg-[#1D5506] h-8">
      </div> */}
      <LandingPage/>
      {/* <Card /> */}
        {/* <Hero/> */}
      {/* <Subscribe  /> */}
      {/* <Footer /> */}
    </div>
  )
}
