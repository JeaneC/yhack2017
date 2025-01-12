import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements';

import EventBox from '../components/EventBox';

import user from '../assets/tabbar/user.png';
import map from '../assets/tabbar/map.png';
import calendar from '../assets/tabbar/calendar.png';

import backArrow from '../assets/images/back_white.png';

import yhack from '../assets/images/yhack.png';
import participants0 from '../assets/images/participants0.png';
import participants from '../assets/images/participants.png';

import { database } from '../firebase/firebase';


import user0 from '../assets/events/profiles/0.png';
import user1 from '../assets/events/profiles/1.png';
import user3 from '../assets/events/profiles/3.png';
import user4 from '../assets/events/profiles/4.png';
import user5 from '../assets/events/profiles/5.png';

import addIcon from '../assets/images/add.png';


import { updateEventId, updateEventTurns } from '../actions/index';
import styled from 'styled-components/native'

class EventScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      events: this.props.events ? this.props.events : {},
      eventId: this.props.eventId ? this.props.eventId : undefined
    }

    //Set events and set userid
  }
  componentDidMount() {
    console.log('Event Screen Loaded')
    database.ref(`events/`).on("value", (snapshot) => {
      const events= snapshot.val()
      // console.log(markers)
      if ( events ) {
        this.setState({ events })
      }
    })
  }

  createEvent = () => {
    this.props.navigation.navigate('createEvent')
  }

  onEventPress = async (key) => {
    const selectedEvent = this.state.events[key]
    const eventKey = key
    if (selectedEvent.currentTurn < selectedEvent.numberOfTurns) {
      //store eventId
      const wait = await this.props.updateEventId(key)
      const wait2 = await this.props.updateEventTurns(selectedEvent.numberOfTurns)
      this.props.navigation.navigate('map')
    } else {
      //We load to event view screen
      console.log('This event is done')

    }
    //we check the event to see if it's completed
    //if it's completed we redirect to complete Screen
    //for now we just console.log

    //if it's not completed then we store the event id to map screen
    //and redirect to map navigation
  }

  render(){
    const YHackWrapper = styled.View`
      margin         : 30px 15px;
    `

    const Title = styled.Text`
      text-align     : center;
      font-size   : 40;
      font-weight : bold;
    `

    const EventDate = styled.Text`
      text-align     : center;
      color      : #7D7D7D;
      font-size  : 20px;
      margin-top : 10px;
    `

    const ParticipationCount = styled.Text`
      text-align     : center;
      font-size  : 18;
      margin-top : 15;
      color      : #7D7D7D;
    `

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.navBar}>
          <View style={{ flex: 1}} />
          <Text style={{ flex: 4 , fontSize: 22, color: "white", textAlign: 'center'}}>Events</Text>
          <TouchableOpacity style={{ flex: 1, }} onPress={this.createEvent}>
            <Image source={addIcon} style={{ marginLeft: 10, width: 18, height: 18}}/>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 8.5 }}>
          <ScrollView>
          <YHackWrapper>
            <Title>YHack</Title>
            <EventDate>Dec 1, 2017</EventDate>
            <ParticipationCount>5 Participants</ParticipationCount>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30, marginLeft:30, marginRight:30}}>
              <Image source={user0} style={{ width: 45, height: 45, }}/>
              <Image source={user1} style={{ width: 45, height: 45, }}/>
              <Image source={user3} style={{ width: 45, height: 45, }}/>
              <Image source={user4} style={{ width: 45, height: 45, }}/>
              <Image source={user5} style={{ width: 45, height: 45, }}/>
            </View>
          </YHackWrapper>
          <View style={styles.events}>
              {Object.keys(this.state.events).map(key => {
                    return (
                      <TouchableOpacity key={key} onPress={() => this.onEventPress(key)}>
                        <EventBox event={this.state.events[key]} key={key} />
                      </TouchableOpacity>
                    )
                  })}
          </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = {
   navBar: {
    flexDirection: 'row',
    backgroundColor: "#597bb5",
    paddingTop: 15,
    paddingBottom: 5,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainEvent: {
    flex: 4
  },
  events: {
    flex: 6
  },
  imageStyle: {
    flex: 1 ,
    height: 150,
    marginRight:0,
    marginLeft: 0
  },
  botBar: {
    flexDirection: "row",
    alignItems: 'center',
    borderColor: "#d3d3d3",
    justifyContent: 'space-between',
    borderTopWidth: 1,
    height: 55,
  },
  iconBox : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 25
  },
  iconBox3 : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 25
  }
}

const mapStateToProps = state => {
  return {
    events: state.main.events,
    uid: state.main.uid,
    eventId: state.main.eventId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateEventId: (data) => { dispatch(updateEventId(data)) },
    updateEventTurns: (data) => { dispatch(updateEventTurns(data)) },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen)
