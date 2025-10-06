import { useState } from "react";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Receipt,
  Settings,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

export const BillingPayments = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  const revenueStats = [
    {
      label: "Total Revenue",
      value: "$124,580",
      change: "+15.3%",
      changeType: "positive",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Monthly Recurring Revenue",
      value: "$89,420",
      change: "+12.8%",
      changeType: "positive",
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Active Subscriptions",
      value: "2,847",
      change: "+8.2%",
      changeType: "positive",
      icon: Users,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Churn Rate",
      value: "2.3%",
      change: "-0.5%",
      changeType: "positive",
      icon: Calendar,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const transactions = [
    {
      id: 1,
      customer: "John Doe",
      email: "john.doe@example.com",
      amount: "$49.00",
      plan: "Pro Monthly",
      status: "completed",
      method: "Credit Card ****1234",
      date: "2024-01-15 10:30 AM",
      transactionId: "txn_1234567890",
    },
    {
      id: 2,
      customer: "Jane Smith",
      email: "jane.smith@example.com",
      amount: "$99.00",
      plan: "Premium Monthly",
      status: "completed",
      method: "PayPal",
      date: "2024-01-15 09:15 AM",
      transactionId: "txn_0987654321",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      email: "mike.johnson@example.com",
      amount: "$19.00",
      plan: "Basic Monthly",
      status: "failed",
      method: "Credit Card ****5678",
      date: "2024-01-15 08:45 AM",
      transactionId: "txn_1122334455",
    },
    {
      id: 4,
      customer: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      amount: "$490.00",
      plan: "Pro Yearly",
      status: "pending",
      method: "Bank Transfer",
      date: "2024-01-14 4:20 PM",
      transactionId: "txn_5566778899",
    },
  ];

  const paymentMethods = [
    {
      method: "Credit Card",
      percentage: 68,
      amount: "$84,714",
      transactions: 1847,
      color: "bg-blue-500",
    },
    {
      method: "PayPal",
      percentage: 22,
      amount: "$27,408",
      transactions: 623,
      color: "bg-purple-500",
    },
    {
      method: "Bank Transfer",
      percentage: 8,
      amount: "$9,964",
      transactions: 234,
      color: "bg-green-500",
    },
    {
      method: "Other",
      percentage: 2,
      amount: "$2,494",
      transactions: 89,
      color: "bg-orange-500",
    },
  ];

  const subscriptionPlans = [
    {
      plan: "Basic",
      subscribers: 1250,
      revenue: "$23,750",
      growth: "+5.2%",
      color: "from-blue-500 to-blue-600",
    },
    {
      plan: "Pro",
      subscribers: 850,
      revenue: "$41,650",
      growth: "+12.8%",
      color: "from-purple-500 to-purple-600",
    },
    {
      plan: "Premium",
      subscribers: 320,
      revenue: "$31,680",
      growth: "+18.5%",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      plan: "Enterprise",
      subscribers: 45,
      revenue: "$22,500",
      growth: "+25.0%",
      color: "from-red-500 to-red-600",
    },
  ];

  const recentRefunds = [
    {
      id: 1,
      customer: "Alice Cooper",
      amount: "$49.00",
      reason: "Service not as expected",
      date: "2024-01-14",
      status: "processed",
    },
    {
      id: 2,
      customer: "Bob Wilson",
      amount: "$99.00",
      reason: "Billing error",
      date: "2024-01-13",
      status: "pending",
    },
    {
      id: 3,
      customer: "Carol Davis",
      amount: "$19.00",
      reason: "Duplicate charge",
      date: "2024-01-12",
      status: "processed",
    },
  ];

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "refunded":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "pending":
        return Calendar;
      case "failed":
        return XCircle;
      case "refunded":
        return RefreshCw;
      default:
        return Calendar;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Billing & Payments</h1>
          <p className="text-slate-400 mt-1">
            Manage revenue and payment transactions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {revenueStats.map((stat, index) => (
          <Card
            key={index}
            className="bg-slate-800/50 border-slate-700 backdrop-blur-sm"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      stat.changeType === "positive"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {stat.change} vs last period
                  </p>
                </div>
                <div
                  className={`h-10 w-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1">
        {[
          { id: "overview", label: "Revenue Overview", icon: TrendingUp },
          { id: "transactions", label: "Transactions", icon: Receipt },
          { id: "subscriptions", label: "Subscriptions", icon: Users },
          { id: "refunds", label: "Refunds", icon: RefreshCw },
          { id: "settings", label: "Payment Settings", icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? "bg-purple-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-700"
            }`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">
                    Payment Methods Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((method, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-4 w-4 rounded-full ${method.color}`}
                          />
                          <span className="text-slate-300 font-medium">
                            {method.method}
                          </span>
                          <span className="text-slate-500 text-sm">
                            ({method.transactions} transactions)
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-white font-bold">
                            {method.amount}
                          </span>
                          <span className="text-slate-400 text-sm">
                            {method.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">
                    Subscription Tiers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subscriptionPlans.map((plan, index) => (
                      <div
                        key={index}
                        className="p-4 bg-slate-700/50 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-medium">
                            {plan.plan}
                          </h3>
                          <span className="text-green-400 text-sm">
                            {plan.growth}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-slate-400">Subscribers</span>
                            <p className="text-white font-bold">
                              {plan.subscribers}
                            </p>
                          </div>
                          <div>
                            <span className="text-slate-400">Revenue</span>
                            <p className="text-white font-bold">
                              {plan.revenue}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white">
                      <option>All Status</option>
                      <option>Completed</option>
                      <option>Pending</option>
                      <option>Failed</option>
                    </select>
                    <select className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white">
                      <option>All Methods</option>
                      <option>Credit Card</option>
                      <option>PayPal</option>
                      <option>Bank Transfer</option>
                    </select>
                    <Button
                      variant="ghost"
                      className="text-slate-400 hover:text-white"
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transactions List */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-300 font-medium">
                          Customer
                        </th>
                        <th className="text-left py-3 px-4 text-slate-300 font-medium">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 text-slate-300 font-medium">
                          Plan
                        </th>
                        <th className="text-left py-3 px-4 text-slate-300 font-medium">
                          Method
                        </th>
                        <th className="text-left py-3 px-4 text-slate-300 font-medium">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 text-slate-300 font-medium">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 text-slate-300 font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction) => {
                        const StatusIcon = getStatusIcon(transaction.status);
                        return (
                          <tr
                            key={transaction.id}
                            className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors group"
                          >
                            <td className="py-4 px-4">
                              <div>
                                <p className="text-white font-medium">
                                  {transaction.customer}
                                </p>
                                <p className="text-slate-400 text-sm">
                                  {transaction.email}
                                </p>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-white font-bold">
                              {transaction.amount}
                            </td>
                            <td className="py-4 px-4 text-slate-300">
                              {transaction.plan}
                            </td>
                            <td className="py-4 px-4 text-slate-300">
                              {transaction.method}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <StatusIcon className="h-4 w-4" />
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                                    transaction.status
                                  )}`}
                                >
                                  {transaction.status}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-slate-400">
                              {transaction.date}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-slate-400 hover:text-white h-8 w-8 p-0"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-slate-400 hover:text-white h-8 w-8 p-0"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === "subscriptions" && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">
                Subscription Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {subscriptionPlans.map((plan, index) => (
                  <div key={index} className="p-6 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-bold text-lg">
                        {plan.plan}
                      </h3>
                      <span className="text-green-400 text-sm font-medium">
                        {plan.growth}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-slate-400 text-sm">Subscribers</p>
                        <p className="text-white font-bold text-xl">
                          {plan.subscribers}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Revenue</p>
                        <p className="text-white font-bold text-xl">
                          {plan.revenue}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Refunds Tab */}
        {activeTab === "refunds" && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Recent Refunds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">
                        Customer
                      </th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">
                        Reason
                      </th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRefunds.map((refund) => (
                      <tr
                        key={refund.id}
                        className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors group"
                      >
                        <td className="py-4 px-4 text-white font-medium">
                          {refund.customer}
                        </td>
                        <td className="py-4 px-4 text-white font-bold">
                          {refund.amount}
                        </td>
                        <td className="py-4 px-4 text-slate-300">
                          {refund.reason}
                        </td>
                        <td className="py-4 px-4 text-slate-400">
                          {refund.date}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                              refund.status
                            )}`}
                          >
                            {refund.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-slate-400 hover:text-white h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Payment Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-4">
                    Payment Gateways
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Stripe</p>
                        <p className="text-slate-400 text-sm">
                          Credit card processing
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">PayPal</p>
                        <p className="text-slate-400 text-sm">
                          PayPal payments
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Bank Transfer</p>
                        <p className="text-slate-400 text-sm">
                          Direct bank transfers
                        </p>
                      </div>
                      <input type="checkbox" className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-4">
                    Billing Configuration
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Currency
                      </label>
                      <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white">
                        <option>USD - US Dollar</option>
                        <option>EUR - Euro</option>
                        <option>GBP - British Pound</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Tax Rate (%)
                      </label>
                      <Input
                        placeholder="8.25"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
