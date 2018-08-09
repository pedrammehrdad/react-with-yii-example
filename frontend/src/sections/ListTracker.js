import React, {Component} from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
var moment = require('moment');

class ListTracker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            descriptionSearch: ''
        }
        this.findTracker = this.findTracker.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    findTracker(current, pageSize) {
        this.props.getTrackers(current, pageSize, (
            this.state.descriptionSearch == ''
            ? undefined
            : this.state.descriptionSearch))
    }

    handleOnChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            this.findTracker()
        })
    }

    render() {
        return (<div>
            <table className="table table-striped tracker-table">
                <tbody>
                    <tr>
                        <td>
                            <b>Description</b>
                            <input name="descriptionSearch" type="text" onChange={this.handleOnChange} className="d-block" placeholder="Search In Descriptions"/>
                        </td>
                        <td>
                            <b>Start at</b>
                        </td>
                        <td>
                            <b>Duration</b>
                        </td>
                        <td>
                            <b>End at</b>
                        </td>
                    </tr>
                    {
                        Object.keys(this.props.trackers).map((key, index) => <tr key={index}>
                            <td>{this.props.trackers[index].description}</td>
                            <td>{this.props.trackers[index].start_time}</td>
                            <td>{moment("2018-01-01").startOf("day").seconds(this.props.trackers[index].duration).format('H:m:s')}</td>
                            <td>{this.props.trackers[index].end_time}</td>
                        </tr>)
                    }
                </tbody>
            </table>
            <Pagination showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} items`} current={this.props.page} pageSize={this.props.pageSize} total={this.props.total} onChange={this.findTracker} locale={'en_US'}/>
        </div>);
    }
}

export default ListTracker;
