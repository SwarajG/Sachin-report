import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { Grid } from 'semantic-ui-react';

export default class InputSlider extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let startYear = this.props.value.min;
    let endYear = this.props.value.max;
    return (
      <div>
        <InputRange
          maxValue={2013}
          minValue={1988}
          formatLabel={undefined}
          value={this.props.value}
          onChange={(value) => this.props.onChange(value)}
          onChangeComplete={() => this.props.onChangeComplete(startYear, endYear)}
        />
      </div>
    );
  }
}
