import React from 'react';
import { Link as RouterLink, Route } from 'react-router-dom';
import { ListItem } from 'react-md';

const MenuLink = ({label, to}) => (
    <Route path={to}>
        {({match}) => {
            return (
                <ListItem
                    component={RouterLink}
                    active={!!match}
                    to={to}
                    primaryText={label}
                />
            );
        }}
    </Route>
);

export default MenuLink;