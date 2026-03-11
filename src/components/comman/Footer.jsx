import React from "react";
import { FaFacebookSquare, FaGoogle, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/Logo/studypoint-logo.png";
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
    <div className="bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 text-white mx-auto py-16">
      <div className="w-11/12 flex flex-col gap-12 mx-auto max-w-maxContent">
        <div className="flex flex-col lg:flex-row gap-12 justify-between">
          <div className="flex justify-around gap-6 sm:gap-12">
            <div className="flex flex-col gap-6">
              <Link to="/" className="flex items-center">
                <img src={logo} className="h-16 w-auto object-contain" alt="StudyPoint Logo" />
              </Link>
              <div className="flex flex-col gap-3">
                <h4 className="text-neutral-300 font-semibold text-lg">Company</h4>
                <div className="flex flex-col text-neutral-400 font-normal gap-2">
                  {Company.map((item, index) => {
                    return (
                      <Link
                        className="hover:text-primary-400 transition-all duration-200"
                        to={item.toLowerCase()}
                        key={index}
                      >
                        {item}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="flex text-neutral-400 gap-4">
                <Link to={"/facebook"}>
                  <FaFacebookSquare className="hover:text-primary-400 transition-all duration-200 text-xl" />
                </Link>
                <Link to={"/x"}>
                  <FaXTwitter className="hover:text-primary-400 transition-all duration-200 text-xl" />
                </Link>
                <Link to={"/google"}>
                  <FaGoogle className="hover:text-primary-400 transition-all duration-200 text-xl" />
                </Link>
                <Link to={"/youtube"}>
                  <FaYoutube className="hover:text-primary-400 transition-all duration-200 text-xl" />
                </Link>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <h4 className="text-neutral-300 font-semibold text-lg">Resources</h4>
                  <div className="flex flex-col text-neutral-400 font-normal gap-2">
                    {Resources.map((item, index) => {
                      return (
                        <Link
                          className="hover:text-primary-400 transition-all duration-200"
                          to={item.toLowerCase()}
                          key={index}
                        >
                          {item}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-neutral-300 font-semibold text-lg">Support</h4>
                  <div className="flex flex-col text-neutral-400 font-normal gap-2">
                    {Support.map((item, index) => {
                      return (
                        <Link
                          className="hover:text-primary-400 transition-all duration-200"
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
                <div className="flex flex-col gap-3">
                  <h4 className="text-neutral-300 font-semibold text-lg">Plans</h4>
                  <div className="flex flex-col text-neutral-400 font-normal gap-2">
                    {Plans.map((item, index) => {
                      return (
                        <Link
                          className="hover:text-primary-400 transition-all duration-200"
                          to={item.toLowerCase()}
                          key={index}
                        >
                          {item}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-neutral-300 font-semibold text-lg">Community</h4>
                  <div className="flex flex-col text-neutral-400 font-normal gap-2">
                    {Community.map((item, index) => {
                      return (
                        <Link
                          className="hover:text-primary-400 transition-all duration-200"
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
          <div className="w-[1px] bg-neutral-700"></div>
          <div className="flex justify-around gap-8 sm:gap-14">
            {FooterLink2.map((item, index) => {
              return (
                <div key={index}>
                  <div className="flex flex-col gap-3">
                    <h4 className="text-neutral-300 font-semibold text-lg">
                      {item.title}
                    </h4>
                    <div className="flex flex-col text-neutral-400 font-normal gap-2">
                      {item.links.map((item, index) => {
                        return (
                          <Link
                            className="hover:text-primary-400 transition-all duration-200"
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
        <div className="h-[1px] bg-neutral-700"></div>
        <div className="flex flex-col md:flex-row items-center gap-5 justify-between">
          <div className="flex gap-5">
            {BottomFooter.map((item, index) => {
              return (
                <Link
                  key={index}
                  className="text-neutral-400 hover:text-primary-400 font-normal transition-all duration-200"
                  to={item.toLowerCase().replace(" ", "-")}
                >
                  {item}
                </Link>
              );
            })}
          </div>
          <div>
            <p className="text-neutral-400 font-normal">
              Made with ❤️ by Team StudyPoint © 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
