import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, Card, CardText } from 'react-md';

export class PlannedHours extends Component {
    constructor() {
        super(...arguments);
        this.state={
            id_emissor: null
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
        return (
            <div>
                <Grid>
                    <Cell desktopSize={10} desktopOffset={1}>
                        <Card>
                            <CardText>
                                <p>
                                    Horas Planejadas
                                </p>
                            </CardText>
                        </Card>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default PlannedHours;