import AddUserForm from "@Components/AddUserForm";
import React from "react";

export default async function AddUser() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-4">Add New Users</h1>
      <AddUserForm />
    </div>
  );
}
