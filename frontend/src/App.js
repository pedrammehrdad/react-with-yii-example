import React, {Component} from 'react';
import AddTracker from './sections/AddTracker';
import AddFreeTracker from './sections/AddFreeTracker';
import ListTracker from './sections/ListTracker';
import config from './config.json';
import $ from "jquery";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trackers: {},
            total: 0,
            page: 1,
            pageSize: 5

        }
        this.getTrackers = this.getTrackers.bind(this)
    }

    componentDidMount() {
        this.getTrackers();
    }

    getTrackers(current = 1, pageSize = pageSize, filter) {
        var reactThis = this;
        $.ajax({
            method: "get",
            cache: false,
            data: {
                'TrackerSearch[description]': filter,
                pageSize: reactThis.state.pageSize,
                page: current,
                sort: '-_id'
            },
            url: config.hostAddress,
            success: function(data, status, xhr) {
                // console.log(xhr.getResponseHeader("X-Pagination-Total-Count"))
                // console.log(xhr.getResponseHeader("X-Pagination-Per-Page"))
                reactThis.setState({
                    page: parseInt(xhr.getResponseHeader("X-Pagination-Current-Page"), 10),
                    total: parseInt(xhr.getResponseHeader("X-Pagination-Total-Count"), 10),
                    trackers: data
                });
            }
        });
    }

    render() {
        return (<div className="App container">
            <AddTracker getTrackers={this.getTrackers}/>
            <AddFreeTracker getTrackers={this.getTrackers}/>
            <ListTracker trackers={this.state.trackers} getTrackers={this.getTrackers} pageSize={this.state.pageSize} total={this.state.total} page={this.state.page}/>
        </div>);
    }
}

export default App;
