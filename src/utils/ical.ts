import { CalendarItem } from "../types";

export function JSONtoCal(jsonObject: CalendarItem) {
    let finalString = ''	
  
    Object.keys(jsonObject).forEach((key) => {
        const value = jsonObject[key as keyof CalendarItem]
  
        const string = `${key}: ${value}`
        finalString = finalString += `${string} \n`;
    })
  
    return finalString
}