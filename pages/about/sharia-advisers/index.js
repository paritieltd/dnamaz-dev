import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import BoardMember from "../../../components/BoardMember";
import Subscribe from "../../../components/Subscribe/Subscribe";
import Footer from "../../../components/Footer/Footer";

const BoardMemberPage = () => {
  return (
    <article className="">
      <Navbar />
      <div className="h-[20vh]"></div>
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 mt-10">
        <p className="text-sm text-green-900 uppercase font-semibold mb-3 tracking-[6px]">{`About us > Shari’ah Advisers`}</p>
        <p className="text-lg sm:text-2xl font-semibold uppercase tracking-wide">
          Meet our advisers
        </p>
        <div className="mt-20">
          <BoardMember
            url="/about/sharia-advisers/1"
            imgUrl="/images/saidmikail2.png"
            name="Dr. Sa‘id Adekunle Mikail"
            title="Chairman, Shari’ah advisory Council"
            description="Dr Mikail is currently a Senior Research Fellow at ISRA Research Management Centre of INCEIF Group and Asst. Prof at INCEIF University.  He is a Registered Shari’ah Adviser with Securities Commission of Malaysia (SC), a Member of Chartered Institute of Arbitrators (ACIArb) UK and Member of AAOIFI Working Group of the Curriculum Review Committee (CRC)."
          />
          <BoardMember
            url={`/about/sharia-advisers/2`}
            imgUrl="/images/ProfDogarawa.jpeg"
            name="Prof. Ahmad Bello Dogarawa"
            title="Member, Shari’ah advisory Council"
            description="Ahmad Bello Dogarawa is a Professor at the Department of Accounting, Ahmadu Bello University (ABU) Zaria, Nigeria. In addition to the academic degrees he obtained, he holds a Certificate in Islamic Religious Sciences, Da’awah (Islamic propagation) and Islamic Economics from the prestigious Al-Azhar University, Cairo. He was former Head of Department and Deputy Dean of ABU Business School. He is a member of Jaiz Bank’s Advisory Committee of Experts...."
          />
        </div>
      </section>
      <section className="-mt-10 sm:mt-56">
        <Subscribe />
      </section>
      <Footer />
    </article>
  );
};

export default BoardMemberPage;
