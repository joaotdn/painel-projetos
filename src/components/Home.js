import React, { Component } from 'react';
import { Card, CardText } from 'react-md';

export class Home extends Component {
    render() { 
        return (
            <div className="md-grid">
                <Card className="md-cell md-cell--6 md-cell--8-tablet">
                    <CardText>
                        <p>
                           &copy; Conductor Tecnologia   
                        </p>
                    </CardText>
                </Card>
            </div>
        );
    }
}
 
export default Home;