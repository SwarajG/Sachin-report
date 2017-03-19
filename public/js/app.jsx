import React from 'react';
import { render } from 'react-dom';
import {
  Grid,
  Header,
} from 'semantic-ui-react';
import { Chart } from 'react-google-charts';

// service call
import PLAYERINFO from './service';

// App modules
import InputRange from './components/slider';
import chartData from './chartFilter';
import MyView from './components/MyView';

// Styles for the page
import '../css/style.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onChangeComplete = this.onChangeComplete.bind(this);
    this.getCommonOptions = title => ({
      bar: {
        groupWidth: '95%',
      },
      legend: {
        position: 'none',
      },
      title,
    });
    this.chartEvents = [{
      eventName: 'onmouseover',
      callback() {},
    }];
    this.avgScoreAgainstTeamOption = this.getCommonOptions('Average run against each team');
    this.centuryAgainstTeamOption = this.getCommonOptions('Century against each team');
    this.state = {
      value: {
        min: 1994,
        max: 2008,
      },
      avgScoreAgainstTeam: [],
      tonAgainstEachTeam: [],
      yearWiseAverage: [],
    };
  }

  componentDidMount() {
    const startYear = this.state.value.min;
    const endYear = this.state.value.max;
    this.fetchAndUpdatePlayerInfo(startYear, endYear);
  }

  onChange(value) {
    this.setState({
      value,
    });
  }

  onChangeComplete(startYear, endYear) {
    this.fetchAndUpdatePlayerInfo(startYear, endYear);
  }

  fetchAndUpdatePlayerInfo(startYear, endYear) {
    PLAYERINFO(startYear, endYear)
    .then((playerInfo) => {
      this.callbackForFetchCall(playerInfo);
    });
  }

  callbackForFetchCall(playerInfo) {
    const avgScoreAgainstTeam = playerInfo.avgScoreAgainstTeam;
    const tonAgainstEachTeam = playerInfo.tonAgainstEachTeam;
    const yearWiseAverage = playerInfo.yearWiseAverage;
    this.setState({
      avgScoreAgainstTeam: chartData.getInfoForAverageRunVsTeam(avgScoreAgainstTeam),
      tonAgainstEachTeam: chartData.getTonAgainstEachTeam(tonAgainstEachTeam),
      yearWiseAverage: chartData.getYearWiseAverage(yearWiseAverage),
    });
  }

  handleOpen() {
    this.setState({
      modalOpen: true,
    });
  }

  handleClose() {
    this.setState({
      modalOpen: false,
    });
  }

  render() {
    const avgScoreAgainstTeamData = this.state.avgScoreAgainstTeam;
    const tonAgainstEachTeamData = this.state.tonAgainstEachTeam;
    const yearWiseAverage = this.state.yearWiseAverage;

    return (
      <div>
        <Header
          as="h1"
          textAlign="center"
          className="app__header"
        >
          Sachin&#39;s report card
        </Header>

        <Grid centered columns={2}>
          <Grid.Column>
            <MyView />
          </Grid.Column>
        </Grid>

        <Grid centered columns={2}>
          <Grid.Column>
            <InputRange
              value={this.state.value}
              onChange={this.onChange}
              onChangeComplete={this.onChangeComplete}
            />
          </Grid.Column>
        </Grid>

        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Chart
                chartType="BarChart"
                data={avgScoreAgainstTeamData}
                options={this.avgScoreAgainstTeamOption}
                width="100%"
                height="500px"
                chartEvents={this.chartEvents}
                legend_toggle
              />
            </Grid.Column>
            <Grid.Column>
              <Chart
                chartType="BarChart"
                data={tonAgainstEachTeamData}
                options={this.centuryAgainstTeamOption}
                width="100%"
                height="500px"
                chartEvents={this.chartEvents}
                legend_toggle
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={1}>
          <Grid.Row>
            <Grid.Column>
              <Chart
                chartType="LineChart"
                data={yearWiseAverage}
                options={{
                  title: 'Average run per year',
                }}
                width="100%"
                height="500px"
                chartEvents={this.chartEvents}
                legend_toggle
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
