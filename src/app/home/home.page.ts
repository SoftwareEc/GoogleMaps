import { Component, OnInit } from '@angular/core';

declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

map : any;
directionsService = new google.maps.DirectionsService();
directionsDisplay = new google.maps.DirectionsRenderer();
origin = { lat: -1.486647, lng: -78.002292};
destination = { lat: -1.478156, lng:  -77.998270};

  markers: Marker[] = [
    {
      position: {
        lat: 4.658383846282959,
        lng: -74.09394073486328,
      },
      title: 'Parque Simón Bolivar'
    },
    {
      position: {
        lat: 4.667945861816406,
        lng: -74.09964752197266,
      },
      title: 'Jardín Botánico'
    },
    {
      position: {
        lat: 4.676802158355713,
        lng: -74.04825592041016,
      },
      title: 'Parque la 93'
    },
    {
      position: {
        lat: 4.6554284,
        lng: -74.1094989,
      },
      title: 'Maloka'
    },
  ];

  constructor() {}

  ngOnInit(){
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.origin,
      zoom: 15
    });

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(indicatorsEle);
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }

  private calculateRoute() {
    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
    }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }
}
