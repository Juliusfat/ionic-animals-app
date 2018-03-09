import { Component } from '@angular/core';
import { NavController, ToastController, Platform, reorderArray, AlertController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Storage } from '@ionic/storage';
import { AnimalsEditPage } from '../animals-edit/animals-edit';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public animals = [];

  public animalsDefault = [
    {
      'article': 'la',
      'title': 'Vache',
      'image': 'img/animals/cow-icon.png',
      'desc': 'Meugle',
      'file': '/sounds/cow.mp3',
      'playing': false
    },
    {
      'article': 'le',
      'title': 'Dauphin',
      'image': 'img/animals/dolphin-icon.png',
      'desc': 'Siffle',
      'file': '/sounds/dolphin.mp3',
      'playing': false
    },
    {
      'article': 'la',
      'title': 'Grenouille',
      'image': 'img/animals/frog-icon.png',
      'desc': 'Coasse',
      'file': '/sounds/frog.mp3',
      'playing': false
    },
    {
      'article': 'l\'',
      'title': 'Oiseau',
      'image': 'img/animals/bird-icon.png',
      'desc': 'Chante',
      'file': '/sounds/bird.mp3',
      'playing': false
    },
    {
      'article': 'le',
      'title': 'Cochon',
      'image': 'img/animals/pig-icon.png',
      'desc': 'Grogne',
      'file': '/sounds/pig.mp3',
      'playing': false
    },
    {
      'article': 'le',
      'title': 'Chien',
      'image': 'img/animals/puppy-icon.png',
      'desc': 'Aboie',
      'file': '/sounds/dog.mp3',
      'playing': false
    },
    {
      'article': 'le',
      'title': 'Chat',
      'image': 'img/animals/black-cat-icon.png',
      'desc': 'Miaule',
      'file': '/sounds/cat.mp3',
      'playing': false
    },
    {
      'article': 'le',
      'title': 'Cheval',
      'image': 'img/animals/horse-icon.png',
      'desc': 'Hennit',
      'file': '/sounds/horse.wav',
      'playing': false
    },
    {
      'article': 'l\'',
      'title': 'Ane',
      'image': 'img/animals/donkey-icon.png',
      'desc': 'Brait',
      'file': '/sounds/donkey.wav',
      'playing': false
    },
    {
      'article': 'l\'',
      'title': 'Elephant',
      'image': 'img/animals/elephant-icon.png',
      'desc': 'Barrit',
      'file': '/sounds/elephant.wav',
      'playing': false
    },
    {
      'article': 'le',
      'title': 'Lion',
      'image': 'img/animals/lion-icon.jpg',
      'desc': 'Rugit',
      'file': '/sounds/lion.mp3',
      'playing': false
    },
    {
      'article': 'le',
      'title': 'singe',
      'image': 'img/animals/monkey-icon.jpg',
      'desc': 'Crie',
      'file': '/sounds/monkey.mp3',
      'playing': false
    },
    {
      'article': 'l',
      'title': 'otarie',
      'image': 'img/animals/otarie-icon.jpg',
      'desc': 'Grogne',
      'file': '/sounds/otarie.mp3',
      'playing': false
    }
  ];
  public showReorder = false;
  private mediaPlayer;

  private animalIndex: number;

  public tri: boolean = false;

  public playing: boolean = false;
  private loaded: boolean = false;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public storage: Storage,
    public tts: TextToSpeech,
    public alertCtrl: AlertController,
    public platform: Platform) {

  }
  //initialisation de l'aplication

  ionViewDidLoad() {
    //Récupération de la list des animaux
    //stockée dans le storage
    this.storage.get("animals").then((data) => {
      //Affectation de la liste des animaux
      this.animals = data || this.animalsDefault;
      this.loaded = true;
    });
  }

  persist() {
    if (this.loaded) {
      this.storage.set("animals", this.animals);
    }
  }

  chooseAnimal(pos) {
    let message;
    if (this.playing) {
      //test le choix du joueur
      if (pos == this.animalIndex) {
        let animal = this.animals[pos];
        message = "Bravo " + animal.article + " " + animal.title.toLocaleLowerCase() + " " + animal.desc;
        //permet de jouer une nouvelle partie
        this.playing = false;
      } else {
        message = "Essaie encore";
      }
      //jouer le son


      if (this.platform.is("cordova")) {
        this.tts.speak({
          text: message,
          locale: 'fr-FR'
        })
          .then(() => {
            console.log("J'ai fini de parler");
          });
      }
      //affichage du toast
      let toast = this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: "middle"
      }).present();

    } else {
      //affichage du toast
      let toast = this.toastCtrl.create({
        message: "Appuies sur le bouton",
        duration: 2000,
        position: "middle"
      }).present();
    }
  }

  playSound() {

    //arret du son en cours de lecture

    if (this.mediaPlayer && this.mediaPlayer.currentTime != this.mediaPlayer.duration) {
      this.mediaPlayer.pause();
    }

    //selection de l'animal que si je ne suis pas en train de jouer
    if (!this.playing) {
      this.animalIndex = Math.floor(Math.random() * this.animals.length);

    }
    let soundFile = this.animals[this.animalIndex].file;
    //lecture du son
    this.mediaPlayer = new Audio("assets" + soundFile);
    this.mediaPlayer.load();
    this.mediaPlayer.play();
    this.playing = true;
  }
  reorderAnimals(ev) {
    //recuperer le nom de l'animal en cours
    let animalName = "";
    if (this.playing) {
      animalName = this.animals[this.animalIndex].title;
    }
    //réagencer les animaux
    this.animals = reorderArray(this.animals, ev);
    this.persist();
    //définir le nouvel indice
    let newIndex = this.animals.findIndex((item) => {
      return item.title == animalName;
    });
    this.animalIndex = newIndex;
  }

  editAnimals(animal) {
    this.navCtrl.push(AnimalsEditPage, { "animal": animal });
  }

  ionViewDidEnter() {
    this.persist();
  }

  deleteAnimals(pos) {
    this.alertCtrl.create(
      {
        title: "confirmation",
        message: "Voulez-vous vraiment supprimer cet animal ?",
        buttons: [
          { text: "Non", role: "cancel" },
          { text: "Oui", handler: () => { this.animals.splice(pos, 1); } }
        ]
      }
    ).present();
  }
}
