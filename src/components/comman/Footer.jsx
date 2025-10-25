import React from "react";
import { FaFacebookSquare, FaGoogle, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link } from "react-router-dom";
import { FooterLink2 } from "../../data/footer-links";

const Company = ["About", "Carrers", "Affiliates"];
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Support = ["Help Center"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-[#161D29]  mx-auto py-12 text-white">
      <div className="w-11/12 flex flex-col gap-9 mx-auto  max-w-maxContent">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 justify-between">
          <div className="flex justify-around gap-4 sm:gap-12">
            <div className="flex flex-col gap-4">
              <img src={logo} className="w-40 text-[#AFB2BF]" alt="logo" />
              <div className="flex flex-col gap-2">
                <h4 className="text-[#AFB2BF] font-semibold">Company</h4>
                <div className="flex flex-col text-[#6E727F] font-normal gap-1">
                  {Company.map((item, index) => {
                    return (
                      <Link
                        className="hover:text-[#AFB2BF] transition-all duration-200"
                        to={item.toLowerCase()}
                        key={index}
                      >
                        {item}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="flex text-[#6E727F]  gap-3">
                <Link to={"/facebook"}>
                  {" "}
                  <FaFacebookSquare className="hover:text-[#AFB2BF] transition-all duration-200" />
                </Link>
                <Link to={"/google"}>
                  <FaXTwitter className="hover:text-[#AFB2BF] transition-all duration-200" />
                </Link>
                <Link to={"/x"}>
                  {" "}
                  <FaGoogle className="hover:text-[#AFB2BF] transition-all duration-200" />
                </Link>
                <Link to={"/youtube"}>
                  <FaYoutube className="hover:text-[#AFB2BF] transition-all duration-200" />
                </Link>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <h4 className="text-[#AFB2BF] font-semibold">Resources</h4>
                  <div className="flex flex-col text-[#6E727F] font-normal gap-1">
                    {Resources.map((item, index) => {
                      return (
                        <Link
                          className="hover:text-[#AFB2BF] transition-all duration-200"
                          to={item.toLowerCase()}
                          key={index}
                        >
                          {item}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-[#AFB2BF] font-semibold">Support</h4>
                  <div className="flex flex-col text-[#6E727F] font-normal gap-1">
                    {Support.map((item, index) => {
                      return (
                        <Link
                          className="hover:text-[#AFB2BF] transition-all duration-200"
                          to={item.toLowerCase()}
                          key={index}
                        >
                          {item}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <h4 className="text-[#AFB2BF] font-semibold">Plans</h4>
                  <div className="flex flex-col text-[#6E727F] font-normal gap-1">
                    {Plans.map((item, index) => {
                      return (
                        <Link
                          className="hover:text-[#AFB2BF] transition-all duration-200"
                          to={item.toLowerCase()}
                          key={index}
                        >
                          {item}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-[#AFB2BF] font-semibold">Community</h4>
                  <div className="flex flex-col text-[#6E727F] font-normal gap-1">
                    {Community.map((item, index) => {
                      return (
                        <Link
                          className="hover:text-[#AFB2BF] transition-all duration-200"
                          to={item.toLowerCase()}
                          key={index}
                        >
                          {item}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[1px] bg-[#2C333F]"></div>
          <div className="flex justify-around gap-8 sm:gap-14">
            {FooterLink2.map((item, index) => {
              return (
                <div key={index}>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-[#AFB2BF] font-semibold">
                      {item.title}
                    </h4>
                    <div className="flex flex-col text-[#6E727F] font-normal gap-1">
                      {item.links.map((item, index) => {
                        return (
                          <Link
                            className="hover:text-[#AFB2BF] transition-all duration-200"
                            to={item.link}
                            key={index}
                          >
                            {item.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-[1px] bg-[#2C333F] "></div>
        <div className="flex flex-col md:flex-row items-center gap-5 justify-between ">
          <div className="flex gap-5">
            {BottomFooter.map((item, index) => {
              return (
                <Link
                  key={index}
                  className="text-[#838894] hover:text-[#AFB2BF]  font-normal transition-all duration-200"
                  to={item.toLowerCase().replace(" ", "-")}
                >
                  {item}
                </Link>
              );
            })}
          </div>
          <div>
            <p className="text-[#838894] font-normal">
              Made with love ❤️ Avadh © 2025 Studynotion
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
