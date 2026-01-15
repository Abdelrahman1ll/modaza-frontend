import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  PieChart as PieIcon,
  TrendingUp,
  BarChart3,
  Users,
  ShoppingBag,
  DollarSign,
} from "lucide-react";
import { useGetDashboardOrdersQuery } from "../../redux/Orders/apiOrders";
import Loading from "../Loading";

/**
 * Dashboard: Main administrative overview showing key metrics and system status.
 * لوحة التحكم: نظرة إدارية عامة تعرض المؤشرات الرئيسية وحالة النظام.
 */
interface OrderByStatusItem {
  status: string;
  count: number;
}

interface TopCustomerItem {
  email: string;
  count: number;
}

interface DashboardStats {
  totals: {
    totalOrders?: number;
    totalToday?: number;
    totalYesterday?: number;
    totalWeek?: number;
    totalMonth?: number;
    totalYear?: number;
    ordersLength?: number;
  };
  discounts: {
    withDiscount?: number;
    withoutDiscount?: number;
  };
  changes: {
    daily?: string;
    weekly?: string;
    monthly?: string;
    yearly?: string;
  };
  ordersByStatus: OrderByStatusItem[];
  topCustomers: TopCustomerItem[];
  costs: {
    totalWholesalePrice?: number;
    totalMarketingCosts?: number;
    totalPackagingCost?: number;
    deliveryPrice?: number;
    totalNetProfit?: number;
  };
}

/**
 * Dashboard: Main administrative overview showing key metrics and system status.
 * لوحة التحكم: نظرة إدارية عامة تعرض المؤشرات الرئيسية وحالة النظام.
 */
