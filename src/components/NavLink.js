import React from 'react';
import { Link as RouterLink, Route } from 'react-router-dom';
import { ListItem } from 'react-md';


const NavLink = ({label, to, action}) => (
    <Route path={to}>
        {({match}) => {
            return (
                <ListItem
                    component={RouterLink}
                    active={!!match}
                    to={to}
                    primaryText={label}
                    onClick={action}
                />
            );
        }}
    </Route>
);

export default NavLink;