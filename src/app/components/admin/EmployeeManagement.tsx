import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Shield, Check, X } from 'lucide-react';

export function EmployeeManagement() {
  const [employees, setEmployees] = useState([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@critteraffinity.com',
      role: 'Content Moderator',
      permissions: ['view_content', 'approve_content', 'remove_content'],
      isActive: true,
      joinedDate: '2025-01-01',
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@critteraffinity.com',
      role: 'Marketing Manager',
      permissions: ['view_analytics', 'manage_ads', 'create_campaigns'],
      isActive: true,
      joinedDate: '2025-01-15',
    },
    {
      id: '3',
      name: 'Carol Williams',
      email: 'carol@critteraffinity.com',
      role: 'Finance Analyst',
      permissions: ['view_finances', 'generate_reports', 'manage_transactions'],
      isActive: false,
      joinedDate: '2024-12-10',
    },
  ]);

  const [showAddEmployee, setShowAddEmployee] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Employee Management</h2>
          <p className="text-gray-600">Manage team access and permissions</p>
        </div>
        <button
          onClick={() => setShowAddEmployee(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Employee
        </button>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="font-medium text-gray-900">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {employee.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {employee.permissions.slice(0, 2).map((perm) => (
                      <span key={perm} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {perm}
                      </span>
                    ))}
                    {employee.permissions.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{employee.permissions.length - 2} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      employee.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {employee.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {showAddEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Add New Employee</h3>
              <button onClick={() => setShowAddEmployee(false)} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>Select Role</option>
                <option>Content Moderator</option>
                <option>Marketing Manager</option>
                <option>Finance Analyst</option>
                <option>Support Agent</option>
              </select>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg hover:shadow-lg">
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
