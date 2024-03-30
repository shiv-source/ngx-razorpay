import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID, Renderer2, TemplateRef } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { PaymentOptions } from './razorpay.interface'
import { PaymentMethod } from './ngx-razorpay.types'

declare var Razorpay: any

@Component({
  selector: 'ngx-razorpay',
  template: `
    <ng-container *ngIf="payBtnTemplate; else noTemplate">
        <ng-container *ngTemplateOutlet="payBtnTemplate"></ng-container>
    </ng-container>
    <ng-template #noTemplate>
      <button class="razorpayPayBtn" (click)="onPay()" [ngClass]="ngClass" [ngStyle]="ngStyle">{{payBtnText}}</button>
    </ng-template>
  `,
  styles: [
    `
    .razorpayPayBtn {
      width: 200px;
      padding: 10px 20px;
      font-size: 16px;
      background-color: #007bff; /* Blue color, you can change it to your desired color */
      color: #fff; /* White text color */
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3; /* Darker blue color on hover */
      }

      &:focus {
        outline: none; /* Remove default focus outline */
      }
    }
    `
  ],
})
export class NgxRazorpayComponent implements OnInit, OnDestroy {
  @Input({ required: true }) key: string = ''
  @Input({ required: true }) amount: number = 100
  @Input({ required: true }) businessName: string = ''
  @Input({ required: true }) orderId: string = ''
  @Input() currency: string = "INR"
  @Input() description: string | undefined
  @Input() logoUrl: string | undefined

  /** Prefill options */
  @Input() customerName: string = ''
  @Input() customerEmail: string = ''
  @Input() customerMobile: string = ''
  @Input() method: PaymentMethod | undefined
  /** Prefill options end */

  @Input() notes: { [key: string]: any; } | undefined

  /** Theme options */
  @Input() hideTopbar: boolean | undefined
  @Input() themeColor: string = '#3399cc'
  @Input() backdropColor: string | undefined
  /** Theme options end */

  /** Model options */
  @Input() backdropClose: boolean = false
  @Input() escape: boolean = true
  @Input() handleBack: boolean = true
  @Input() confirmClose: boolean = false
  @Input() onDismiss: Function | undefined
  @Input() animation: boolean = true
  /** Model options end */

  @Input() subscriptionId: string | undefined
  @Input() subscriptionCardChange: boolean | undefined
  @Input() recurring: boolean | undefined

  @Input() redirect: boolean = false
  @Input() customerId: string | undefined
  @Input() rememberCustomer: boolean = false
  @Input() timeout: number | undefined

  //** Mark customer details  as readonly */
  @Input() isCustomerNameReadOnly: boolean = false
  @Input() isCustomerEmailReadOnly: boolean = false
  @Input() isCustomerMobileReadOnly: boolean = false
  //** Mark customer details  as readonly end */

  //** Hide customer contact details  */
  @Input() isCustomerEmailHidden: boolean = false
  @Input() isCustomerMobileHidden: boolean = false
  //** Hide customer contact details end */

  @Input() ngClass: string | undefined
  @Input() ngStyle: { [key: string]: string; } | undefined
  @Input() payBtnText: string = 'Pay'
  @Input() payBtnTemplate: TemplateRef<any> | undefined;

  @Output() paymentSuccessEvent = new EventEmitter<any>()
  @Output() paymentFailedEvent = new EventEmitter<any>()


  get options() {
    const opts: PaymentOptions = {
      key: this.key,
      amount: String(this.amount),
      currency: this.currency,
      name: this.businessName,
      description: this.description,
      image: this.logoUrl,
      order_id: this.orderId,
      prefill: {
        contact: this.customerMobile,
        email: this.customerEmail,
        name: this.customerName

      },
      notes: this.notes,
      theme: {
        hide_topbar: this.hideTopbar,
        color: this.themeColor,
        backdrop_color: this.backdropColor
      },
      modal: {
        backdropclose: this.backdropClose,
        escape: this.escape,
        handleback: this.handleBack,
        confirm_close: this.confirmClose,
        ondismiss: this.onDismiss,
        animation: this.animation
      },
      subscription_id: this.subscriptionId,
      subscription_card_change: this.subscriptionCardChange,
      recurring: this.recurring,
      handler: (response: any) => this.paymentSuccessEvent.emit(response),
      redirect: this.redirect,
      customer_id: this.customerId,
      remember_customer: this.rememberCustomer,
      timeout: this.timeout,
      readonly: {
        contact: this.isCustomerMobileReadOnly,
        email: this.isCustomerEmailReadOnly,
        name: this.isCustomerNameReadOnly
      },
      hidden: {
        contact: this.isCustomerMobileHidden,
        email: this.isCustomerEmailHidden
      }
    }
    return opts
  }

  private readonly scriptUrl: string = 'https://checkout.razorpay.com/v1/checkout.js'

  rzp: any;

  constructor(private readonly renderer: Renderer2, @Inject(PLATFORM_ID) private readonly platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && !this.isScriptAlreadyLoaded(this.scriptUrl)) {
      this.loadScript(this.scriptUrl);
    }
  }

  initializeRazorpay() {
    this.rzp = new Razorpay(this.options)
    this.rzp.on('payment.success', (response: any) => this.paymentSuccessEvent.emit(response))
    this.rzp.on('payment.failed', (response: any) => this.paymentFailedEvent.emit(response))
  }

  loadScript(src: string) {
    const script: HTMLScriptElement = this.renderer.createElement('script');
    script.type = 'text/javascript'
    script.src = src
    script.async = true
    script.onload = () => this.initializeRazorpay()
    this.renderer.appendChild(document.body, script)
  }

  isScriptAlreadyLoaded(src: string): boolean {
    const scripts: HTMLCollectionOf<HTMLScriptElement> = document.getElementsByTagName('script');
    const scriptArray: HTMLScriptElement[] = Array.from(scripts);
    const sourceUrls = scriptArray.map((script) => script.src)
    return sourceUrls.includes(src)
  }

  onPay() {
    if (this.rzp) {
      this.rzp.open()
    }
  }

  ngOnDestroy(): void {
    if (this.rzp) {
      this.rzp.destroy()
    }
  }
}
