// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Dashboard/Sidebar";
// import Header from "./components/Dashboard/Header";
// import LoginPage from "./components/pages/LoginPage";
// import Analytics from "./components/Dashboard/Analytics";
// import ProductManagement from "./components/Dashboard/ProductManagement";
// import OrderProcessing from "./components/Dashboard/OrderProcessing";
// import { AuthProvider } from "./components/state/authContext";
// import { ProductProvider } from "./components/state/productContext";
// import { OrderProvider } from "./components/state/orderContext";
// import RegisterPage from "./components/pages/RegisterPage";
// import DashboardPage from "./components/pages/DashboardPage";
// import ProtectedRoute from "./components/Dashboard/ProtectedRoute";
// const App = () => {
//   return (
//     <AuthProvider>
//       <ProductProvider>
//         <OrderProvider>
//           <Router>
//             <div className="flex">
//               <Sidebar />
//               <div className="flex-1">
//                 <Header />
//                 <Routes>
//                   <Route path="/" element={<RegisterPage />} />
//                   <Route path="/login" element={<LoginPage />} />
//                   <Route path="/dashboard/*" element={<DashboardPage />} />
//                   <Route path="/analytics" element={<Analytics />} />
//                   <Route path="/products" element={<ProductManagement />} />
//                   <Route path="/orders" element={<OrderProcessing />} />
//                 </Routes>
//               </div>
//             </div>
//           </Router>
//         </OrderProvider>
//       </ProductProvider>
//     </AuthProvider>
//   );
// };

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Dashboard/Sidebar";
import Header from "./components/Dashboard/Header";
import LoginPage from "./components/pages/LoginPage";
import Analytics from "./components/Dashboard/Analytics";
import ProductManagement from "./components/Dashboard/ProductManagement";
import OrderProcessing from "./components/Dashboard/OrderProcessing";
import RegisterPage from "./components/pages/RegisterPage";
import DashboardPage from "./components/pages/DashboardPage";
import ProtectedRoute from "./components/Dashboard/ProtectedRoute";

import { AuthProvider } from "./components/state/authContext";
import { ProductProvider } from "./components/state/productContext";
import { OrderProvider } from "./components/state/orderContext";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <div className="flex">
                      {/* <Sidebar /> */}
                      <div className="flex-1">
                        {/* <Header /> */}
                        <DashboardPage />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <div className="flex">
                      <Sidebar />
                      <div className="flex-1">
                        <Header />
                        <Analytics />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute roles={["Admin", "Manager"]}>
                    <div className="flex">
                      <Sidebar />
                      <div className="flex-1">
                        <Header />
                        <ProductManagement />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute roles={["Admin"]}>
                    <div className="flex">
                      <Sidebar />
                      <div className="flex-1">
                        <Header />
                        <OrderProcessing />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
