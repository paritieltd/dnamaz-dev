import { useRouter } from "next/router";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./our-focus.module.css";

const OurFocus = ({ children }) => {
  const router = useRouter();
  const sidebarItem = [
    {
      title: "Portfolio/Fund Management",
      url: "/our-focus/portfolio",
    },
   
    {
      title: "Financial Advisory Services",
      url: "/our-focus/financial-advisory",
    },
    {
      title: "Mutual Funds",
      url: "/our-focus/mutual-fund",
    },
    {
      title: "Wealth Management & Financial Planning",
      url: "/our-focus/wealth-management",
    },
    {
      title: "Training and Conferences",
      url: "/our-focus/training",
    },
  ];

  return (
    <div className="bg-[#C8C8C8]/50">
      <Navbar />
      <div className="h-[15vh]"></div>
      <article className="mb-20">
        <section className="mt-20 flex gap-10 xl:gap-36 px-6 md:pl-0 md:pr-10">
          <div className="hidden md:block bg-[#EAEAEA] pt-5 pb-2 pl-7 pr-4 w-64 h-fit">
            <ul className="last:border-b-0">
              {sidebarItem.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    router.push(item.url);
                  }}
                  className={`${styles.listItems} ${
                    router.pathname.includes(item.url) && styles.active
                  } ${
                    router.pathname.includes(item.url) && "font-bold"
                  } relative text-sm lg:text-base p-3 uppercase cursor-pointer border-b border-b-[#f4f4f4]`}
                >
                  {item.title}
                </li>
              ))}
            </ul> 
          </div>
          <div className="max-w-[800px]">{children}</div>
        </section>
      </article>
      <Footer />
    </div>
  );
};

export default OurFocus;
