import { useState } from "react";
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

export default function Dashboard() {
  const [stats] = useState<any>({
    stats: {
      totals: {
        totalOrders: 1535,
        totalToday: 759,
        totalYesterday: 500,
        totalWeek: 5200,
        totalMonth: 19000,
        totalYear: 21551,
      },
      discounts: {
        withDiscount: 60,
        withoutDiscount: 40,
        totalDiscountAmount: 1550.5,
      },
      costs: {
        totalWholesalePrice: 9500,
        totalMarketingCosts: 1800,
        totalPackagingCost: 1200,
        totalNetProfit: 7051,
      },
      changes: {
        daily: "15.25%",
        weekly: "-4.12%",
        monthly: "9.80%",
        yearly: "12.00%",
      },
      topProducts: {
        "Product A": 300,
        "Product B": 250,
        "Product C": 200,
      },
      topCustomers: {
        "Customer 1": 100,
        "Customer 2": 80,
        "Customer 3": 60,
      },
      ordersByStatus: {
        Paid: 10,
        Delivered: 8,
        Canceled: 2,
        Shipped: 3,
      },
      statusPercentages: {
        Paid: "50%",
        Delivered: "40%",
        Canceled: "10%",
        Shipped: "10%",
      },
    },
  });

  const COLORS = [
    "var(--color-earth)",
    "var(--color-tiger)",
    "var(--color-dark)",
    "var(--color-pakistan)",
  ];

  const {
    totals,
    discounts,
    costs,
    changes,
    ordersByStatus,
    statusPercentages,
  } = stats.stats;

  const pieData = [
    { name: "With Discount", value: discounts.withDiscount },
    { name: "Without Discount", value: discounts.withoutDiscount },
  ];

  const barData = Object.keys(ordersByStatus).map((status) => ({
    status,
    count: ordersByStatus[status],
  }));

  const lineData = [
    { name: "Daily", value: parseFloat(changes.daily) },
    { name: "Weekly", value: parseFloat(changes.weekly) },
    { name: "Monthly", value: parseFloat(changes.monthly) },
    { name: "Yearly", value: parseFloat(changes.yearly) },
  ];

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
            <p className="text-3xl font-bold">{item.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Pie + Line Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {/* Discounts */}
        <div className="bg-(--color-cornsilk) rounded-xl shadow-lg">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent,
                  name,
                }: any) => {
                  let radius: number =
                    innerRadius + (outerRadius - innerRadius) / 2;
                  let x: number =
                    cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                  let y: number =
                    cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#fff"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={12}
                    >
                      {`${
                        name === "With Discount"
                          ? "with a discount"
                          : "Without discount"
                      } ${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                {pieData.map((_entry, index) => (
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

        {/* Changes */}
        <div
          className="p-2 md:p-6 rounded-xl shadow-lg"
          style={{ backgroundColor: "var(--color-cornsilk)" }}
        >
          <h3
            className="text-xl font-bold mb-2 flex items-center gap-2"
            style={{ color: "var(--color-earth)" }}
          >
            <TrendingUp /> Performance Changes (%)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData} margin={{ right: 12, left: -32 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="var(--color-dark)" />
              <YAxis stroke="var(--color-dark)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-pakistan)",
                  color: "var(--color-cornsilk)",
                }}
              />
              <Legend />

              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-tiger)"
                strokeWidth={3}
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

        <div className="flex justify-around mt-2 mb-1 ml-12 text-sm flex-wrap gap-2">
          {Object.entries(statusPercentages).map(([key, val]: any) => {
            const shortKey =
              window.innerWidth < 768 ? key.charAt(0).toUpperCase() : key;
            return (
              <p key={key}>
                {shortKey}:{" "}
                <span style={{ color: "var(--color-earth)" }}>{val}</span>
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
              {Object.entries(stats.stats.topCustomers).map(
                ([customer, count]: any, i) => (
                  <tr
                    key={i}
                    className="hover:bg-opacity-20 hover:bg-white transition"
                    style={{
                      backgroundColor:
                        i % 2 === 0
                          ? "var(--color-tiger)"
                          : "var(--color-earth)",
                      color: "var(--color-cornsilk)",
                    }}
                  >
                    <td className="p-3 border-b border-gray-700">{customer}</td>
                    <td
                      className="p-3 border-b border-gray-700 font-bold"
                      style={{ color: "var(--color-cornsilk)" }}
                    >
                      {count}
                    </td>
                  </tr>
                )
              )}
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
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
