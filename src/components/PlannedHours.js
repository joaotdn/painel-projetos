import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, Card, CardText, CardTitle } from 'react-md';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

import constants from '../constants';

export class PlannedHours extends Component {
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
        let meses = [], horas = [];
        this.state.data.map(d => {
            meses.push(d.mes);
            horas.push(d.horas);
        });

        const data = {
            labels: meses,
            datasets: [
              {
                label: 'Total de horas',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: horas
              }
            ]
        };

        return (
            <div>
                <Grid>
                    <Cell desktopSize={10} desktopOffset={1}>
                        <Card>
                            <CardTitle title="Horas planejadas" />
                            <CardText>
                                <Bar
                                    data={data}
                                />
                            </CardText>
                        </Card>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default PlannedHours;