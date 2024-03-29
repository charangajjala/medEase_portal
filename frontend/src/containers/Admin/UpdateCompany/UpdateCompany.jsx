import {
  Sidebar,
  Header,
  ToggleButton,
  Footer,
  CompanyForm,
} from "../../../components/index.js";
import useVisibilityToggle from "../../../hooks/useVisibilityToggle.jsx";

import { links } from "../../../constants/links.js";

import { useLocation } from "react-router";

// import logo from "../../../assets/logo.png";
import "./UpdateCompany.scss";
import { Toaster } from "react-hot-toast";

const logo =
  "https://medeaseportal-bucket.s3.us-east-2.amazonaws.com/assets/logo.png";

const UpdateCompany = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  const location = useLocation();
  const { company } = location.state;

  return (
    <>
      <div className="update-company-form">
        <Toaster position="bottom-right" reverseOrder={false} />
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />
        <Sidebar
          isSidebarVisible={isSidebarVisible}
          toggleDropdown={toggleDropdown}
          isDropdownOpen={isDropdownOpen}
          dropdownRef={dropdownRef}
          links={links}
          logo={logo}
        />
        <main className="update-company-form__main">
          <div className="update-company-form__main__header">
            <Header
              dropdownRef={dropdownRef}
              toggleDropdown={toggleDropdown}
              isDropdownOpen={isDropdownOpen}
              userName={"Admin"}
              dropdownMenu={[
                {
                  name: "Profile",
                  link: "/profile",
                },
                {
                  name: "Logout",
                  link: "/logout",
                },
              ]}
              heading={"Update Company Details"}
            />
          </div>

          <div className="update-company-form__content">
            <CompanyForm method={"Update"} companyData={company} />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default UpdateCompany;
