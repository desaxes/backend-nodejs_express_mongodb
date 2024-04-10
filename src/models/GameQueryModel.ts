export type GameQueryModel = {
   /**
    * @query Game title
    */
   title?: string,
   /**
* @query Game genre
*/
   genre?: string,
   /**
* @query Game year
*/
   year?: string,
   /**
    * @query developerId
*/
   devId?: number,
   /**
* @query elem limit
*/
   limit?: string,
   /**
* @query page
*/
   page?: string
}