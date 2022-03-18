import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import Colors from '../constants/Colors'
import HomeNavButton from '../components/HomeNavButton'
import {useGlobal} from 'reactn';
import moment from 'moment';

import ModalWhatsOnNow from '../components/modals/modalWhatsOnNow';
import ModalNews from '../components/modals/modalNews';
import ModalGigSchedule from '../components/modals/modalGigSchedule';
import ModalArtists from '../components/modals/modalArtists';
import ModalVenuesMap from '../components/modals/modalVenuesMap';
import ModalVenues from '../components/modals/modalVenues';
import { decode, extractImage } from '../components/Utilities'

const buttonList = [
  {
    id: 0,
    navText: "What's On Now",
    icon: "play",
  },
  {
    id: 1,
    navText: "What's On Next",
    icon: "play-skip-forward",
  },
  {
    id: 2,
    navText: "News",
    icon: "newspaper-outline",
  },
  {
    id: 3,
    navText: "Gig Schedule",
    icon: "calendar-sharp",
  },
  {
    id: 4,
    navText: "Artists",
    icon: "musical-notes",
  },
  {
    id: 5,
    navText: "Gigs by Artist",
    icon: "guitar",
  },
  {
    id: 6,
    navText: "Venues Map",
    icon: "map-marker-alt",
  },
  {
    id: 7,
    navText: "Gigs by Venue",
    icon: "beer-outline",
  }
]
const numButtonRows = Math.ceil(buttonList.length/2);