export default function Dashboard() {
  const {
    data: dashboardOrders,
    isLoading,
    isError,
  } = useGetDashboardOrdersQuery({});

  const stats = (dashboardOrders?.stats || {}) as DashboardStats;

  const {
    totals = {},
    discounts = {},
    changes = {},
    ordersByStatus = [],
    topCustomers = [],
    costs = {},
  } = stats;

  const COLORS = [
    "#BC6C25", // Tiger
    "#DDA15E", // Earth
    "#606C38", // Dark
    "#283618", // Pakistan
  ];

  // Totals Cards
  const totalsCards = [
    {
      title: "Total Orders",
      value: totals.totalOrders,
      icon: <ShoppingBag />,
    },
    { title: "Today Orders", value: totals.totalToday, icon: <TrendingUp /> },
    {
      title: "Yesterday",
      value: totals.totalYesterday,
      icon: <BarChart3 />,
    },
    { title: "This Week", value: totals.totalWeek, icon: <PieIcon /> },
    { title: "This Month", value: totals.totalMonth, icon: <BarChart3 /> },
    { title: "This Year", value: totals.totalYear, icon: <TrendingUp /> },
  ];

  // Pie Chart
  const pieData = [
    { name: "With Discount", value: discounts.withDiscount },
    { name: "Without Discount", value: discounts.withoutDiscount },
  ];

  // Line chart
  const lineData = [
    { name: "Daily", value: parseFloat(changes.daily || "0") || 0 },
    { name: "Weekly", value: parseFloat(changes.weekly || "0") || 0 },
    { name: "Monthly", value: parseFloat(changes.monthly || "0") || 0 },
    { name: "Yearly", value: parseFloat(changes.yearly || "0") || 0 },
  ];

  // Bar Chart – API returns ARRAY not object
  const barData = ordersByStatus.map((item: OrderByStatusItem) => ({
    status: item.status,
    count: item.count,
  }));
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError && !stats ? (
        <div className="flex justify-center items-center h-screen bg-[#FEFAE0]">
          <div className="flex gap-2 text-[#BC6C25] font-bold text-xl">
            <div>An error occurred while fetching data. Try again.</div>
          </div>
        </div>
      ) : (
        <div className="p-4 md:p-8 min-h-screen space-y-8 bg-[#FEFAE0]">
          {/* Header */}
          <div className="relative mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-[#283618] mb-2 font-display tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-[#606C38] font-medium tracking-widest uppercase text-sm opacity-80">
              Welcome back to your control center
            </p>
          </div>

          {/* Totals Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {totalsCards?.map((item, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg hover:shadow-2xl hover:bg-white/60 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                  {/* Giant Background Icon */}
                  {React.cloneElement(
                    item.icon as React.ReactElement<{ size: number | string }>,
                    {
                      size: 100,
                    }
                  )}
                </div>

                <div className="relative z-10 flex flex-col items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white/50 text-[#BC6C25] shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-[#606C38] text-sm font-bold uppercase tracking-wider mb-1">
                      {item.title}
                    </h3>
                    <p className="text-4xl font-black text-[#283618]">
                      {item.value || 0}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 sm:p-6 bg-white/40 backdrop-blur-md border border-white/60">
              <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-[#283618]">
                <div className="p-2 rounded-xl bg-[#BC6C25]/10 text-[#BC6C25]">
                  <PieIcon size={20} />
                </div>
                Discounts Overview
              </h3>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={5}
                      cornerRadius={8}
                    >
                      {pieData?.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                          stroke="transparent"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "16px",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        color: "#283618",
                        fontWeight: "bold",
                      }}
                      itemStyle={{ color: "#283618" }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      formatter={(value) => (
                        <span className="text-[#606C38] font-bold ml-1">
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Line Chart */}
            <div className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 sm:p-6 bg-white/40 backdrop-blur-md border border-white/60">
              <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-[#283618]">
                <div className="p-2 rounded-xl bg-[#BC6C25]/10 text-[#BC6C25]">
                  <TrendingUp size={20} />
                </div>
                Performance Trends
              </h3>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={lineData}
                    margin={{ left: 0, right: 10, top: 10, bottom: 10 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#000000"
                      strokeOpacity={0.05}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#606C38"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#606C38", fontSize: 12, fontWeight: 600 }}
                      dy={10}
                      interval={0}
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis hide domain={["auto", "auto"]} />
                    <Tooltip
                      cursor={{
                        stroke: "#BC6C25",
                        strokeWidth: 2,
                        strokeDasharray: "5 5",
                      }}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "16px",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        color: "#283618",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#BC6C25"
                      strokeWidth={6}
                      dot={{
                        r: 6,
                        fill: "#BC6C25",
                        strokeWidth: 4,
                        stroke: "#fff",
                      }}
                      activeDot={{
                        r: 8,
                        fill: "#BC6C25",
                        stroke: "#fff",
                        strokeWidth: 4,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Orders by Status */}
          <div className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 md:p-8 bg-white/40 backdrop-blur-md border border-white/60">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-[#283618]">
              <div className="p-2 rounded-xl bg-[#BC6C25]/10 text-[#BC6C25]">
                <BarChart3 size={20} />
              </div>
              Orders Distribution
            </h3>

            <div className="h-[350px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{ left: 0, right: 0, top: 10, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#000000"
                    strokeOpacity={0.05}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="status"
                    stroke="#606C38"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#606C38", fontSize: 12, fontWeight: 700 }}
                    dy={10}
                    padding={{ left: 20, right: 20 }}
                    tickFormatter={(status) =>
                      window.innerWidth < 768
                        ? status.slice(0, 3).toUpperCase()
                        : status
                    }
                  />
                  <YAxis
                    stroke="#606C38"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#606C38", fontSize: 12 }}
                    width={30}
                  />
                  <Tooltip
                    cursor={{ fill: "#BC6C25", opacity: 0.1 }}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                      color: "#283618",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="#BC6C25"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={60}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {barData?.map((item: OrderByStatusItem, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full border border-white/50 shadow-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-[#BC6C25]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#606C38]">
                    {item.status}:
                  </span>
                  <span className="text-sm font-black text-[#283618]">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Customers */}
            <div className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 sm:p-6 bg-white/40 backdrop-blur-md border border-white/60">
              <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-[#283618]">
                <div className="p-2 rounded-xl bg-[#BC6C25]/10 text-[#BC6C25]">
                  <Users size={20} />
                </div>
                Top Customers
              </h3>

              <div className="overflow-hidden rounded-2xl border border-[#283618]/5">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="bg-[#283618]/5">
                      <th className="p-4 text-xs font-black uppercase tracking-widest text-[#606C38]">
                        Customer
                      </th>
                      <th className="p-4 text-xs font-black uppercase tracking-widest text-[#606C38] text-right">
                        Orders
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#283618]/5 bg-white/30">
                    {topCustomers?.map((item: TopCustomerItem, i: number) => (
                      <tr
                        key={i}
                        className="hover:bg-white/50 transition-colors duration-200"
                      >
                        <td className="p-4 font-bold text-[#283618]">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#DDA15E] flex items-center justify-center text-white font-bold text-xs shadow-inner">
                              {item.email.charAt(0).toUpperCase()}
                            </div>
                            {item.email}
                          </div>
                        </td>
                        <td className="p-4 font-black text-[#BC6C25] text-right text-lg">
                          {item.count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Profits & Costs */}
            <div className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 sm:p-6 bg-white/40 backdrop-blur-md border border-white/60">
              <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-[#283618]">
                <div className="p-2 rounded-xl bg-[#BC6C25]/10 text-[#BC6C25]">
                  <DollarSign size={20} />
                </div>
                Financial Overview
              </h3>

              <div className="space-y-4">
                {[
                  {
                    label: "Wholesale",
                    value: costs?.totalWholesalePrice,
                    color: "#DDA15E",
                  },
                  {
                    label: "Marketing",
                    value: costs?.totalMarketingCosts,
                    color: "#DDA15E",
                  },
                  {
                    label: "Packaging",
                    value: costs?.totalPackagingCost,
                    color: "#DDA15E",
                  },
                  {
                    label: "Delivery",
                    value: costs?.deliveryPrice,
                    color: "#DDA15E",
                  },
                  {
                    label: "Net Profit",
                    value: costs?.totalNetProfit,
                    color: "#16a34a",
                    highlight: true,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-4 rounded-2xl ${
                      item.highlight
                        ? "bg-green-100/50 border border-green-200"
                        : "bg-white/30 hover:bg-white/50 transition-colors border border-transparent hover:border-white/50"
                    }`}
                  >
                    <span className="font-bold text-[#606C38] uppercase text-xs tracking-widest">
                      {item.label}
                    </span>
                    <span
                      className={`text-xl font-black ${
                        item.highlight ? "text-green-600" : "text-[#283618]"
                      }`}
                    >
                      EGP {item.value?.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
