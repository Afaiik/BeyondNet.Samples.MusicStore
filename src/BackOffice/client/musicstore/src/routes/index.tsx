import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

import { ENTITY_TYPE } from "../models/constants";

const renderComponent = {
  [ENTITY_TYPE.Idea]: lazy(() => import("../pages/idea")),
  [ENTITY_TYPE.Contact]: lazy(() => import("../pages/contact")),
};

interface RoutesProps {
  entity: "Idea";
  setEntity: any;
}

const Routes = ({ entity, setEntity }: RoutesProps) => {
  const render = (routeEntity: string) => () => {
    if (entity !== routeEntity) {
      //clearAll()
      //setEntity(routeEntity)
    }

    const Component = renderComponent[routeEntity];

    return (
      <Suspense fallback={<div />}>
        <Component />
      </Suspense>
    );
  };

  return (
    <>
      <Route element={null} path="/" />;
      <Route path="/Idea" element={render(ENTITY_TYPE.Idea)} />
      <Route path="/Contact" element={render(ENTITY_TYPE.Contact)} />
    </>
  );
};

Routes.defaultProps = {
  entity: null,
};

Routes.propTypes = {
  entity: PropTypes.string,
};

export default Routes;
