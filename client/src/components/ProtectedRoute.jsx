import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({
    component: Component,
    mysteryStatus,
    handleCurrentMystery,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (localStorage.getItem("token") !== null) {
                    return <Component
                        mysteryStatus={mysteryStatus}
                        handleCurrentMystery={handleCurrentMystery}
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