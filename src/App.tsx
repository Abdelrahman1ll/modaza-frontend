import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";

const CategoryPage = lazy(() => import("./pages/Category/categoryPage"));

const ColorPage = lazy(() => import("./pages/Color/colorPage"));

const Loading = lazy(() => import("./components/Loading"));
const NetworkStatus = lazy(() => import("./components/NetworkStatus"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

const AboutUsPage = lazy(() => import("./pages/QuickLinks/aboutUsPage"));
const FAQsPage = lazy(() => import("./pages/QuickLinks/FAQsPage"));
const ShippingDeliveryPage = lazy(
  () => import("./pages/QuickLinks/ShippingDeliveryPage")
);
const BackgroundEffectPage = lazy(
  () => import("./pages/BackgroundEffect/BackgroundEffectPage")
);

const HomePage = lazy(() => import("./pages/Home/homePage"));
const ProductsPage = lazy(() => import("./pages/products/productPage"));
const ProductDetailsPage = lazy(
  () => import("./pages/products/productDetailsPage")
);
const CartPage = lazy(() => import("./pages/Cart/cartPage"));
const WishlistPage = lazy(() => import("./pages/Wishlist/wishlistPage"));
const ProfilePage = lazy(() => import("./pages/Profile/profilePage"));
const OrdersPage = lazy(() => import("./pages/Orders/ordersPage"));
const OrderDetailsPage = lazy(() => import("./pages/Orders/orderDetailsPage"));
const AddProductPage = lazy(() => import("./pages/products/addProductPage"));
const EditProductPage = lazy(() => import("./pages/products/editProductPage"));
const AddDeliveryPage = lazy(() => import("./pages/Delivery/addDeliveryPage"));
const DiscountCodesPage = lazy(
  () => import("./pages/DiscountCodes/DiscountCodesPage")
);
const AllUsersMessagesPage = lazy(
  () => import("./pages/AllUsersMessages/allUsersMessagesPage")
);
const EmailOrderDispatcherPage = lazy(
  () => import("./pages/EmailOrderDispatcher/emailOrderDispatcherPage")
);
const DashboardPage = lazy(() => import("./pages/Dashboard/dashboardPage"));
const UsersPage = lazy(() => import("./pages/Users/usersPage"));
const EditUserOwnerPage = lazy(() => import("./pages/Users/editUserOwnerPage"));
const PrivacyPolicyPage = lazy(
  () => import("./pages/Policies/privacyPolicyPage")
);
const ReturnExchangePolicyPage = lazy(
  () => import("./pages/Policies/returnExchangePolicyPage")
);
const SalesPaymentPolicyPage = lazy(
  () => import("./pages/Policies/salesPaymentPolicyPage")
);
const TermsConditionsPage = lazy(
  () => import("./pages/Policies/termsConditionsPage")
);
const CheckoutPage = lazy(() => import("./pages/Orders/CheckoutPage"));
const ContactUsPage = lazy(() => import("./pages/QuickLinks/contactUsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default /**
 * App component: The root component that defines the application routing and page structure.
 * مكون App: المكون الأساسي الذي يحدد مسارات التطبيق وهيكل الصفحات.
 */
function App() {
  /**
   * Defines the routes and protected layouts for different user roles.
   * يتم هنا تعريف المسارات والتنسيقات المحمية لكل دور مستخدم.
   */
  return (
    <div>
      <BackgroundEffectPage />

      <ScrollToTop />

      <NetworkStatus />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/products-details/:id"
            element={<ProductDetailsPage />}
          />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/wishlist" element={<WishlistPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute roles={["owner", "admin", "user"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute roles={["owner", "admin", "user"]}>
                <OrdersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute roles={["owner", "admin", "user"]}>
                <OrderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales-payment-policy"
            element={<SalesPaymentPolicyPage />}
          />
          <Route
            path="/return-exchange-policy"
            element={<ReturnExchangePolicyPage />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/shipping-delivery" element={<ShippingDeliveryPage />} />
          <Route path="*" element={<NotFound />} />

          {/* Protected Routes */}
          <Route
            path="/edit-product/:id"
            element={
              <ProtectedRoute roles={["owner", "admin"]}>
                <EditProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <ProtectedRoute roles={["owner"]}>
                <AddProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-delivery"
            element={
              <ProtectedRoute roles={["owner"]}>
                <AddDeliveryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/discount-codes"
            element={
              <ProtectedRoute roles={["owner"]}>
                <DiscountCodesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/all-users-messages"
            element={
              <ProtectedRoute roles={["owner"]}>
                <AllUsersMessagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/email-order-dispatcher"
            element={
              <ProtectedRoute roles={["owner"]}>
                <EmailOrderDispatcherPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["owner"]}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-users"
            element={
              <ProtectedRoute roles={["owner"]}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-user-owner/:id"
            element={
              <ProtectedRoute roles={["owner"]}>
                <EditUserOwnerPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/category"
            element={
              <ProtectedRoute roles={["owner"]}>
                <CategoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/color"
            element={
              <ProtectedRoute roles={["owner"]}>
                <ColorPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}
