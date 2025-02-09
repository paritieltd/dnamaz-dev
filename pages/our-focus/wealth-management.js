import OurFocus from "../../components/OurFocus";

const MutualFunds = () => {
  return (
    <OurFocus>
      <div className="max-w-[800px]">
        <div className="md:mt-10">
          <p className="text-3xl uppercase text-center text-green-900 font-bold">
            Wealth Management & Financial Planning.
          </p>
          <div className="mt-10">
            <img
              className=""
              src="/images/wealth-management.jpg"
              alt="research"
            />
          </div>
        </div>
        <div className="mt-20">
          <p className="mb-4 text-[20px] text-justify">
            We focus on preserving and growing your wealth the ethical way, by
            building a comprehensive road map based on your financial goals. Our
            Wealth Management and Financial Planning services are designed to
            help you attain your short- and long-term financial goals, ranging
            from planning the Education of your kids, taking your desired
            vacation trip, embarking on religious pilgrimage (such as Umrah/Hajj
            and other religious pilgrimages) estate planning, or offering you
            advisory services on how to plan for your retirement by helping you
            determine the amount of savings and investments required to help you
            attain your desired financial goals. We partner with reputable
            Takaful operators to create investment links that best suits
            your requirements.
          </p>
        </div>
      </div>
    </OurFocus>
  );
};

export default MutualFunds;
