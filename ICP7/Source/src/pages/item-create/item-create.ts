import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Camera, CameraOptions, PictureSourceType} from '@ionic-native/camera';
import {ActionSheetController, IonicPage, NavController, ViewController} from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;
  isReadyToSave: boolean;
  item: any;
  form: FormGroup;

  picdata:any;
  picurl:any;
  mypicref:any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera,
              private actionSheetCtrl: ActionSheetController) {
    // this.mypicref=firebase.storage().ref('/');

    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: ['']
    });
    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }
  selectPicture() {
    this.actionSheetCtrl.create({
      buttons:[
        {
          text: 'From Camera',
          // handler: () => {
          //     this.camera.getPicture({
          //       destinationType: this.camera.DestinationType.DATA_URL,
          //       targetWidth: 96,
          //       targetHeight: 96
          //     }).then((data) => {
          //       this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
          //       }, (err) => {
          //       alert('Unable to take photo');
          //     })
          // }
          handler: async () => {
            try {
              const options: CameraOptions = {
                quality: 50,
                targetHeight: 600,
                targetWidth: 600,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
              };
              const result = await this.camera.getPicture(options)
              const image = 'data:image/jpeg;base64,${result}';
              const pictures = firebase.storage().ref('pictures');
              pictures.putString(image, 'data_url');
            }
            catch (e) {
              console.error(e);
            }
          }
        },
        {
          text: 'From Gallery',
          handler: () => {

            // const options: CameraOptions = {
            //   quality: 50,
            //   destinationType: this.camera.DestinationType.DATA_URL,
            //   encodingType: this.camera.EncodingType.JPEG,
            //   mediaType: this.camera.MediaType.PICTURE,
            //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
            // };
            // this.camera.getPicture(options).then((imageData)=>{
            //   this.picdata = 'data:image/jpeg;base64,' + imageData;
            // },(err)=>{
            //
            // });
            try {
              const options: CameraOptions = {
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                quality: 100,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
              };
              // const picdata = this.fileInput.nativeElement.click();
              this.camera.getPicture(options).then(imageData => {
                this.picdata = imageData;
              });
              // this.picdata = this.camera.getPicture(options);
              // const image = 'data:image/jpeg;base64,'+ this.picdata;
              this.picurl =firebase.storage().ref('pictures/maxPics1/');
              this.picurl.child(this.uid()).child('myPhoto.png')
                .putString(this.picdata, 'base64', {contentType: 'image/jpg'})
                .then((savePicture)=>{
                  this.mypicref = savePicture.downloadURL;
              });
            }
            catch (e) {
              console.error(e);
            }
            // this.fileInput.nativeElement.click().then(imageData=>{
            //   this.picdata = imageData;
            //   this.upload()
            // })
          }
          // handler: () => {
          //   this.picdata = this.fileInput.nativeElement.click();
          //   // @ts-ignore
          //   this.uploadImage(this.picdata);
          // }
        },
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: () => {
            console.log("The user has selected the cancel button");
          }
        }
      ]
    }).present();
  }
  // private uploadPhoto(): void {
  //   this.mypicref.child(this.uid()).child('myPhoto.jpg')
  //     .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
  //     .then((savedPicture) => {
  //       this.mypicref = savedPicture.downloadURL;
  //     });
  // }
  // takePicture(sourceType: PictureSourceType) {
  //   var options: CameraOptions = {
  //     quality: 100,
  //     sourceType: sourceType,
  //     saveToPhotoAlbum: false,
  //     correctOrientation: true
  //   }
  //
  //   this.camera.getPicture(options).then(imagePath =>{
  //     var currentName = imagePath.substr(imagePath.lastIndexOf('/')+1);
  //     var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/')+1);
  //     // this.copyFildToLocalDir(correctPath, currentName, this.createFileName());
  //   })
  // }
  // upload() {
  //   this.mypicref.child(this.uid()).child('pic.png')
  //     .putString(this.picdata,'base64',{contentType:'image/png'})
  //     .then(savepic => {
  //       this.picurl =  savepic.downloadURL
  //     })
  // }
  private uid(): any {
    var d =new Date().getTime();
    // @ts-ignore
    var uid1 = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uid1;
  }

  getPicture() {
    // if (Camera['uninstalled']()) {
    //   this.camera.getPicture({
    //     destinationType: this.camera.DestinationType.DATA_URL,
    //     targetWidth: 96,
    //     targetHeight: 96
    //   }).then((data) => {
    //     this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
    //   }, (err) => {
    //     alert('Unable to take photo');
    //   })
    // } else {
    //   this.fileInput.nativeElement.click();
    // }
    this.fileInput.nativeElement.click();
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
