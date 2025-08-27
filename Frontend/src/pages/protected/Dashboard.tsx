import { BookOpen, Receipt, TrendingUp, Users } from "lucide-react";
import { Card } from "../../components/Card";

export const Dashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Books",
      value: "5,678",
      change: "+8%",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Transactions",
      value: "234",
      change: "+15%",
      icon: Receipt,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Monthly Growth",
      value: "23%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const recentActivities = [
    { action: "New user registered", user: "John Doe", time: "2 minutes ago" },
    { action: "Book returned", user: "Jane Smith", time: "5 minutes ago" },
    { action: "Book issued", user: "Mike Johnson", time: "10 minutes ago" },
    { action: "New book added", user: "Admin", time: "15 minutes ago" },
  ];

  return (
    <div className="py-4 px-6">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Welcome back, Professor!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening in your library today.
        </p>
      </div>

      {/* Stats Grid boxes*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <Card
            hover
            className="p-6 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div key={index} className="flex items-center">
              <div
                className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <span className="ml-2 text-sm text-green-600 font-medium">
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate__animated animate__fadeIn"
        style={{ animationDelay: `${stats.length * 0.1}s` }}
      >
        {/* Recent Activities */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activities
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">by {activity.user}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <Users className="w-6 h-6 text-primary-900 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Add User
              </span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <BookOpen className="w-6 h-6 text-primary-900 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Add Book
              </span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <Receipt className="w-6 h-6 text-primary-900 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Issue Book
              </span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <TrendingUp className="w-6 h-6 text-primary-900 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">
                View Reports
              </span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
