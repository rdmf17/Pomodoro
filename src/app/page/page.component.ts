import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  videoSrc = '../../assets/videos/video.mp4';

  playlistOptions: Array<any> = [
    {
      img: 'https://i.scdn.co/image/ab67616d00001e026627f8a4e961a92a2fe0d461',
      link: 'https://open.spotify.com/embed/album/3SpBlxme9WbeQdI9kx7KAV',
      name: 'CLB',
    },
    {
      img: 'https://i.scdn.co/image/ab67706c0000bebbf3ce22478a6d95fd0bc91b21',
      link: 'https://open.spotify.com/embed/playlist/0oG1dwW9dKadKbtMeKIvbY',
      name: 'September',
    },
    {
      img: 'https://i.scdn.co/image/ab67706c0000bebbf3ce22478a6d95fd0bc91b21',
      link: 'https://open.spotify.com/embed/playlist/3fzzZGEYUejEJMShdtsKd3',
      name: 'Cold',
    },
    {
      img: 'https://i.scdn.co/image/ab67706c0000bebbf3ce22478a6d95fd0bc91b21',
      link: 'https://open.spotify.com/embed/playlist/3fzzZGEYUejEJMShdtsKd3',
      name: 'Cold',
    },
  ];


  modes = [
    { mode: '0', minutes: 25 },
    { mode: '1', minutes: 5 },
    { mode: '2', minutes: 25 },
    { mode: '3', minutes: 15 },
  ];

  selectedMode = this.modes[0];

  selectedPlaylist: any = this.playlistOptions[0];
  selectedUrl: any = '';

  isPomoActive: boolean = false;

  minutes: number = 0;
  seconds: number = 0;
  counter: any;
  selectedIndexMode: number = 0;

  input : FormGroup = new FormGroup({
    value : new FormControl(null)
  });

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.selectPlaylist(0);
    this.selectedPlaylist = this.playlistOptions[0];

    this.initializeCounter(0);
  }

  initializeCounter(mode: any) {
    this.selectedMode = this.modes[mode];
    this.minutes = this.selectedMode.minutes;
    this.seconds = 0;
    this.selectedIndexMode = mode;
  }

  startCounter() {
    if (!this.isPomoActive) {
      this.isPomoActive = true;
      this.counter = setInterval(() => {
        if (this.seconds === 0 && this.minutes === 0) {
          if(this.selectedIndexMode ===3){
            this.initializeCounter(0);
          }else{
            this.initializeCounter(this.selectedIndexMode + 1);
          }
        } else if (this.seconds === 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          this.seconds--;
        }
      }, 1000);
    }
  }

  resetPomo() {
    if (!this.isPomoActive) {
      this.initializeCounter(0);
    }
  }

  pauseCounter() {
    if (this.isPomoActive) {
      this.isPomoActive = false;
      clearInterval(this.counter);
    }
  }

  selectPlaylist(index: number) {
    this.selectedPlaylist = this.playlistOptions[index];
    this.selectedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.selectedPlaylist.link
    );
  }
  addPlaylist(){

    this.playlistOptions.push({
      img: ' https://image.shutterstock.com/image-vector/music-note-icon-logo-element-260nw-1450263695.jpg',
      link: this.input.value.value,
      name: 'Cold',
    })
  }
}
