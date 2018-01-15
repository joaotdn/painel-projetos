import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, Card, CardText, CardTitle, Divider } from 'react-md';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

import constants from '../constants';

export class ExecutedHours extends Component {
    constructor() {
        super(...arguments);
        this.state={
            id_emissor: null,
            data: []
        };
    }
    
    componentWillReceiveProps(nextProps) {
        const prevstate = this.state;
        let id_emissor = nextProps.match.params.id_emissor;
        if(id_emissor) {
            this.setState({ id_emissor: id_emissor });
            axios.get(`${constants.API_BASE_URL}/horas-executadas.json`)
                .then(res => {
                    if (res.statusText === 'OK') {
                        this.setState({ data: res.data });
                    } else {
                        throw new Error('Server error!');
                    }
                })
                .catch(e => {
                    this.setState(prevstate);
                    console.error('Error:', e);
                });
        }
    }
    
    render() {
        const data = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
              }
            ]
        };

        return (
            <div>
                <Grid>
                    <Cell desktopSize={8} desktopOffset={2}>
                        <Card>
                            <CardTitle title="Horas executadas"/>
                            <Divider/>
                            <CardText>
                                <Bar

                                />
                            </CardText>
                        </Card>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default ExecutedHours;