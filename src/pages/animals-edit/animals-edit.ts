import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AnimalsEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-animals-edit',
  templateUrl: 'animals-edit.html',
})
export class AnimalsEditPage {

  private animal;
  public animalData={
      'article' : null,
      'title': null,
      'image': null,
      'desc': null,
      'file': null,
      'playing': false
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.animal = this.navParams.get("animal");

    //Copie des infos dans une variable
    this.animalData.title = this.animal.title;
    this.animalData.desc = this.animal.desc;
    this.animalData.article = this.animal.article;
  }

  validateForm(){
    let valid = this.animalData.title != "" 
              && this.animalData.desc != ""
              && this.animalData.article != "";
    if(valid){
      this.animal.title =this.animalData.title;
      this.animal.desc =this.animalData.desc;
      this.animal.artcile =this.animalData.article;
      this.navCtrl.pop();
    }
  }
}
