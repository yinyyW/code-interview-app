import { useAppSelector } from "../hooks/useStoreHooks";
import ACCESS_ENUM from "../access/accessEnum";
import Forbidden from "../app/forbidden";

export interface WithAuthProps {
  requiredAuth?: string;
}

export default function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function WithAuthComponent(props: P & WithAuthProps) {
    const { requiredAuth, ...rest } = props;
    const loginUser = useAppSelector((state) => state.loginUser);

    if (requiredAuth === ACCESS_ENUM.ADMIN && loginUser?.userRole !== "admin") {
      return <Forbidden />;
    }

    return <WrappedComponent {...(rest as P)} />;
  };
}
