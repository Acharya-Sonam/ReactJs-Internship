import { useState, useEffect } from "react";

export default function Dashboard() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
    .then((res) => res.json())
    .then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const startEdit = (user) => {
    setEditId(user.id);
    setEditName(user.name.firstname + " " + user.name.lastname);
    setEditEmail(user.email);
  };

  const saveEdit = (id) => {
    setUsers(users.map((u) =>
      u.id === id
        ? { ...u, email: editEmail }
        : u
    ));
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sidebar + Main layout */}
      <div className="flex">

        {/* Sidebar */}
        <aside className="w-56 min-h-screen bg-white border-r border-gray-200 px-4 py-6 shrink-0">
          <h2 className="text-base font-medium text-gray-800 mb-6">Dashboard</h2>
          <nav className="flex flex-col gap-2">
            <span className="text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg font-medium">
              User Management
            </span>
            <span className="text-sm text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              Products
            </span>
            <span className="text-sm text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              Orders
            </span>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8">

          <h1 className="text-xl font-medium text-gray-800 mb-1">User Management</h1>
          <p className="text-sm text-gray-400 mb-6">Manage all registered users</p>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <p className="text-gray-400 text-sm animate-pulse">Fetching users...</p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">ID</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Name</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Email</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Username</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-gray-400">{user.id}</td>
                      <td className="px-4 py-3 text-gray-700 capitalize">
                        {user.name.firstname} {user.name.lastname}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {editId === user.id ? (
                          <input
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none w-full"
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{user.username}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {editId === user.id ? (
                            <>
                              <button
                                onClick={() => saveEdit(user.id)}
                                className="text-xs px-3 py-1 rounded border border-green-300 text-green-600 hover:bg-green-50 transition"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditId(null)}
                                className="text-xs px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 transition"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(user)}
                                className="text-xs px-3 py-1 rounded border border-blue-300 text-blue-600 hover:bg-blue-50 transition"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteUser(user.id)}
                                className="text-xs px-3 py-1 rounded border border-red-300 text-red-500 hover:bg-red-50 transition"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}