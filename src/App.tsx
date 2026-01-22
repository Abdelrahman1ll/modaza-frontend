import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryPage = lazy(() => import("./pages/Category/categoryPage"));

const ColorPage = lazy(() => import("./pages/Color/colorPage"));

const Loading = lazy(() => import("./components/Loading"));
const NetworkStatus = lazy(() => import("./components/NetworkStatus"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

const AboutUsPage = lazy(() => import("./pages/QuickLinks/aboutUsPage"));
const FAQsPage = lazy(() => import("./pages/QuickLinks/FAQsPage"));
const ShippingDeliveryPage = lazy(
  () => import("./pages/QuickLinks/ShippingDeliveryPage"),
);
const SecurePaymentPage = lazy(
  () => import("./pages/QuickLinks/SecurePaymentPage"),
);
const WorldwideShippingPage = lazy(
  () => import("./pages/QuickLinks/WorldwideShippingPage"),
);
const BackgroundEffectPage = lazy(
  () => import("./pages/BackgroundEffect/BackgroundEffectPage"),
);

const HomePage = lazy(() => import("./pages/Home/homePage"));
const ProductsPage = lazy(() => import("./pages/products/productPage"));
const ProductDetailsPage = lazy(
  () => import("./pages/products/productDetailsPage"),
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
  () => import("./pages/DiscountCodes/DiscountCodesPage"),
);
const AllUsersMessagesPage = lazy(
  () => import("./pages/AllUsersMessages/allUsersMessagesPage"),
);
const EmailOrderDispatcherPage = lazy(
  () => import("./pages/EmailOrderDispatcher/emailOrderDispatcherPage"),
);
const DashboardPage = lazy(() => import("./pages/Dashboard/dashboardPage"));
const UsersPage = lazy(() => import("./pages/Users/usersPage"));
const EditUserOwnerPage = lazy(() => import("./pages/Users/editUserOwnerPage"));
const PrivacyPolicyPage = lazy(
  () => import("./pages/Policies/privacyPolicyPage"),
);
const ReturnExchangePolicyPage = lazy(
  () => import("./pages/Policies/returnExchangePolicyPage"),
);
const SalesPaymentPolicyPage = lazy(
  () => import("./pages/Policies/salesPaymentPolicyPage"),
);
const TermsConditionsPage = lazy(
  () => import("./pages/Policies/termsConditionsPage"),
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
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="premium-toast"
        className="premium-toast-body"
      />

      <Suspense fallback={<Loading />}>
        <BackgroundEffectPage />
        <ScrollToTop />
        <NetworkStatus />

        <Routes>
          {/* E2E: Covered (home.spec.ts, auth.spec.ts, owner.spec.ts) */}
          <Route path="/" element={<HomePage />} />
          {/* E2E: Covered (products.spec.ts, cart.spec.ts, checkout.spec.ts, owner.spec.ts, roles.spec.ts) */}
          <Route path="/products" element={<ProductsPage />} />
          {/* E2E: Covered (details.spec.ts, cart.spec.ts, owner.spec.ts) */}
          <Route
            path="/products-details/:id"
            element={<ProductDetailsPage />}
          />
          {/* E2E: Covered (cart.spec.ts, owner.spec.ts) */}
          <Route path="/cart" element={<CartPage />} />

          {/* E2E: Covered (wishlist.spec.ts, owner.spec.ts) */}
          <Route path="/wishlist" element={<WishlistPage />} />

          {/* E2E: Covered (profile.spec.ts, roles.spec.ts, owner.spec.ts) */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute roles={["owner", "admin", "user"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* E2E: Covered (profile.spec.ts, roles.spec.ts, owner.spec.ts) */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute roles={["owner", "admin", "user"]}>
                <OrdersPage />
              </ProtectedRoute>
            }
          />

          {/* E2E: Covered (details.spec.ts, owner.spec.ts) */}
          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute roles={["owner", "admin", "user"]}>
                <OrderDetailsPage />
              </ProtectedRoute>
            }
          />
          {/* E2E: Covered (policies.spec.ts, owner.spec.ts) */}
          <Route
            path="/sales-payment-policy"
            element={<SalesPaymentPolicyPage />}
          />
          {/* E2E: Covered (policies.spec.ts, owner.spec.ts) */}
          <Route
            path="/return-exchange-policy"
            element={<ReturnExchangePolicyPage />}
          />
          {/* E2E: Covered (policies.spec.ts, owner.spec.ts) */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          {/* E2E: Covered (policies.spec.ts, owner.spec.ts) */}
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          {/* E2E: Covered (checkout.spec.ts, owner.spec.ts) */}
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* E2E: Covered (policies.spec.ts, owner.spec.ts) */}
          <Route path="/contact-us" element={<ContactUsPage />} />
          {/* E2E: Covered (policies.spec.ts, owner.spec.ts) */}
          <Route path="/about-us" element={<AboutUsPage />} />
          {/* E2E: Covered (policies.spec.ts, owner.spec.ts) */}
          <Route path="/faqs" element={<FAQsPage />} />
          {/* E2E: Covered (policies.spec.ts, owner.spec.ts) */}
          <Route path="/shipping-delivery" element={<ShippingDeliveryPage />} />
          {/* E2E: Covered (policies.spec.ts, owner.spec.ts) */}
          <Route path="/secure-payment" element={<SecurePaymentPage />} />
          {/* E2E: Covered (policies.spec.ts, owner.spec.ts) */}
          <Route
            path="/shipping-in-egypt"
            element={<WorldwideShippingPage />}
          />
          {/* E2E: Covered (notfound.spec.ts, owner.spec.ts) */}
          <Route path="*" element={<NotFound />} />

          {/* Protected Routes */}
          {/* E2E: Covered (roles.spec.ts, owner.spec.ts) */}
          <Route
            path="/edit-product/:id"
            element={
              <ProtectedRoute roles={["owner", "admin"]}>
                <EditProductPage />
              </ProtectedRoute>
            }
          />
          {/* E2E: Covered (owner.spec.ts) */}
          <Route
            path="/add-product"
            element={
              <ProtectedRoute roles={["owner"]}>
                <AddProductPage />
              </ProtectedRoute>
            }
          />
          {/* E2E: Covered (owner.spec.ts) */}
          <Route
            path="/add-delivery"
            element={
              <ProtectedRoute roles={["owner"]}>
                <AddDeliveryPage />
              </ProtectedRoute>
            }
          />

          {/* E2E: Covered (owner.spec.ts) */}
          <Route
            path="/discount-codes"
            element={
              <ProtectedRoute roles={["owner"]}>
                <DiscountCodesPage />
              </ProtectedRoute>
            }
          />

          {/* E2E: Covered (owner.spec.ts) */}
          <Route
            path="/all-users-messages"
            element={
              <ProtectedRoute roles={["owner"]}>
                <AllUsersMessagesPage />
              </ProtectedRoute>
            }
          />
          {/* E2E: Covered (owner.spec.ts) */}
          <Route
            path="/email-order-dispatcher"
            element={
              <ProtectedRoute roles={["owner"]}>
                <EmailOrderDispatcherPage />
              </ProtectedRoute>
            }
          />
          {/* E2E: Covered (roles.spec.ts, owner.spec.ts) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["owner"]}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          {/* E2E: Covered (roles.spec.ts, owner.spec.ts) */}
          <Route
            path="/all-users"
            element={
              <ProtectedRoute roles={["owner"]}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          {/* E2E: Covered (owner.spec.ts) */}
          <Route
            path="/edit-user-owner/:id"
            element={
              <ProtectedRoute roles={["owner"]}>
                <EditUserOwnerPage />
              </ProtectedRoute>
            }
          />

          {/* E2E: Covered (owner.spec.ts) */}
          <Route
            path="/category"
            element={
              <ProtectedRoute roles={["owner"]}>
                <CategoryPage />
              </ProtectedRoute>
            }
          />

          {/* E2E: Covered (owner.spec.ts) */}
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
