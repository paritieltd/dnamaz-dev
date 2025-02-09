import OurFocus from "../../components/OurFocus";

const MutualFunds = () => {
  return (
    <OurFocus>
      <div className="max-w-[800px]">
        <div className="md:mt-10">
          <p className="text-3xl uppercase text-center text-green-900 font-bold">
            Financial Advisory Services
          </p>
          <div className="mt-10">
            <img
              className=""
              src="/images/financial-advisory.png"
              alt="statistics"
            />
          </div>
        </div>
        <div className="mt-20">
          <p className="mb-4 text-[20px] text-justify">
            We make investment recommendations to our clients which relates to
            Merger and Acquisition (M & A), Private Placement, initial public
            offerings (IPOs) etc., conduct due diligence analysis and provide
            financial advice to clients. Our advisory services also extend to
            providing oversight and advice to clients to ensure continuous
            compliance of Asset Management products with Shariah requirements in
            Nigeria. We will help you determine the best investment and finance
            strategy and owe a fiduciary duty to all our clients.
          </p>
        </div>
      </div>
    </OurFocus>
  );
};

export default MutualFunds;
