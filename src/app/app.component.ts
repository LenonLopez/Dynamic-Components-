import { SquareComponent } from './square/square.component';
import { ComponentRef, Component,AfterContentInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

interface SquareDict {
 [id: number]: ComponentRef<SquareComponent>;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit{
  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;
  title = 'Dynamic Components';
  private squareDict: SquareDict ={};

  private roomJson = '[{"position":{"top":"100px","left":"100px"},"name":"1","id":1001},{"position":{"top":"300px","left":"100px"},"name":"2","id":12002},{"position":{"top":"500px","left":"100px"},"name":"3","id":3003},{"position":{"top":"700px","left":"100px"},"name":"4","id":4004},{"position":{"top":"1000px","left":"300px"},"name":"5","id":5005},{"position":{"top":"700px","left":"300px"},"name":"6","id":6006},{"position":{"top":"100px","left":"300px"},"name":"7","id":7007},{"position":{"top":"300px","left":"300px"},"name":"8","id":8008}]'
  constructor(private resolver: ComponentFactoryResolver){}
  ngAfterContentInit(){
    const squareCompFactory = this.resolver.resolveComponentFactory(SquareComponent);
    
    var devices = JSON.parse(this.roomJson);
    if(devices !== null){
        devices.forEach(device => {
         
        let dynamicSquare = this.entry.createComponent(squareCompFactory);
          dynamicSquare.instance.config = device;
          dynamicSquare.instance.setPosition.subscribe(this.handleSquareEvent);
          this.squareDict[device.id] = dynamicSquare;
          
        });
    }

  }

  handleSquareEvent(event){
    console.log("FROM APP COMPONENT:",event);
  }

  handleDestroy(input){
    let squareId = input.value;
    if(this.squareDict[squareId]){
      this.squareDict[squareId].destroy();
      delete this.squareDict[squareId];
    }
  }

  
}