import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
  ReportTable,
  Loading,
} from "../../../components/index.js";
import useVisibilityToggle from "../../../hooks/useVisibilityToggle.jsx";

import { links } from "../../../constants/links.js";
import endpoints from "../../../constants/endpoints.js";
// import products from "../../constants/products.js";
// import logo from "../../../assets/logo.png";
import "./ProductReports.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.jsx";

const logo =
  "https://medeaseportal-bucket.s3.us-east-2.amazonaws.com/assets/logo.png";

const columnHeaders = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "cost", label: "Cost" },
];

const ProductReports = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        const response = await axiosPrivate.get(endpoints.PRODUCT_REPORTS_URL);
        if (isMounted) {
          const formatedResponse = response.data.map((product) => ({
            id: product.id,
            name: product.name,
            category: product.category,
            cost: product.cost,
          }));
          setProductTypes(formatedResponse);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const handleUpdate = (product) => {
    navigate("/admin/medicineUpdate", { state: product });
  };

  const handleDelete = () => {
    console.log("Delete");
  };

  if (isLoading) {
    return <Loading />;
  }

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
              data={productTypes}
              renderRowActions={(product) => (
                <>
                  <button
                    className="action-button view"
                    onClick={() => handleUpdate(product)}
                  >
                    View/Update
                  </button>
                  <button className="action-button view" onClick={handleDelete}>
                    Delete
                  </button>
                </>
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
