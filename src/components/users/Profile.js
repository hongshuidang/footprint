import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

import MyAvatarEditor from './MyAvatarEditor';
import { updateProfile } from '../../store/actions/authActions'
import { connect } from 'react-redux'


class Profile extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.toggle = this.toggle.bind(this);
  //   this.toggleFade = this.toggleFade.bind(this);
  //   this.state = {
  //     collapse: true,
  //     fadeIn: true,
  //     timeout: 300,
  //     profile: {
  //       avatar: null,
  //     }
  //   };
  // }
  //
  // toggle() {
  //   this.setState({ collapse: !this.state.collapse });
  // }
  // toggleFade() {
  //   this.setState((prevState) => { return { fadeIn: !prevState }});
  // }

  constructor(props) {
    super(props);
    this.state = {
      uid: props.auth.uid,
      email: props.auth.email,
      firstName: props.profile.firstName,
      lastName: props.profile.lastName,
      gender: props.profile.gender,
      personalStatus: props.profile.personalStatus,
      avatar: props.profile.avatar,
    };

  }

  updateInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  transmitAvatar = (dataURL) => {
      this.setState({
          avatar: dataURL,
      });
  }

  handleSubmit = () => {
    this.props.updateProfile(this.state);
    //console.log(this.state);
    //console.log(this.props.profile);
  }


  render() {
    return (
      <div className="animated fadeIn mt-3">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Edit your profile</strong>
              </CardHeader>
              <CardBody>
                <FormGroup row className="my-0">
                  <Col xs="2">
                    <MyAvatarEditor transmitAvatar={this.transmitAvatar}/>
                  </Col>
                  <Col xs="10">
                    <FormGroup row className="my-0">
                      <Col xs="12">
                        <FormGroup>
                          <Label htmlFor="email">Email</Label>
                          <Input type="text" id="email" value={this.state.email} disabled/>
                        </FormGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row className="my-0">
                      <Col xs="6">
                        <FormGroup>
                          <Label htmlFor="firstName">First name</Label>
                          <Input type="text" id="firstName" placeholder="Enter your first name" value={this.state.firstName} onChange={this.updateInput} />
                        </FormGroup>
                      </Col>
                      <Col xs="6">
                        <FormGroup>
                          <Label htmlFor="lastName">Last name</Label>
                          <Input type="text" id="lastName" placeholder="Enter your last name" value={this.state.lastName} onChange={this.updateInput} />
                        </FormGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row className="my-0">
                      <Col xs="6">
                        <FormGroup>
                          <Label htmlFor="gender">Gender</Label>
                          <Input type="select" id="gender" value={this.state.gender} onChange={this.updateInput} >
                            <option>Please select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col xs="6">
                        <FormGroup>
                          <Label htmlFor="marriage">Personal status</Label>
                          <Input type="select" id="personalStatus" value={this.state.personalStatus} onChange={this.updateInput} >
                            <option>Please select</option>
                            <option value="Single">Single</option>
                            <option value="Coupled without kid">Coupled without kid</option>
                            <option value="Coupled with kid">Coupled with kid</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary" className="mr-2" onClick={this.handleSubmit}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}




const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (newProfile) => dispatch(updateProfile(newProfile))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);