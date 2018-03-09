import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimalsEditPage } from './animals-edit';

@NgModule({
  declarations: [
    AnimalsEditPage,
  ],
  imports: [
    IonicPageModule.forChild(AnimalsEditPage),
  ],
})
export class AnimalsEditPageModule {}
