import { Package, FileText, TrendingUp, AlertCircle } from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Orders',
      value: '2',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending Delivery',
      value: '350 units',
      icon: AlertCircle,
      color: 'bg-yellow-500'
    },
    {
      title: 'Delivered',
      value: '350 units',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Invoices',
      value: '2',
      icon: FileText,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;