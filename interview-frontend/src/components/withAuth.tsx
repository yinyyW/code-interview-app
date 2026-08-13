import { useEffect } from "react";
import { useAppSelector } from "../hooks/useStoreHooks";
import ACCESS_ENUM from "../access/accessEnum";
import { useRouter } from "next/navigation";
import Forbidden from "../app/forbidden";

export interface WithAuthProps {
  requiredAuth?: string;
}

export default function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function WithAuthComponent(props: P & WithAuthProps) {
    const { requiredAuth, ...rest } = props;

    const router = useRouter();
    const loginUser = useAppSelector((state) => state.loginUser);

    useEffect(() => {
      console.log("withAuth init");
      // if (!requiredAuth || requiredAuth === ACCESS_ENUM.NOT_LOGIN) {
      //   return;
      // }
      // if (!loginUser || !loginUser.id) {
      //   router.push("/user/login");
      //   return;
      // }
    }, []);

    if (requiredAuth === ACCESS_ENUM.ADMIN && loginUser?.userRole !== "admin") {
      return <Forbidden />;
    }

    return <WrappedComponent {...(rest as P)} />;
  };
}
