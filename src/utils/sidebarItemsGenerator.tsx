import { TSidebarItem, TUserPath } from "../types";
import { NavLink } from "react-router-dom";

export const sidebarItemsGenerator = (items: TUserPath[]) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/dashboard/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      const childItems = item.children
        .filter((child) => child.name && child.path) // ✅ Ensure valid children
        .map((child) => ({
          key: child.name!,
          label: <NavLink to={`/dashboard/${child.path}`}>{child.name}</NavLink>,
        }));

      if (childItems.length > 0) {
        acc.push({
          key: item.name,
          label: item.name,
          children: childItems,
        });
      }
    }

    return acc;
  }, []);

  sidebarItems.push({
    key: "Home",
    label: <NavLink to="/">Home</NavLink>,
  });

  return sidebarItems;
};
