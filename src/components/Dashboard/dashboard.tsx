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

export default function Dashboard() {
  const { data: dashboardOrders, isLoading } = useGetDashboardOrdersQuery({});

  if (isLoading) return <p>Loading...</p>;
  if (!dashboardOrders || dashboardOrders.status !== "success")
    return <p>Error loading dashboard...</p>;

  const stats = dashboardOrders.stats;

  const { totals, discounts, changes, ordersByStatus, topCustomers, costs } =
    stats;

  const COLORS = [
    "var(--color-earth)",
    "var(--color-tiger)",
    "var(--color-dark)",
    "var(--color-pakistan)",
  ];

  // Totals Cards
  const totalsCards = [
    { title: "Total Orders", value: totals.totalOrders, icon: <ShoppingBag /> },
    { title: "Today Orders", value: totals.totalToday, icon: <TrendingUp /> },
    {
      title: "Yesterday Orders",
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
    { name: "Daily", value: parseFloat(changes.daily) || 0 },
    { name: "Weekly", value: parseFloat(changes.weekly) || 0 },
    { name: "Monthly", value: parseFloat(changes.monthly) || 0 },
    { name: "Yearly", value: parseFloat(changes.yearly) || 0 },
  ];

  // Bar Chart – API returns ARRAY not object
  const barData = ordersByStatus.map((item: any) => ({
    status: item.status,
    count: item.count,
  }));

  return (
    <div className="p-6 min-h-screen space-y-6">
      <h1
        className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2"
        style={{ color: "var(--color-earth)" }}
      >
        Dashboard Overview
      </h1>

      {/* Totals Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {totalsCards.map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-xl shadow-lg flex flex-col justify-center items-center gap-2 transition-transform hover:scale-105"
            style={{
              background: `linear-gradient(135deg, var(--color-dark), var(--color-earth))`,
              color: "var(--color-cornsilk)",
            }}
          >
            <div className="text-3xl">{item.icon}</div>
            <p className="text-sm opacity-90">{item.title}</p>
            <p className="text-3xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Pie + Line Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Discounts Donut Chart */}
        <div className="rounded-xl shadow-lg p-3 bg-(--color-cornsilk)">
          <h3
            className="text-xl font-bold mb-3 flex items-center gap-2"
            style={{ color: "var(--color-earth)" }}
          >
            Discounts Overview
          </h3>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60} // دي دائرة فارغة في النص
                outerRadius={100}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  outerRadius,
                  percent,
                  name,
                }: any) => {
                  const radius = outerRadius + 20; // النص يبقى خارج الحلقة
                  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="var(--color-dark)"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {name === "With Discount"
                        ? `With (${(percent * 100).toFixed(0)}%)`
                        : `Without (${(percent * 100).toFixed(0)}%)`}
                    </text>
                  );
                }}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart – Changes */}
        <div
          className="rounded-xl shadow-lg p-3 md:p-6"
          style={{ backgroundColor: "var(--color-cornsilk)" }}
        >
          <h3
            className="text-xl font-bold mb-3 flex items-center gap-2"
            style={{ color: "var(--color-earth)" }}
          >
            <TrendingUp /> Performance Changes (%)
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData} margin={{ right: 12, left: -28 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#888" />
              <XAxis dataKey="name" stroke="var(--color-dark)" />
              <YAxis stroke="var(--color-dark)" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-pakistan)",
                  color: "var(--color-cornsilk)",
                  borderRadius: "8px",
                }}
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-tiger)"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders by Status */}
      <div
        className="p-2 md:p-6 rounded-xl shadow-lg"
        style={{ backgroundColor: "var(--color-cornsilk)" }}
      >
        <h3
          className="text-xl font-bold mb-3 flex items-center gap-2"
          style={{ color: "var(--color-earth)" }}
        >
          <BarChart3 /> Orders by Status
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ right: 12, left: -32 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis
              dataKey="status"
              stroke="var(--color-dark)"
              tickFormatter={(status) =>
                window.innerWidth < 768
                  ? status.charAt(0).toUpperCase()
                  : status
              }
            />
            <YAxis stroke="var(--color-dark)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-pakistan)",
                color: "var(--color-cornsilk)",
              }}
            />
            <Bar dataKey="count" fill="var(--color-tiger)" barSize={40} />
          </BarChart>
        </ResponsiveContainer>

        {/* Status Percentages */}
        <div className="flex justify-around mt-2 mb-1 text-sm flex-wrap gap-2">
          {barData.map((item: any, i: number) => {
            const shortKey =
              window.innerWidth < 768
                ? item.status.charAt(0).toUpperCase()
                : item.status;
            return (
              <p key={i}>
                {shortKey}:{" "}
                <span style={{ color: "var(--color-earth)" }}>
                  {item.count}
                </span>
              </p>
            );
          })}
        </div>
      </div>

      {/* Top Customers */}
      <div
        className="p-6 rounded-xl shadow-lg"
        style={{ backgroundColor: "var(--color-cornsilk)" }}
      >
        <h3
          className="text-xl font-bold mb-3 flex items-center gap-2"
          style={{ color: "var(--color-earth)" }}
        >
          <Users /> Top 5 Customers by Orders
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full text-center border-collapse">
            <thead>
              <tr
                style={{
                  backgroundColor: "var(--color-cornsilk)",
                  color: "var(--color-pakistan)",
                }}
              >
                <th className="p-3 border-b border-gray-600">Customer</th>
                <th className="p-3 border-b border-gray-600">Orders</th>
              </tr>
            </thead>

            <tbody>
              {topCustomers?.map((item: any, i: number) => (
                <tr
                  key={i}
                  className="hover:bg-opacity-20 hover:bg-white transition"
                  style={{
                    backgroundColor:
                      i % 2 === 0 ? "var(--color-tiger)" : "var(--color-earth)",
                    color: "var(--color-cornsilk)",
                  }}
                >
                  <td className="p-3 border-b border-gray-700">{item.email}</td>

                  <td
                    className="p-3 border-b border-gray-700 font-bold"
                    style={{ color: "var(--color-cornsilk)" }}
                  >
                    {item.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profits & Costs */}
      <div
        className="p-6 rounded-xl shadow-lg"
        style={{ backgroundColor: "var(--color-cornsilk)" }}
      >
        <h3
          className="text-xl font-bold mb-3 flex items-center gap-2"
          style={{ color: "var(--color-earth)" }}
        >
          <DollarSign /> Profits & Costs
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-5 text-center">
          <div>
            <p>Wholesale</p>
            <p
              className="text-lg font-bold"
              style={{ color: "var(--color-earth)" }}
            >
              ${costs.totalWholesalePrice}
            </p>
          </div>
          <div>
            <p>Marketing</p>
            <p
              className="text-lg font-bold"
              style={{ color: "var(--color-earth)" }}
            >
              ${costs.totalMarketingCosts}
            </p>
          </div>
          <div>
            <p>Packaging</p>
            <p
              className="text-lg font-bold"
              style={{ color: "var(--color-earth)" }}
            >
              ${costs.totalPackagingCost}
            </p>
          </div>

          <div>
            <p>Delivery</p>
            <p
              className="text-lg font-bold"
              style={{ color: "var(--color-earth)" }}
            >
              ${costs.deliveryPrice}
            </p>
          </div>
          <div>
            <p>Net Profit</p>
            <p className="text-lg font-bold text-green-600">
              ${costs.totalNetProfit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
