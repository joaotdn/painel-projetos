import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, Card, CardText, CardTitle, LinearProgress } from 'react-md';
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from 'axios';
import constants from '../constants';

export class InProgress extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            id_emissor: null,
            data: [],
            loading: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const prevstate = this.state;
        let id_emissor = nextProps.match.params.id_emissor;
        if (id_emissor) {
            this.setState({ id_emissor: id_emissor });
        }
    }

    render() {
        const columns = [
            {
                Header: 'Projeto',
                accessor: 'projeto',
                width: 350
            }, {
                Header: 'Início',
                accessor: 'inicio',
                style: {
                    textAlign: 'center'
                }
            }, {
                Header: 'Fim',
                accessor: 'fim',
                style: {
                    textAlign: 'center'
                }
            }, {
                Header: 'Status',
                accessor: 'status',
                filterable: false,
                Cell: props => (props.value === 'atrasado') ? <span className='status red'></span> : <span className='status green'></span>,
                style: {
                    textAlign: 'center'
                }
            }, {
                Header: 'Progresso',
                accessor: 'progresso',
                filterable: false,
                Cell: row => (
                    <div
                        style={{
                            width: '100%',
                            height: '20px',
                            backgroundColor: '#dadada',
                            borderRadius: '2px'
                        }}
                    >
                        <div
                            style={{
                                width: `${row.value}%`,
                                height: '20px',
                                backgroundColor: row.value > 66 ? '#85cc00'
                                    : row.value > 33 ? '#ffbf00'
                                        : '#ff2e00',
                                borderRadius: '2px',
                                transition: 'all .2s ease-out'
                            }}
                        />
                    </div>
                ),
                style: {
                    textAlign: 'center'
                }
            }
        ];

        const { data, loading } = this.state;

        return (
            <div>
                <Grid>
                    <Cell desktopSize={12}>
                        <Card>
                            <CardTitle title="Projetos em andamento" />
                            <CardText>
                                <ReactTable
                                    filterable
                                    loading={loading}
                                    data={data}
                                    onFetchData={(state, instance) => {
                                        let prevstate = this.state;
                                        this.setState({ loading: true });
                                        axios
                                            .get(`${constants.API_BASE_URL}/projetos-andamento.json`)
                                            .then(res => {
                                                if (res.statusText === 'OK') {
                                                    this.setState({ data: res.data, loading: false });
                                                } else {
                                                    throw new Error('Server error!');
                                                }
                                            })
                                            .catch(e => {
                                                this.setState(prevstate);
                                                console.error('Error:', e);
                                            });
                                    }}
                                    className="in-progress--table"
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

export default InProgress;