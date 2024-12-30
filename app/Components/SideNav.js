"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ClockArrowDown } from "lucide-react";

import { Medal, User } from "lucide-react";

const SIDENAV_ITEMS = [
  {
    title: "Users",
    path: "/users",
    icon: <User size={24} />,
    submenu: true,
    subMenuItems: [
      { title: "All Users", path: "/users" },
      { title: "Add User", path: "/users/add-user" },
    ],
    rights: true,
  },
  {
    title: "Pending Approvals",
    path: "/approvals",
    icon: <ClockArrowDown size={24} />,
    rights: true,
  },
  {
    title: "Acheivements",
    path: "/achievement",
    icon: <Medal size={24} />,
    submenu: true,
    subMenuItems: [
      { title: "All Acheivement", path: "/achievement" },
      { title: "Add Acheivement", path: "/achievement/add-achievement" },
    ],
    rights: false,
  },
];

const SideNav = ({ rights }) => {
  console.log("rights : " + rights);

  return (
    <div className="flex flex-col space-y-2">
      {rights
        ? SIDENAV_ITEMS.map((item, index) => {
            return <MenuItem key={index} item={item} />;
          })
        : SIDENAV_ITEMS.map((item, index) => {
            return (
              item.rights === rights && <MenuItem key={index} item={item} />
            );
          })}
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };
  return (
    <div>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg gap-6 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-xl hidden md:flex">
                {item.title}
              </span>
            </div>
            <div
              className={`${subMenuOpen ? "rotate-180" : ""} hidden md:flex `}
            >
              <ChevronDown size={24} />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 md:ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => (
                <Link
                  key={idx}
                  href={subItem.path}
                  className={`${subItem.path === pathname ? "font-bold" : ""}`}
                >
                  <span>{subItem.title}</span>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}
        >
          {item.icon}
          <span className="font-semibold text-xl">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
