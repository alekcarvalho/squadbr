import React, { Suspense, lazy } from "react";
import "components/lazyimport/style.scss";

function LazyImport(Component) {
  const ComponentLoadable = lazy(Component);
  return props => (
    <Suspense
      fallback={
        <div className="loading-wrapper">
          <div className="la-pacman la-dark la-2x">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      }
    >
      <ComponentLoadable {...props} />
    </Suspense>
  );
}

export default LazyImport;
