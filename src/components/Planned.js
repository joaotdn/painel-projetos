import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, Card, CardText, CardTitle } from 'react-md';
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from 'axios';
import constants from '../constants';

export class Planned extends Component {
    constructor() {
        super(...arguments);
        this.state={
            id_emissor: null,
            data: [],
            loading: false
        };
    }
    
    componentWillReceiveProps(nextProps) {
        const prevstate = this.state;
        let id_emissor = nextProps.match.params.id_emissor;
        if(id_emissor) {
            this.setState({ id_emissor: id_emissor });           
        }
    }
    
    render() { 
        const columns = [
            {
                Header: 'Projetos',
                accessor: 'projetos',
                width: 350
            }, {
                Header: 'GO',
                accessor: 'go'
            }, {
                id: 'Horas',
                Header: 'Horas',
                accessor: 'horas'
            }, {
                Header: 'Fim',
                accessor: 'fim'
            }, {
                Header: 'Entrega em dia',
                accessor: 'entregaEmDia'
            }, {
                Header: 'Entrega com bugs',
                accessor: 'entregaComBugs'
            }
        ];

        const { data, loading } = this.state;

        return (
            <div>
                <Grid>
                    <Cell desktopSize={12}>
                        <Card>
                            <CardTitle title="Projetos planejados" />
                            <CardText>
                                <ReactTable
                                    filterable
                                    loading={loading}
                                    data={data}
                                    onFetchData={(state, instance) => {
                                        let prevstate = this.state;
                                        this.setState({ loading: true });
                                        axios
                                            .get(`${constants.API_BASE_URL}/projetos-planejados.json`)
                                            .then(res => {
                                                if (res.statusText === 'OK') {
                                                    this.setState({data: res.data, loading: false});
                                                } else {
                                                    throw new Error('Server error!');
                                                }
                                            })
                                            .catch(e => {
                                                this.setState(prevstate);
                                                console.error('Error:', e);
                                            });
                                    }}
                                    columns={columns}
                                />
                            </CardText>
                        </Card>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default Planned;