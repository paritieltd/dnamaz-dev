import { useContext } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import BoardMember from "../../../components/BoardMember";
import Subscribe from "../../../components/Subscribe/Subscribe";
import Footer from "../../../components/Footer/Footer";

const BoardMemberPage = () => {
  return (
    <article className="bg-[#F5F5F5]">
      <Navbar />
      <div className="h-[20vh]"></div>
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 mt-10">
        <p className="text-sm text-green-900 uppercase font-semibold mb-3 tracking-[6px]">{`About us > Members`}</p>
        <p className="text-lg sm:text-2xl font-semibold uppercase tracking-wide">
          Meet our board members
        </p>
        <div className="mt-20">
          <BoardMember
            url="/about/board-member/1"
            imgUrl="/images/sirage-abdullahi.png"
            name="Siraj M. Abdullah"
            title="Chairman"
            description="Siraj Abdullahi is a well trained Banker and a skillful credit analyst. He started his career in Banking at
            Continental Merchant Bank Plc in 1989, his experience within the Banking Industry spans over Ten (10)
            years. "
          />
          <BoardMember
            url="/about/board-member/2"
            imgUrl="/images/m-m-gabi.png"
            name="Muhammad M. Gabi"
            title="Managing Director/CEO"
            description="Gabi is a seasoned and well-grounded professional with over a decade
          and half years of experience managing and providing strategic
          leadership to organizations with proven track records of successes..."
          />

          <BoardMember
            url="/about/board-member/3"
            imgUrl="/images/nasir-mahmud.png"
            name="Nasir Mahmud"
            title="Board Member"
            description="Nasir is a Board Member of D'namaz Capital Limited. he brings to the Board his extensive working experience as a financial
            expert with competences in Tax advisory and compliance, Accounting as well as analysis and
            interpretation of financial statements..."
          />
          <BoardMember
            url="/about/board-member/4"
            imgUrl="/images/abayomi.JPG"
            name="Abayomi T. Oyekola"
            title="Board Member"
            description="Abayomi T. Oyekola is a Certified Information Systems Auditor and a
            Chartered Accountant with robust experience acquired over the years
            in delivering optimal results in business value monitoring Information
            Technology (IT) control, management and governance processes in
            high-growth environments.
            ...."
          />
        </div>
      </section>
      <section>
        <Subscribe />
      </section>
      <Footer />
    </article>
  );
};

export default BoardMemberPage;
