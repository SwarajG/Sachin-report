import React from 'react';
import { render } from 'react-dom';
import {
  Grid,
  Header,
  Button,
  Icon,
  Modal,
} from 'semantic-ui-react';

// Styles for the page
import '../../css/style.css';

export default class MyView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  handleOpen(e){
    this.setState({
      modalOpen: true,
    });
  }

  handleClose(e) {
    this.setState({
      modalOpen: false,
    });
  }

  render () {
    return (
      <div>
        <Grid centered columns={2}>
          <Grid.Column>
            <Modal
              trigger={<Button primary onClick={() => this.handleOpen()}>My View</Button>}
              open={this.state.modalOpen}
              onClose={this.handleClose}
              basic
              size='small'
            >
              <Header icon='comment' content='My Views on Sachin&#39;s report' />
              <Modal.Content>
                <h3>The points which shows that Sachin was a great batsman.</h3>
                <ul className="listOfPoints">
                  <li>He has consistant average run against each year (Almost above 40 runs per year).</li>
                  <li>He has very good average against each team through out his career (Almost above 40 runs).</li>
                  <li>He has scored centuary against all the teams and had made heighst against most powserful team Australia.</li>
                </ul>
              </Modal.Content>
              <Modal.Actions>
                <Button color='green' onClick={() => this.handleClose()} inverted>
                  <Icon name='checkmark' /> Okay
                </Button>
              </Modal.Actions>
            </Modal>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
