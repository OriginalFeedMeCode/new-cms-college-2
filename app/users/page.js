import DeleteUserButton from "@Components/DeleteUserButton";
import React from "react";

export default async function UsersPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    console.error(response);
  }
  const data = await response.json();
  const users = data.data;
  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <h2 className="text-xl mb-4">Total Users - {users.length}</h2>
      <table className="table overflow-x-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => {
            return (
              <tr className="hover:bg-gray-50" key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.role}</td>
                <td>
                  <DeleteUserButton userId={item.userId} name={item.name} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
