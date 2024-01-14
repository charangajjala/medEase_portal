const Endpoints = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",

  // Product Related URLs
  PRODUCT_REPORTS_URL: "/api/medicine",
  UPDATE_PRODUCTS_URL: "/api/medicine",

  // Company Related URLs
  COMPANY_REPORTS_URL: "/api/company",
  ADD_COMPANY_URL: "/api/company",
  UPDATE_COMPANY_URL: "/api/company",

  // Category Related URLs
  ADD_CATEGORY_URL: "/api/medicine_type",
  GET_ONE_CATEGORY_URL: "/api/medicine_type/{id}",
  GET_CATERGORY_URL: "/api/medicine_type",

  // Medicine Related URLs
  ADD_MEDICINE_URL: "/api/medicine",
  GET_ONE_MEDICINE_URL: "/api/medicine/{id}",
  MEDICINE_REPORTS_URL: "/api/medicines",
  UPDATE_MEDICINE_URL: "/api/medicines",

  // Order Related URLs
  ORDER_REPORTS_URL: "/api/orders",

  // Login
  LOGIN_URL: "/api/auth/login",
  LOGOUT_URL: "/api/logout",
};

export default Endpoints;
