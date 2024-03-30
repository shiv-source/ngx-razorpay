# ngx-razorpay

![NPM Version](https://img.shields.io/npm/v/ngx-razorpay.svg?style=flat)
![NPM Downloads](https://img.shields.io/npm/dm/ngx-razorpay.svg)
![GitHub release](https://img.shields.io/github/release/shiv-source/ngx-razorpay)
![License](https://img.shields.io/github/license/shiv-source/ngx-razorpay)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/shiv-source/ngx-razorpay)](https://github.com/shiv-source/ngx-razorpay/pulls)

Angular library for integrating the Razorpay payment gateway, compatible with both Single Page Applications (SPA) and Server-Side Rendering (SSR).

## Installation

You can install ngx-razorpay via npm:

```bash
npm install ngx-razorpay
```

You can install ngx-razorpay via yarn:

```bash
yarn add ngx-razorpay
```


You can install ngx-razorpay via pnpm:

```bash
pnpm add ngx-razorpay
```

## Usage

### Import the Module

Import the `NgxRazorpayModule` into your Angular module:

```typescript
import { NgxRazorpayModule } from 'ngx-razorpay';

@NgModule({
  imports: [
    NgxRazorpayModule
  ]
})
export class AppModule { }
```

### Use in the Component

Use the `ngx-razorpay` component in your Angular templates:

```html
<ngx-razorpay
  [key]="yourRazorpayKey" 
  [amount]="paymentAmount" 
  [businessName]="businessName" 
  [orderId]="orderId"
>
</ngx-razorpay>

```

## Inputs

| Input                      | Type                      | Description                                             |
|----------------------------|---------------------------|---------------------------------------------------------|
| key                        | string (required)         | Razorpay API key                                        |
| amount                     | number (required)         | Amount to be paid in paisa (e.g., 100 for ₹1)           |
| businessName               | string (required)         | Name of the business                                    |
| orderId                    | string (required)         | Order ID or reference                                   |
| currency                   | string                    | Currency code (default: "INR")                          |
| description                | string                    | Description of the payment                              |
| logoUrl                    | string                    | URL of the business logo                                |
| customerName               | string                    | Name of the customer                                    |
| customerEmail              | string                    | Email of the customer                                   |
| customerMobile             | string                    | Mobile number of the customer                           |
| method                     | PaymentMethod             | Payment method (e.g., 'card', 'netbanking', 'wallet'...)|
| notes                      | { [key: string]: any }    | Additional notes or metadata                            |
| hideTopbar                 | boolean                   | Hide the top bar                                        |
| themeColor                 | string                    | Color theme for the checkout form                       |
| backdropColor              | string                    | Background color of the overlay                         |
| backdropClose              | boolean                   | Close on backdrop click                                 |
| escape                     | boolean                   | Close on escape key press                               |
| handleBack                 | boolean                   | Handle back button press                                |
| confirmClose               | boolean                   | Confirm before close                                    |
| onDismiss                  | Function                  | Callback function on dismiss                            |
| animation                  | boolean                   | Enable animation                                        |
| subscriptionId             | string                    | ID of the subscription                                  |
| subscriptionCardChange     | boolean                   | Allow card change for subscription                      |
| recurring                  | boolean                   | Enable recurring payments                               |
| redirect                   | boolean                   | Redirect after payment                                  |
| customerId                 | string                    | ID of the customer                                      |
| rememberCustomer           | boolean                   | Remember customer details                               |
| timeout                    | number                    | Timeout for payment (in milliseconds)                   |
| isCustomerNameReadOnly     | boolean                   | Make customer name field readonly                       |
| isCustomerEmailReadOnly    | boolean                   | Make customer email field readonly                      |
| isCustomerMobileReadOnly   | boolean                   | Make customer mobile field readonly                     |
| isCustomerEmailHidden      | boolean                   | Hide customer email field                               |
| isCustomerMobileHidden     | boolean                   | Hide customer mobile field                              |
| ngClass                    | string                    | Custom CSS classes                                      |
| ngStyle                    | { [key: string]: string } | Custom inline styles                                    |
| payBtnText                 | string                    | Text for the pay button                                 |
| payBtnTemplate             | `TemplateRef<any>`        | Template for the pay button                             |

## Outputs

| Output                    | Description                                   |
|---------------------------|-----------------------------------------------|
| paymentSuccessEvent       | Event emitted on successful payment           |
| paymentFailedEvent        | Event emitted on failed payment               |

## Methods

| Method                 | Description                                       |
|------------------------|---------------------------------------------------|
| onPay                  | Method to handle the payment event.               |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
