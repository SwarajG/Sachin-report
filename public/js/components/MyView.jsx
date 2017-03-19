import React from 'react';
import { render } from 'react-dom';
import {
  Grid,
  Header,
  Button,
  Icon,
  Modal,
} from 'semantic-ui-react';


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
                <h3>This website uses cookies to ensure the best user experience.</h3>
              </Modal.Content>
              <Modal.Actions>
                <Button color='green' onClick={() => this.handleClose()} inverted>
                  <Icon name='checkmark' /> Got it
                </Button>
              </Modal.Actions>
            </Modal>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
