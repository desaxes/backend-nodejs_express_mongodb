import { Result, ValidationError } from "express-validator"

export type GameViewModel = {
   /**
    * Game id
    */
   id: number
   /**
    * Game title
    */
   title: string,
   /**
* Game genre
*/
   genre: string,
   /**
* Game year
*/
   year: string

}