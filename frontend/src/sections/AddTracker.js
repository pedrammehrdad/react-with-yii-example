import React, {Component} from 'react';
import $ from "jquery";
var moment = require('moment');
const config = require('../config.json');


class AddTracker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            duration: 0,
            start_time: '',
            end_time: '',
            description: '',
            timer: null,
            status: 'stoped',
            formErrors: []
        }

        this.startTimer = this.startTimer.bind(this)
        this.pauseTimer = this.pauseTimer.bind(this)
        this.trackerSubmit = this.trackerSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    start() {
        let reactThis = this;
        clearTimeout(this.state.timer);
        this.setState({
            status: 'play',
            timer: setTimeout(function() {
                reactThis.setState({
                    duration: ++reactThis.state.duration
                });
                reactThis.start();
            }, 1000)
        });
    }

    pause() {
        clearTimeout(this.state.timer);
        this.setState({status: 'paused'});
    }

    continue() {
        let reactThis = this;
        this.setState({
            status: 'play',
            timer: setTimeout(function() {
                reactThis.setState({
                    duration: ++reactThis.state.duration
                });
                reactThis.start();
            }, 1000)
        });
    }

    resetState() {
        this.setState({
            duration: 0,
            start_time: '',
            end_time: '',
            description: '',
            timer: null,
            status: 'stoped',
            formErrors: [],
            getTrackers: ""
        });
    }

    trackerSubmit(event) {
        event.preventDefault();
        var reactThis = this;
        reactThis.setState({
            end_time: moment().format('YYYY/MM/DD H:m:s')
        }, () => {
            reactThis.pause();
            $.ajax({
                method: "post",
                cache: false,
                data: reactThis.state,
                url: config.hostAddress,
                success: function(data) {
                    reactThis.props.getTrackers();
                    reactThis.resetState();
                },
                error: function(status, message) {
                    reactThis.setState({formErrors: status.responseJSON});
                }
            });
        });
    }

    startTimer(event) {
        event.preventDefault();
        this.setState({duration: 0, timer: null, start_time: moment().format('YYYY/MM/DD H:m:s')});
        this.start();
    }

    pauseTimer(event) {
        event.preventDefault();
        if (this.state.status === 'play')
            this.pause();
        else {
            if (this.state.status === 'paused')
                this.continue();
            }
        }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (<form onSubmit={this.trackerSubmit} className="row justify-content-around">
            <div className="col-12 mt-5">
                <h2 className="text-primary">Start a Tracker</h2>
            </div>
            <div className="form-group col">
                <label>Description:</label>
                <textarea required="required" className="form-control" name="description" onChange={this.handleChange} placeholder="Description" value={this.state.description}/>
            </div>
            <div className="form-group col-3">
                <label>Started at:</label>
                <input onChange={this.handleChange} name="start_time" value={this.state.start_time} readOnly="readOnly" className="form-control"/>
            </div>
            <div className="form-group col-3">
                <label>Time:</label>
                <input onChange={this.handleChange} readOnly="readOnly" name="duration" value={this.state.duration} type="hidden"/>
                <h3>{parseInt(this.state.duration / 3600, 10)}: {parseInt(this.state.duration / 60, 10)}: {this.state.duration % 60}
                </h3>
            </div>
            <div className="form-group">
                <label>Actions:</label>
                <div className="d-block">
                    <button onClick={this.startTimer} className="btn btn-success mb-3 mr-3">Start</button>
                    <button onClick={this.pauseTimer} className="btn btn-info mb-3 mr-3">Pause</button>
                    <button onClick={this.saveTrack} className="btn btn-primary mb-3 mr-3">End</button>
                </div>
            </div>
            {this.state.formErrors.map((key, err) => <div className="col-12 text-danger">{key.message}</div>)}
        </form>);
    }
}

export default AddTracker;
