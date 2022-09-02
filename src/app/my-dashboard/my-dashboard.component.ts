import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DogsService } from '../dogs.service';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss']
})
export class MyDashboardComponent {
  
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Card 1', cols: 1, rows: 1 },
  //         { title: 'Card 2', cols: 1, rows: 1 },
  //         { title: 'Card 3', cols: 1, rows: 1 },
  //         { title: 'Card 4', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Card 1', cols: 2, rows: 1 },
  //       { title: 'Card 2', cols: 1, rows: 1 },
  //       { title: 'Card 3', cols: 1, rows: 2 },
  //       { title: 'Card 4', cols: 1, rows: 1 }
  //     ];
  //   })
  // );
  public cards: any = [];
  public allBreeds: Array<any> = [];
  public breedList: Array<any> = [];
  constructor(private breakpointObserver: BreakpointObserver,public  dogsService:DogsService) {}

  ngOnInit(){
    this.getRandomPics();
  }
  getAllBreeds(){
    this.dogsService.getAllBreeds().subscribe(
      data =>
      {
        var str=JSON.stringify(data.message);
        var parsed=JSON.parse(str);
        this.allBreeds=Object.keys(parsed);
      }
    )
  }
getRandomPics() {
    this.cards= [];
    this.getAllBreeds();
    
  this.dogsService.getRandomPics().subscribe(
    (    data: any) => {
      const randomPics = data.message;
      console.log(data.message);
      for (var i = 1; i < randomPics.length; i++) {

        for (let picture of randomPics) {
          var subString =picture.split( '/' );
          var name = subString[4];
          this.cards.push({

            id: i++,

            pic: picture,

            breed: name

          });

        }

      }
    },
    (    error: any) =>{
      console.log("error");
      
    }
  );
  console.log("sddfv",this.breedList)
  this.breedList=this.allBreeds;
  }
}
