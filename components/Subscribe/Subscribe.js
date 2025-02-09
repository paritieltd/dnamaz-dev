import React, { useEffect } from "react";
import styles from "./subscribe.module.css";
import AOS from "aos";

const Subscribe = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 700,
    });
  }, []);
  return (
    <>
    <div className="-mt-2" data-aos="fade-up" >
      <div className={styles.subscribesContainer}>
        <div
          className={`${styles.subscribes}  relative lg:grid grid-cols-[1fr,.8fr] xl:grid-cols-2 w-full xl:w-[90%] mx-auto h-60 sm:h-[350px] md:h-[530px]`}
        >
          <div className="h-full flex flex-col justify-center items-center lg:items-end text-white ">
            <div className="text-center lg:text-start font-Lex">
              <h2 className="uppercase text-base sm:text-2xl font-bold mb-2 sm:mb-0">
                <span className="text-xl sm:text-3xl">S</span>ubscribe to <br className="hidden lg:block" />{" "}
                our <span className="text-xl sm:text-3xl">N</span>ewsletter
              </h2>
              <p className="text-sm my-6 hidden sm:block">
                Get updates on our promotions by subscribing to our <br />{" "}
                monthly newsletter.
              </p>
              <div className="flex flex-col justify-start">
                <input
                  className="text-[#DEE1E2] min-w-[280px] xl:w-80 px-3 py-[10px] bg-transparent outline-none  placeholder:text-[#DEE1E2] border-b-white border-b-2 md:w-[600px]"
                  type="email"
                  placeholder="Enter"
                />
                <div className="flex">
                <button
                  className="hover:bg-green-900 sm:w-[unset] transition-all duration-500 bg-custom-primary text-white items-start md:auto py-3 px-10 mt-4 rounded-lg"
                  type="button"
                >
                  Subscribe
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gradient-to-r from-[#2E9F00] from-0% to-[#F7BD01] to-96% h-8"></div>
    </>
  );
};

export default Subscribe;
