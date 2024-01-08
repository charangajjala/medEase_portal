import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
  ReportTable,
} from "../../components/index.js";
import useVisibilityToggle from "../../hooks/useVisibilityToggle";

import { links } from "../../constants/links.js";
// import products from "../../constants/products.js";
import logo from "../../assets/logo.png";
import "./ProductReports.scss";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios.jsx";
import { useEffect, useState } from "react";

const PRODUCT_REPORTS_URL = "/api/products";

const columnHeaders = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "cost", label: "Cost" },
];

const ProductReports = () => {
  const [products, setProducts] = useState([]);
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPrivate.get(PRODUCT_REPORTS_URL);
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  const navigate = useNavigate();
  const handleClick = (product) => {
    navigate("/medicine");
    console.log(product);
  };

  return (
    <>
      <div className="product-reports">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        <Sidebar
          logo={logo}
          links={links}
          isSidebarVisible={isSidebarVisible}
        />

        <main className="product-reports__main">
          <div className="product-reports__main__header">
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
              heading={"Product Reports"}
            />
          </div>

          <div className="product-reports__main__content">
            <ReportTable
              columnHeaders={columnHeaders}
              data={products}
              renderRowActions={(product) => (
                <button
                  className="action-button view"
                  onClick={() => handleClick(product)}
                >
                  View
                </button>
              )}
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ProductReports;
