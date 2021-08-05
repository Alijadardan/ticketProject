import { UpdateTickets } from './store/actions/ticket.actions';
import { Store } from '@ngrx/store';
import { OnInit, Component } from '@angular/core';
import { Observable, fromEvent} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ticketProject';

  source$!: Observable<Event>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.source$ = fromEvent(window, 'storage');
    this.source$.subscribe(
      () => {
        let action = localStorage.getItem('STATE');
        if(action){
          this.store.dispatch(new UpdateTickets(JSON.parse(action)));
        } else {
          console.log("Nothing added yet");
        }
      }
    );
  }
}
