import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  key = 'your_rzp_key'
  amount = 1000
  businessName = 'your business name'
  orderId = 'your orderId'

  paymentFailedEvent(event: any) {
    console.log("paymentFailedEvent", event)
  }

  paymentSuccessEvent(event: any) {
    console.log("paymentSuccessEvent", event)
  }
}
