import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({
    component: Component,
    mysteryStatus,
    mysteries,
    currentMystery,
    handleCurrentMystery,
    vttLoaded,
    currentTime,
    handleCurrentPlayback,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (localStorage.getItem("token") !== null) {
                    return <Component
                        mysteryStatus={mysteryStatus}
                        mysteries={mysteries}
                        currentMystery={currentMystery}
                        handleCurrentMystery={handleCurrentMystery}
                        vttLoaded={vttLoaded}
                        currentTime={currentTime}
                        handleCurrentPlayback={handleCurrentPlayback}
                    />;
                } else {
                    return (
                        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                    );
                }
            }}
        />
    );
}

export default ProtectedRoute;