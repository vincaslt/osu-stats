import React, { Component } from 'react';
import Router, { Link, RouteHandler } from 'react-router';
import { PageHeader } from 'react-bootstrap'

export default class App extends Component {
    render() {
        return (
            <div class="app">
                <div className="container">
                    <PageHeader>Osu Top Plays</PageHeader>
                    SCORELIST HERE
                </div>
                <footer className="footer">
                    <div className="container">
                        <p className="text-muted">
                            Created by <a href="http://jizz.ppy.sh/u/3820339#osu">vincaslt</a> at <a href="http://stonyvin.net">stonyvin.net</a>
                        </p>
                    </div>
                </footer>
            </div>
        )
    }
}
