import { PaymentMethod } from "./ngx-razorpay.types"

export interface Prefill {
    name?: string
    email?: string
    contact?: string
    method?: PaymentMethod
}

export interface CheckoutTheme {
    hide_topbar?: boolean
    color?: string
    backdrop_color?: string
}

export interface CheckoutModal {
    backdropclose?: boolean
    escape?: boolean
    handleback?: boolean
    confirm_close?: boolean
    ondismiss?: Function
    animation?: boolean
}

export interface ReadonlyCustomerField {
    contact?: boolean
    email?: boolean
    name?: boolean
}

export interface HiddenCustomerField{
    contact?: boolean
    email?: boolean
}

export interface PaymentOptions {
    key: string;
    amount: string;
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id: string;
    prefill: Prefill
    notes?: { [key: string]: any }
    theme: CheckoutTheme
    modal: CheckoutModal
    subscription_id?:string
    subscription_card_change?: boolean
    recurring?: boolean
    callback_url?: string
    redirect?: boolean
    customer_id?: string
    remember_customer?: boolean
    timeout?: number
    readonly: ReadonlyCustomerField
    hidden: HiddenCustomerField
    handler?: Function
}

