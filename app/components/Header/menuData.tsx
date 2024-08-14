import { Menu } from "../../../types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
    submenu: []
  },
  {
    id: 4,
    title: "Builds",
    newTab: false,
    submenu: [
      {
        id: 42,
        title: "Submit Build",
        path: "/buildCreate",
        newTab: false,
        submenu: []
      }
    ],
    path: ""
  },
];
export default menuData;
