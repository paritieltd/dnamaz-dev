import OurFocus from "../../components/OurFocus";

const MutualFunds = () => {
  return (
    <OurFocus>
      <div className="max-w-[800px]">
        <div className="md:mt-10">
          <p className="text-3xl uppercase text-center text-green-900 font-bold">
            Training and Conferences
          </p>
          <div className="mt-10">
            <img className="" src="/images/training.jpg" alt="training" />
          </div>
        </div>
        <div className="mt-20">
          <p className="mb-4 text-[20px] text-justify">
            Our team of highly experienced and accredited professionals are
            focused on delivering value-based trainings to our esteemed clients
            across diverse sectors. Our trainings are specifically designed and
            tailored to identified needs of our clients’ businesses and human
            capital development requirements. Our conferences are highly
            educative and resourceful and are aimed at gathering individuals of
            diverse personalities and background with common interest. This
            platform allows them to meet one another, interact, learn and
            discuss issues, ideas and opportunities that focuses on topics of
            mutual concern. Our trainings focus on providing tools and
            information needed to excel in all career aspect, issues and ideas
            are discussed on how to resolve work related problems.
          </p>
        </div>
      </div>
    </OurFocus>
  );
};

export default MutualFunds;
