import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, Flip } from 'react-toastify';
import EditUser from './editUser';

const Users = () => {
  let [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get('/get-user').then((resp) => {
      let data = resp.data;
      let regularUsers = data.filter((user) => user.type !== 'admin');
      setUsers(regularUsers);
    });
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleSave = (editedUser) => {
    axios.put(`/update-user/${editedUser._id}`, editedUser).then((resp) => {
      const updatedUsers = users.map((user) =>
        user._id === editedUser._id ? editedUser : user
      );
      setUsers(updatedUsers);
      toast.success('User updated', {
        transition: Flip,
        autoClose: 1000,
        position: 'bottom-left',
        theme: 'dark',
      });
      setShowEditModal(false);
    });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId) => {
    axios
      .delete(`/delete-user?id=${userId}`)
      .then((resp) => {
        const updatedUsers = users.filter((user) => user._id !== userId);
        setUsers(updatedUsers);
        toast.warn('User deleted', {
          transition: Flip,
          autoClose: 1000,
          position: 'bottom-left',
          theme: 'dark',
        });
      })
      .catch((error) => {
        console.error('There was an error deleting the user:', error);
        toast.error('Failed to delete user', {
          transition: Flip,
          autoClose: 3000,
          position: 'bottom-left',
          theme: 'dark',
        });
      });
  };

  return (
    <>
      <br />
      <br />
      <h2 className="text-2xl font-semibold text-gray-800">Registered users on your page.</h2>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="px-4 py-2 text-sm font-medium text-gray-700">User ID</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700">User Name</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700">User Email</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700">Delete User</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700">Edit User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{user.id}</td>
                <td className="px-4 py-2 text-sm text-gray-700 capitalize">{user.userName}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-white bg-red-500 hover:bg-red-600 py-1 px-3 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded-md text-sm"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEditModal && (
        <EditUser user={selectedUser} onSave={handleSave} onHide={handleCloseEditModal} />
      )}
      <br />
      <br />
    </>
  );
};

export default Users;
