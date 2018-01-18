import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, Card, CardText, CardTitle, Divider } from 'react-md';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';

import constants from '../constants';

export class ExecutedHours extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            id_emissor: null,
            data: [],
            segmentos: []
        };
    }

    componentWillReceiveProps(nextProps) {
        const prevstate = this.state;
        let id_emissor = nextProps.match.params.id_emissor;
        if (id_emissor) {
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

            axios.get(`${constants.API_BASE_URL}/horas-por-segmento.json`)
                .then(res => {
                    if (res.statusText === 'OK') {
                        this.setState({ segmentos: res.data });
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

        const { data, segmentos } = this.state;

        return (
            <div>
                <Grid>
                    <Cell desktopSize={8} desktopOffset={2}>
                        <Card>
                            <CardTitle title="Mensal" />
                            <Divider />
                            <CardText>
                                <Bar
                                    data={{
                                        labels: data.map(x => x.mes),
                                        datasets: [
                                            {
                                                label: 'Desenvolvimento',
                                                backgroundColor: 'rgba(255,99,132,0.2)',
                                                borderColor: 'rgba(255,99,132,1)',
                                                borderWidth: 1,
                                                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                                hoverBorderColor: 'rgba(255,99,132,1)',
                                                data: data.map(x => x.horas)
                                            }
                                        ]
                                    }}
                                />
                            </CardText>
                        </Card>
                    </Cell>
                    <Cell desktopSize={8} desktopOffset={2}>
                        <Card>
                            <CardTitle title="Por categoria" />
                            <Divider />
                            <CardText>
                                <Pie
                                    data={{
                                        labels: segmentos.map(x => x.segmento),
                                        datasets: [
                                            {
                                                backgroundColor: constants.COLORS,
                                                borderColor: 'rgba(255,255,255,1)',
                                                borderWidth: 2,
                                                hoverBackgroundColor: constants.COLORS,
                                                hoverBorderColor: constants.COLORS,
                                                data: segmentos.map(x => x.horas)
                                            }
                                        ]
                                    }}
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