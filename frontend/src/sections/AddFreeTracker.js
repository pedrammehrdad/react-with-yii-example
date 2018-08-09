import React, {Component} from 'react';
import 'jquery-datetimepicker/build/jquery.datetimepicker.full.min.js';
import 'jquery-datetimepicker/build/jquery.datetimepicker.min.css';
import $ from "jquery";
var moment = require('moment');

class AddTracker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            duration: 0,
            start_time: '',
            end_time: '',
            description: '',
            formErrors: []
        }

        this.trackerSubmit = this.trackerSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
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

        $.ajax({
            method: "post",
            cache: false,
            data: reactThis.state,
            url: "http://localhost/tracker/backend/web/tracker",
            success: function(data) {
                reactThis.props.getTrackers();
                reactThis.resetState();
            },
            error: function(status, message) {
                reactThis.setState({formErrors: status.responseJSON});
            }
        });
    }
    componentDidMount() {
        $('.datepicker').datetimepicker({changeMonth: true, changeYear: true, showButtonPanel: true, yearRange: "-116:+34", dateFormat: 'dd/mm/yy'});
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (<form onSubmit={this.trackerSubmit} className="row justify-content-around">
            <div className="col-12 mt-5">
                <h2 className="text-primary">Add a Tracker</h2>
            </div>
            <div className="form-group col">
                <label>Description:</label>
                <textarea required="required" rows="5" className="form-control" name="description" onChange={this.handleChange} placeholder="Description" value={this.state.description}/>
            </div>
            <div className="col-3">
                <div className="form-group">
                    <label>Started at:</label>
                    <input required="required" onBlur={this.handleChange} name="start_time" value={this.state.start_time} className="form-control datepicker"/>
                </div>
                <div className="form-group">
                    <label>End at:</label>
                    <input required="required" onBlur={this.handleChange} name="end_time" value={this.state.end_time} className="form-control datepicker"/>
                </div>
            </div>
            <div className="col-3">
                <div className="form-group">
                    <label>Duration(in seconds):</label>
                    <input required="required" onChange={this.handleChange} className="form-control" name="duration" value={this.state.duration}/>
                </div>
                <div className="form-group">
                    <label>&nbsp;</label>
                    <button className="btn btn-success mb-3 mr-3 col">Save</button>
                </div>
            </div>
            {this.state.formErrors.map((key, err) => <div className="col-12 text-danger">{key.message}</div>)}
        </form>);
    }
}

export default AddTracker;
