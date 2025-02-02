import { Package } from 'lucide-react';
import { Order } from '../types';

const mockOrders: Order[] = [
  {
    id: '1',
    productName: 'LaserJet Pro',
    totalUnits: 300,
    deliveredUnits: 150,
    orderDate: '2024-03-10',
    status: 'partial'
  },
  {
    id: '2',
    productName: 'InkJet Plus',
    totalUnits: 400,
    deliveredUnits: 200,
    orderDate: '2024-03-09',
    status: 'partial'
  }
];

const OrderList = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Package className="w-5 h-5 text-blue-600 mr-2" />
                  <div>
                    <h3 className="font-medium">{order.productName}</h3>
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {order.deliveredUnits} / {order.totalUnits} units
                    </p>
                    <p className="text-sm text-gray-500">
                      Ordered on {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`
                    px-3 py-1 rounded-full text-sm
                    ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      order.status === 'partial' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'}
                  `}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(order.deliveredUnits / order.totalUnits) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderList;