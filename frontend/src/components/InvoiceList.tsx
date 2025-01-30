import { FileText, CheckCircle, Clock } from 'lucide-react';
import { Invoice } from '../types.ts';

const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    orderId: '1',
    amount: 15000,
    date: '2024-03-10',
    status: 'pending',
    units: 150
  },
  {
    id: 'INV-002',
    orderId: '2',
    amount: 20000,
    date: '2024-03-09',
    status: 'paid',
    units: 200
  }
];

const InvoiceList = () => {
  

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Invoices</h2>
        <div className="space-y-4">
          {mockInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="border rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => {window.open(`/invoice/${invoice.id}`, "_blank")}}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-blue-600 mr-2" />
                  <div>
                    <h3 className="font-medium">{invoice.id}</h3>
                    <p className="text-sm text-gray-500">Order #{invoice.orderId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      ${invoice.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {invoice.units} units
                    </p>
                  </div>
                  <div className={`
                    flex items-center px-3 py-1 rounded-full text-sm
                    ${invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                  `}>
                    {invoice.status === 'paid' ? (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    ) : (
                      <Clock className="w-4 h-4 mr-1" />
                    )}
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InvoiceList;
