import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";
import contact from "../assets/contact.jpg";
const Contact = () => {
  return (
    <div className="w-[99vw] pb-10 min-h-screen flex items-center justify-center flex-col  bg-linear-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-20">
      <Title text1={"CONTACT"} text2={"US"} />
      <div className="w-full  flex items-center justify-center flex-col lg:flex-row">
        <div className="lg:w-[50%] w-full flex items-center justify-center ">
          <img
            src={contact}
            alt=""
            className="lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm"
          />
        </div>
        <div className="lg:w-[50%] w-[80%] flex items-start justify-center gap-5  flex-col mt-5 lg:mt-0">
          <p className="lg:w-[80%] w-full text-[white] font-bold lg:text-[18px] text-[15px]">
            Our Store
          </p>
          <p className="lg:w-[80%] w-full text-[white] md:text-[16px] text-[13px]">
            <p>Ranipokhari</p>
            <p> Dehradun , Uttrakhand , India</p>
          </p>
          <p className="lg:w-[80%] w-full text-[white] md:text-[16px] text-[13px]">
            <p>tel: +91-9119001283</p>
            <p>Email: admin@smartcart.com</p>
          </p>
          <p className="lg:w-[80%] w-full text-[15px] text-[white] lg:text-[18px] mt-2.5 font-bold">
            Careers at SmartCart
          </p>
          <p className="lg:w-[80%] w-full text-[white] md:text-[16px] text-[13px]">
            Learn more about our teams and job openings
          </p>
          <button className="px-[30px] cursor-pointer py-5 flex items-center justify-center text-[white] bg-transparent border active:bg-slate-600 rounded-md">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
