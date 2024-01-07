import {
  Sidebar,
  ToggleButton,
  Header,
  Footer,
  Button,
  SelectField,
  FormInput,
} from "../../components/index.js";
import useVisibilityToggle from "../../hooks/useVisibilityToggle";

import { links } from "../../constants/links.js";
import { companyNames } from "../../constants/companyNames.js";

import logo from "../../assets/logo.png";
import "./SellsDashboardExt.scss";

const dummyData = [
  {
    id: 1,
    productName: "Cough Syrup",
    pricePerUnit: "5.00",
    totalUnits: 2,
    totalCost: "10.00",
  },
  {
    id: 2,
    productName: "Pain Reliever",
    pricePerUnit: "8.00",
    totalUnits: 1,
    totalCost: "8.00",
  },
];

const SellsDashboardExt = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  const handleAdd = (e) => {
    e.preventDefault();
    console.log("Add");
  };

  const totalSum = dummyData.reduce((acc, item) => acc + parseFloat(item.totalCost), 0).toFixed(2);

  return (
    <>
      <div className="sells-dashboard-ext">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />
        <Sidebar
          logo={logo}
          links={links}
          isSidebarVisible={isSidebarVisible}
        />
        <main className="sells-dashboard-ext__main">
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
            heading={"Sells Dashboard"}
          />
          <div className="sells-dashboard-ext__content">
            <div className="sells-dashboard-ext__customer-details">
              <div className="sells-dashboard-ext__customer-details__header">
                <h2>Customer and Order Details</h2>
                <hr />
              </div>
              <div className="sells-dashboard-ext__customer-details__content">
                <table>
                  <tbody>
                    <tr>
                      <td>Order ID</td>
                      <td>106</td>
                      <td>Customer Name</td>
                      <td>Jay Kumar</td>
                    </tr>
                    <tr>
                      <td>Order Date</td>
                      <td>11 Oct 2021 01:13 AM</td>
                      <td>Customer Mobile</td>
                      <td>84359834509</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="sells-dashboard-ext__cart-items">
              <div className="sells-dashboard-ext__cart-items__header">
                <h2>Add Items into Cart</h2>
                <hr />
              </div>
              <div className="sells-dashboard-ext__cart-items__content">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <SelectField
                          label="Select Product Type"
                          id="product-type"
                          name="product-type"
                          options={companyNames}
                          value={"Please Select"}
                          required={true}
                        />
                      </td>
                      <td>
                        <FormInput
                          label="Enter Quantity"
                          type="number"
                          id="enterQuantity"
                          name="enterQuantity"
                          required={true}
                        />
                      </td>
                      <td>
                        <Button
                          name="Login"
                          type="submit"
                          function={handleAdd}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="sells-dashboard-ext__order-details">
              <div className="sells-dashboard-ext__order-details__header">
                <h2>Order Item Details</h2>
                <hr />
              </div>
              <div className="sells-dashboard-ext__order-details__content">
                <table>
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Price Per Unit</th>
                      <th>Total Units</th>
                      <th>Total Cost</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.productName}</td>
                        <td>{item.pricePerUnit}</td>
                        <td>{item.totalUnits}</td>
                        <td>{item.totalCost}</td>
                        <td>
                          <button>Edit</button>
                          <button>Delete</button>
                        </td>
                      </tr>
                    ))}
                    <tr className="total-row">
                      <td colSpan="4">Total</td>
                      <td>{totalSum}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default SellsDashboardExt;
