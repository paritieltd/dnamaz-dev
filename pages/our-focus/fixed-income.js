import OurFocus from "../../components/OurFocus";

const MutualFunds = () => {
  return (
    <OurFocus>
      <div className="max-w-[800px]">
        <div className="md:mt-10">
          <p className="text-3xl uppercase text-center text-green-900 font-bold">
            Fixed Income
          </p>
          <div className="mt-10">
            <img
              className=""
              src="/images/fixed-income.png"
              alt="fixed income"
            />
          </div>
        </div>
        <div className="mt-20">
          
          <p className="mb-4 text-[20px] text-justify">
            We seek to achieve an efficient balance between capital appreciation
            and income for our investors with moderate risk appetite using
            D’Namaz Shari’ah fixed income Fund. This Fund will be invested in
            instruments such as FGN Sukuk Bonds, Sub National Sukuk, Corporate
            sukuk and other investments grade fixed income instruments giving
            our investors an opportunity to invest in secure and high yielding
            sukuk bonds offered by the federal, state governments of Nigeria and
            large corporations
          </p>
        </div>
      </div>
    </OurFocus>
  );
};

export default MutualFunds;
