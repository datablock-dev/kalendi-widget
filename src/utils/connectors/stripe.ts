import { loadStripe } from "@stripe/stripe-js"

class KalendiStripe {
    
    PUBLISHABLE_KEY?: string
    backendRoute?: string

    constructor(publishable_key: string, backendRoute: string){
        this.PUBLISHABLE_KEY = publishable_key
        this.backendRoute = backendRoute

        if(!this.PUBLISHABLE_KEY){
            throw TypeError("Publishable key not provided!")
        }

    }

    async loadStripe(){
        if(!this.PUBLISHABLE_KEY){
            throw TypeError("Publishable key not provided!")
        } 

        return loadStripe(this.PUBLISHABLE_KEY)
    }

    async getClientSecret(){
        if(!this.backendRoute) return new Error("Backend Route not defined")

        try {
            const res = await fetch(this.backendRoute, { method: 'POST' })
            const data = await res.json()
        } catch (error) {
            console.error(error)
        }
    }
}

export default KalendiStripe