export default function HomeScreen() {
  const [eventsData, setEventsData] = useGlobal('EVENTS');
  const [newsData, setNewsData] = useGlobal('NEWS');
  const [eventsList, setEventsList] = React.useState([]);
  const [eventsModalIsVisible, setEventsModalIsVisible] = React.useState(false);
  const [newsModalIsVisible, setNewsModalIsVisible] = React.useState(false);
  const [gigScheduleModalIsVisible, setGigScheduleModalIsVisible] = React.useState(false);
  const [artistsModalIsVisible, setArtistsModalIsVisible] = React.useState(false);
  const [venuesMapModalIsVisible, setVenuesMapModalIsVisible] = React.useState(false);
  const [venuesListModalIsVisible, setVenuesListModalIsVisible] = React.useState(false);

  const [ artistsInfo, setArtistsInfo ] = React.useState({});
  const [ gigsByArtistFlag, setGigsByArtistFlag ] = React.useState(false);
  const [ ArtistsDisplayList, setArtistsDisplayList ] = React.useState([]);

  const [ venuesDisplayList, setVenuesDisplayList ] = React.useState([]);
  const [ venuesGigLists, setVenuesGigLists ] = React.useState({});

  const NoEvents = [
    {
      Title: "No events available",
      Thumbnail: require('../assets/images/DBJAB_logo_100x100.png')
    }
  ]

  const filterByArtist = (uniqueArtistsList, uniqueArtistsDisplayList, uniqueArtistsDetail) => {
    eventsData.forEach((event) => {
      const decodedArtistName = decode(event.Title);
      const extractedArtistName = 
        decodedArtistName.includes(":") ? 
          decodedArtistName.split(':')[1].trim() : decodedArtistName;
      if(uniqueArtistsList.includes(extractedArtistName)) {
        uniqueArtistsDetail[extractedArtistName].artistGigs.push(event);
      } else {
        uniqueArtistsList.push(extractedArtistName);
        uniqueArtistsDisplayList.push({
          artistName: extractedArtistName,
          artistImage: extractImage(event.Thumbnail),
          artistInfo: event.Detail
        });
        uniqueArtistsDetail[extractedArtistName] = {
          artistImage: event.Thumbnail,
          artistInfo: event.Detail,
          artistGigs: [event]
        };
      }
    })
    if(uniqueArtistsDisplayList.length)
      uniqueArtistsDisplayList.sort((a,b) => { return a.artistName > b.artistName});
    else
      uniqueArtistsDisplayList[{
        artistName: "No artists have yet been announced",
        artistInfo: ""
      }];
  }

  const filterByVenue = (uniqueVenuesList, uniqueVenuesDisplayList, uniqueVenuesGigsList) => {
    eventsData.forEach((event) => {
      if(uniqueVenuesList.includes(event.Venue)) {
        uniqueVenuesGigsList[event.Venue].push(event);
      } else {
        uniqueVenuesList.push(event.Venue);
        uniqueVenuesDisplayList.push({
          venueName: event.Venue,
          venueAddr: event.VenueDetails.address,
          venueLat: parseFloat(event.VenueDetails.latitude),
          venueLong: parseFloat(event.VenueDetails.longitude)
        });
        uniqueVenuesGigsList[event.Venue] = [ event ];
      }
    })
  }

  const pressed = (key, text) => {

    switch(text) {
      case "What's On Now":
        var filterList = eventsData.filter(event => {
//          return moment().isBetween(moment(event.startTime, 'X'), moment(event.endtime, 'X'));
            return true;
        })
        if(filterList.length == 0) filterList = NoEvents;
        setEventsList(filterList);
        setEventsModalIsVisible(true);
        break;

      case "What's On Next":
        var filterList = eventsData.filter(event => {
          return moment().isBefore(moment(event.startTime, 'X'));
        })
        if(filterList.length == 0) filterList = NoEvents;
        filterList=filterList.filter((item, idx) => {return idx<5})
        setEventsList(filterList);
        setEventsModalIsVisible(true);
        break;

      case "News":
        if(!newsData.length) {
          setNewsData([
            { content: {
                      rendered: "No News posted for this year......yet!"
                    }
              }]);
        }
        setNewsModalIsVisible(true);
        break;
  
      case "Gig Schedule":
        setGigScheduleModalIsVisible(true);
        break;

      case "Artists":
          setGigsByArtistFlag(false);
          const uniqueArtistsList = [];
          const uniqueArtistsDisplayList = [];
          const uniqueArtistsDetail = {};
          filterByArtist(uniqueArtistsList, uniqueArtistsDisplayList, uniqueArtistsDetail);
          setArtistsDisplayList(uniqueArtistsDisplayList);
          setArtistsInfo(uniqueArtistsDetail);
          setArtistsModalIsVisible(true);
          break;      
      
      case "Gigs by Artist":
        setGigsByArtistFlag(true)
        const uniqueArtistsByGigsList = [];
        const uniqueArtistsByGigsDisplayList = [];
        const uniqueArtistsByGigsDetail = {};
        filterByArtist(uniqueArtistsByGigsList, uniqueArtistsByGigsDisplayList, uniqueArtistsByGigsDetail);
        setArtistsDisplayList(uniqueArtistsByGigsDisplayList);
        setArtistsInfo(uniqueArtistsByGigsDetail);
        setArtistsModalIsVisible(true);
        break;

      case "Venues Map":
        const uniqueVenuesMapList = [];
        const uniqueVenuesMapDisplayList = [];    
        const uniqueVenuesMapGigsList = {};    
        filterByVenue(uniqueVenuesMapList, uniqueVenuesMapDisplayList, uniqueVenuesMapGigsList)
        setVenuesDisplayList(uniqueVenuesMapDisplayList);
        setVenuesMapModalIsVisible(true);
        break;

      case "Gigs by Venue":
        const uniqueVenuesList = [];
        const uniqueVenuesDisplayList = [];        
        const uniqueVenuesGigsList = {};    
        filterByVenue(uniqueVenuesList, uniqueVenuesDisplayList, uniqueVenuesGigsList)
        setVenuesDisplayList(uniqueVenuesDisplayList);
        setVenuesGigLists(uniqueVenuesGigsList);
        setVenuesListModalIsVisible(true);
        break;

      default:
        alert("Pressed " + text);
        break;
    }
  }
  
  const toggleEventsModal = () => {
    setEventsModalIsVisible(!eventsModalIsVisible);
  };
  
  const toggleNewsModal = () => {
    setNewsModalIsVisible(!newsModalIsVisible);
  };
  
  const toggleGigScheduleModal = () => {
    setGigScheduleModalIsVisible(!gigScheduleModalIsVisible);
  };

  const toggleArtistsModal = () => {
    setArtistsModalIsVisible(!artistsModalIsVisible);
  };

  const toggleVenuesMapModal = () => {
    setVenuesMapModalIsVisible(!venuesMapModalIsVisible);
  };

  const toggleVenuesListModal = () => {
    setVenuesListModalIsVisible(!venuesListModalIsVisible);
  };
  
  const navButtonArray = buttonList.map(button => {
    return <HomeNavButton 
      key={button.id} 
      id={button.id} 
      text={button.navText} 
      icon={button.icon}
      pressed={pressed}
      numRows={numButtonRows}
    />
  })

  return (
    <ScrollView style={styles.container}>
      <ModalWhatsOnNow 
        isVisible={eventsModalIsVisible} 
        eventsList={eventsList}
        toggleEventsModal={toggleEventsModal}
      />
      <ModalNews 
        isVisible={newsModalIsVisible} 
        newsData={newsData}
        toggleNewsModal={toggleNewsModal}
      />
      <ModalGigSchedule 
        isVisible={gigScheduleModalIsVisible} 
        allEvents={eventsData}
        toggleGigScheduleModal={toggleGigScheduleModal}
      />
      <ModalArtists 
        isVisible={artistsModalIsVisible} 
        artistsDisplayList={ArtistsDisplayList}
        artistsInfo={artistsInfo}
        toggleArtistsModal={toggleArtistsModal}
        gigsByArtistFlag={gigsByArtistFlag}
      />
      <ModalVenuesMap 
        isVisible={venuesMapModalIsVisible} 
        venuesList={venuesDisplayList}
        toggleVenuesMapModal={toggleVenuesMapModal}
      />
      <ModalVenues 
        isVisible={venuesListModalIsVisible} 
        venuesList={venuesDisplayList}
        venuesGigsLists={venuesGigLists}
        toggleVenuesListModal={toggleVenuesListModal}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.homePageButtonsContainer}>
        {navButtonArray}
      </ScrollView>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backGroundPrimary,
    height: '80%'
  },
  homePageButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 10,
  }
});
