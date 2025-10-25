import React from "react";
import NavBar from "../components/comman/NavBar";
import ReachUs from "../components/Contact/ReachUs";
import ContactForm from "../components/about/ContactForm";
import Footer from "../components/comman/Footer";

const ContactPage = () => {
  return (
    <div>
      <NavBar />
      <div className="flex max-w-maxContent flex-col sm:max-lg:items-center lg:flex-row w-11/12 mx-auto py-[90px] gap-[52px]">
        <ReachUs />
        <div className="border p-[30px] md:p-[52px] rounded-xl  border-[#424854]">
          <div className="flex flex-col  gap-6">
            <h2 className="text-richblack-5 text-start md:text-center text-4xl font-semibold">
              Got a Idea? We’ve got the skills. Let’s team up{" "}
            </h2>
            <p className="text-richblack-300 text-start md:text-center font-medium">
              Tell us more about yourself and what you’re got in mind.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* reviewslider */}
      <Footer />
    </div>
  );
};

export default ContactPage;
