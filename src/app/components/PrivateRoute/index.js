import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({
  component: Component,
  prevLocation,
  children,
  ...rest
}) => {
  const isLogged = useSelector(state => state?.auth?.isLogged);
  return (
    <Route
      {...rest}
      render={props => {
        return isLogged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        );
      }}
    ></Route>
  );
};
