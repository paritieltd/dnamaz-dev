import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import BoardMember from "../../../components/BoardMember";
import Subscribe from "../../../components/Subscribe/Subscribe";
import Footer from "../../../components/Footer/Footer";

const BoardMemberPage = () => {
  return (
    <article className="bg-[#F5F5F5]">
      <Navbar />
      <div className="h-[20vh]"></div>
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20">
        <p className="text-sm text-green-900 uppercase font-semibold mb-3 tracking-[6px]">{`About us > Team Members`}</p>
        <p className="text-lg sm:text-2xl font-semibold uppercase tracking-wide">
          Meet the awesome people behind the scene
        </p>
        <div className="mt-20">
        <BoardMember
            url="/about/team-member/3"
            imgUrl="/images/m-m-gabi.png"
            name="Muhammad M. Gabi"
            title="Managing Director/CEO"
            description="Gabi is a seasoned and well-grounded professional with over a decade
          and half years of experience managing and providing strategic
          leadership to organizations with proven track records of successes..."
          />
          <BoardMember
            url="/about/team-member/1"
            imgUrl="/images/olushola-micheal.png"
            name="Micheal O. Olushola"
            title="Compliance Officer"
            description="Michael is a dynamic and highly organized professional Accountant with many years of experience in the field of Accounting/Audit with ability to balance multiple competing priorities whilst still achieving strict deadlines for submission of assignments..."
          />
          {/* <BoardMember
            url="/about/team-member/2"
            imgUrl="/images/ifeoma-okafor.png"
            name="Ifeoma Juliet Okafor "
            title="Head, Corporate Services"
            description="Ifeoma heads the corporate services department at D'namaz Capital Limited. Her commitment and dedication in ensuring that all corporate affairs and operational activities are coordinated seamlessly while ensuring organizational strategic objectives are attained puts her in the position she occupies in D'namaz Capital Limited."
          /> */}
          <BoardMember
            url="/about/team-member/4"
            imgUrl="/images/elon-buba.png"
            name="Elon Markus Buba "
            title="Head, Business Development"
            description="Elon is a passionate and talented Accountant with a demonstrated history of successfully shouldering responsibilities and exceeding high expectations in a line of work that requires a high degree of accuracy, dedication, meticulousness and clear thinking... "
          />
           <BoardMember
            url={`/about/team-member/5`}
            imgUrl="/images/maiwada.png"
            name="Abdullahi M. Ahmad" 
            title="Legal Officer/Company Secretary"
            description="Abdullahi is a Law graduate from Ahmadu Bello University (ABU) and a practitioner with satisfactory skills in legal and litigation drafting, alternative dispute resolution, interviewing and counselling..."
          />
        </div>
      </section>
      <section className="pt-28">
        <Subscribe />
      </section>
      <Footer />
    </article>
  );
};

export default BoardMemberPage;
