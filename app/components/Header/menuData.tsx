import { Menu } from "../../../types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 4,
    title: "Builds",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "All Builds",
        path: "/about",
        newTab: false,
      },
      {
        id: 42,
        title: "Submit Build",
        path: "/contact",
        newTab: false,
      }
    ],
  },
];
export default menuData;
