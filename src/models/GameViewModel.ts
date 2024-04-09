import { Result, ValidationError } from "express-validator"

export type GameViewModel = {
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
   year: number
   /**
* Developer ID
*/
   developer: string

}