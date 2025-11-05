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
        product1: 300,
        product2: 250,
        product3: 200,
      },
      topCustomers: {
        customer1: 100,
        customer2: 80,
        customer3: 60,
      },
      ordersByStatus: {
        Paid: 10,
        Delivered: 8,
        Canceled: 2,
      },
      statusPercentages: {
        Paid: "50%",
        Delivered: "40%",
        Canceled: "10%",
      },
    },
  });

  const COLORS = ["#DDA15E", "#BC6C25", "#606C38", "#283618"];

  const theme = {
    dark: "#FEFAE0",
    pakistan: "#283618",
    cornsilk: "#606C38",
    earth: "#DDA15E",
    tiger: "#BC6C25",
  };

  const {
    totals,
    discounts,
    costs,
    changes,
    ordersByStatus,
    statusPercentages,
  } = stats.stats;

  // 🥧 Pie Chart
  const pieData = [
    { name: "باستخدام خصم", value: discounts.withDiscount },
    { name: "بدون خصم", value: discounts.withoutDiscount },
  ];

  // 📊 Bar Chart
  const barData = Object.keys(ordersByStatus).map((status) => ({
    status,
    count: ordersByStatus[status],
  }));

  // 📈 Line Chart
  const lineData = [
    { name: "يومي", value: parseFloat(changes.daily) },
    { name: "أسبوعي", value: parseFloat(changes.weekly) },
    { name: "شهري", value: parseFloat(changes.monthly) },
    { name: "سنوي", value: parseFloat(changes.yearly) },
  ];

  // 🧾 الكروت
  const totalsCards = [
    { title: "إجمالي الطلبات", value: totals.totalOrders },
    { title: "طلبات اليوم", value: totals.totalToday },
    { title: "طلبات الأمس", value: totals.totalYesterday },
    { title: "طلبات الأسبوع", value: totals.totalWeek },
    { title: "طلبات الشهر", value: totals.totalMonth },
    { title: "طلبات السنة", value: totals.totalYear },
  ];

  return (
    <div
      className="p-6 min-h-screen space-y-6"
      style={{ color: theme.cornsilk }}
    >
      <h1
        className="text-3xl font-bold mb-4 text-center"
        style={{ color: theme.earth }}
      >
        📊 لوحة التحكم
      </h1>

      {/* 🔹 الكروت الإجمالية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {totalsCards.map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-xl shadow-lg flex flex-col justify-center items-center transition-transform hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${theme.dark}, ${theme.earth})`,
            }}
          >
            <p className="text-sm opacity-90">{item.title}</p>
            <p className="text-3xl font-bold mt-2">
              {item.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* 🔹 Pie + Line */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 🥧 الخصومات */}
        <div
          className="p-6 rounded-xl shadow-lg"
          style={{ backgroundColor: theme.dark }}
        >
          <h3 className="text-xl font-bold mb-2" style={{ color: theme.earth }}>
            الطلبات بالخصم
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((_entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.pakistan,
                  color: theme.cornsilk,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 📈 نسب التغير */}
        <div
          className="p-6 rounded-xl shadow-lg"
          style={{ backgroundColor: theme.dark }}
        >
          <h3 className="text-xl font-bold mb-2" style={{ color: theme.earth }}>
            نسب التغير (٪)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke={theme.cornsilk} />
              <YAxis stroke={theme.cornsilk} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.pakistan,
                  color: theme.cornsilk,
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke={theme.tiger}
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔹 Bar Chart */}
      <div
        className="p-6 rounded-xl shadow-lg"
        style={{ backgroundColor: theme.dark }}
      >
        <h3 className="text-xl font-bold mb-3" style={{ color: theme.earth }}>
          الطلبات حسب الحالة
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="status" stroke={theme.cornsilk} />
            <YAxis stroke={theme.cornsilk} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.pakistan,
                color: theme.cornsilk,
              }}
            />
            <Bar dataKey="count" fill={theme.tiger} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-around mt-3 text-sm">
          {Object.entries(statusPercentages).map(([key, val]: any) => (
            <p key={key}>
              {key}: <span style={{ color: theme.earth }}>{val}</span>
            </p>
          ))}
        </div>
      </div>

      {/* 🔹 أكثر 5 عملاء */}
      <div
        className="p-6 rounded-xl shadow-lg"
        style={{ backgroundColor: theme.dark }}
      >
        <h3 className="text-xl font-bold mb-3" style={{ color: theme.earth }}>
          🔝 أكثر 5 عملاء من حيث عدد الطلبات
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full text-center border-collapse">
            <thead>
              <tr
                style={{
                  backgroundColor: theme.pakistan,
                  color: theme.cornsilk,
                }}
              >
                <th className="p-3 border-b border-gray-600">العميل</th>
                <th className="p-3 border-b border-gray-600">عدد الطلبات</th>
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
                        i % 2 === 0 ? theme.pakistan : theme.dark,
                      color: theme.cornsilk,
                    }}
                  >
                    <td className="p-3 border-b border-gray-700">{customer}</td>
                    <td
                      className="p-3 border-b border-gray-700 font-bold"
                      style={{ color: theme.earth }}
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

      {/* 🔹 أكثر منتجين مبيعًا */}
      <div
        className="p-6 rounded-xl shadow-lg mt-6"
        style={{ backgroundColor: "#283618" }} // color-pakistan
      >
        <h3
          className="text-xl font-bold mb-3 flex items-center gap-2"
          style={{ color: "#DDA15E" }} // color-earth
        >
          🛍️ أكثر منتجين مبيعًا
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full text-center border-collapse">
            <thead>
              <tr style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}>
                <th className="p-3 border-b border-gray-700">اسم المنتج</th>
                <th className="p-3 border-b border-gray-700">عدد المبيعات</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats.stats.topProducts)
                .slice(0, 2) // 🧮 نعرض فقط أول منتجين
                .map(([product, sold]: any, i) => (
                  <tr
                    key={i}
                    className="hover:bg-opacity-20 hover:bg-white transition"
                    style={{
                      backgroundColor: i % 2 === 0 ? "#283618" : "#606C38",
                      color: "#FEFAE0",
                    }}
                  >
                    <td className="p-3 border-b border-gray-700">{product}</td>
                    <td
                      className="p-3 border-b border-gray-700 font-bold"
                      style={{ color: "#BC6C25" }} // color-tiger
                    >
                      {sold}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 الأرباح والتكاليف */}
      <div
        className="p-6 rounded-xl shadow-lg"
        style={{ backgroundColor: theme.dark }}
      >
        <h3 className="text-xl font-bold mb-3" style={{ color: theme.earth }}>
          الأرباح والتكاليف
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <p>سعر الجملة</p>
            <p className="text-lg font-bold" style={{ color: theme.earth }}>
              ${costs.totalWholesalePrice}
            </p>
          </div>
          <div>
            <p>التسويق</p>
            <p className="text-lg font-bold" style={{ color: theme.earth }}>
              ${costs.totalMarketingCosts}
            </p>
          </div>
          <div>
            <p>التغليف</p>
            <p className="text-lg font-bold" style={{ color: theme.earth }}>
              ${costs.totalPackagingCost}
            </p>
          </div>
          <div>
            <p>صافي الربح</p>
            <p className="text-lg font-bold text-green-400">
              ${costs.totalNetProfit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
