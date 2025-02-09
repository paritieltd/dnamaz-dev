import OurFocus from "../../components/OurFocus";

const MutualFunds = () => {
  return (
    <OurFocus>
      <div className="max-w-[800px]">
        <div className="md:mt-10">
          <p className="text-3xl uppercase text-center text-green-900 font-bold">
            Mutual Fund
          </p>
          <div className="mt-10">
            <img className="" src="/images/mutual-funds.jpg" alt="portfolio" />
          </div>
        </div>
        <div className="mt-20">
          <p className="mb-4 text-[20px] text-justify">
            With our team of experienced professionals with broad capital market
            expertise, we pool capital to utilize diversification and complex
            investment strategies to generate competitive returns for investors.
            We build and manage flexible portfolios that are designed to adapt
            to your dynamic needs and oversee a selection of investments
            portfolios across a range of sectors (i.e. real estates, equities,
            assets backed and trade finance) that meets the short and/or
            long-term financial goals and risk tolerance of our clients.
          </p>
        </div>
      </div>
    </OurFocus>
  );
};

export default MutualFunds;
