import React, { Component } from 'react';
import { Route, Switch, matchPath } from 'react-router';
import { NavigationDrawer, MenuButton, FontIcon, ListItem } from 'react-md';
import NavLink from './components/NavLink';
import MenuLink from './components/MenuLink';

import Home from './components/Home';
import ExectedHours from './components/ExecutedHours';
import LastSendeds from './components/LastSendeds';
import InProgress from './components/InProgress';
import Planned from './components/Planned';
import PlannedHours from './components/PlannedHours';

import axios from 'axios';
import constants from './constants';
import menu from './components/modules/menu-items';

class App extends Component {
  constructor() {
    super(...arguments);
    this.state={
      emissores: [],
      toolbarTitle: 'Painel de projetos',
      emissor_ativo: null
    }
  }

  componentDidMount() {
    const prevState = this.state;
    axios.get(`${constants.API_BASE_URL}/emissores.json`)
      .then((res) => {
        if(res.statusText === 'OK') {
          this.setState({ emissores: res.data });
        } else {
          throw new Error('Server error');
        }
      })
      .catch((e) => {
        this.setState(prevState);
        console.error('Error:', e);
      });
  }

  handleTitle(title) {
    if(title) {
      this.setState({ toolbarTitle: title });
    }
  }
  render() {
    return (
      <Route 
        render={({location}) => {
          // REFATORAR
          // use flux/redux
          let path = location.pathname.split('/'), emissorAtivo;
          if (path.length > 2 && this.state.emissores.length > 0) {
            emissorAtivo = this.state.emissores.find(em => em.id==path[2]);
          }
          // FIM REFATORAR

          return (
            <NavigationDrawer
                drawerTitle="Emissores"
                toolbarTitle={(emissorAtivo) ? emissorAtivo.name : this.state.toolbarTitle}
                navItems={this.state.emissores.map(em =>
                  <NavLink
                    key={em.id}
                    to={"/emissor/" + em.id + '/horas-executadas'}
                    label={em.name}
                    action={this.handleTitle.bind(this, em.name)}
                  />
                )}
                toolbarActions={(emissorAtivo) ? (
                  <MenuButton id="menu-button-2"
                              icon
                              listClassName="emissores"
                              menuItems={menu(emissorAtivo.id).map(em => (
                                <MenuLink 
                                  key={em.id}
                                  to={em.to}
                                  label={em.label}
                                />
                              ))}>
                    more_vert
                  </MenuButton>
                ) : null}
              >
                <Switch key={location.key} loca={location}>
                  <Route exact path="/" location={location} component={Home} />
                  <Route path="/emissor/:id_emissor/horas-executadas" component={ExectedHours} />
                  <Route path="/emissor/:id_emissor/ultimos-entregues" component={LastSendeds} />
                  <Route path="/emissor/:id_emissor/em-andamento" component={InProgress} />
                  <Route path="/emissor/:id_emissor/planejados" component={Planned} />
                  <Route path="/emissor/:id_emissor/horas-planejadas" component={PlannedHours} />
                </Switch>
            </NavigationDrawer>
          );
        }}
      />
    );
  }
}

export default App;
