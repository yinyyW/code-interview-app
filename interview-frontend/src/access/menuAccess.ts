import { MenuDataItem } from "@ant-design/pro-components";
import ACCESS_ENUM from "./accessEnum";

/**
 * 获取有权限、可访问的菜单
 * @param loginUser
 * @param menuItems
 */
const getAccessibleMenus = (
  loginUser: API.LoginUserVO,
  menuItems: MenuDataItem[],
) => {
  return menuItems.filter((item) => {
    if (item.access === ACCESS_ENUM.ADMIN) {
      if (
        loginUser &&
        loginUser.userRole &&
        loginUser.userRole === ACCESS_ENUM.ADMIN
      ) {
        return true;
      }
      return false;
    }
    return true;
  });
};

export default getAccessibleMenus;
