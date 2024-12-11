/**
 * If we look at our backend we see that we have an authentication request model so we also
 * need to reflect that for  our front end. Also added question marks to our field to show it as optional
 * so we can add validation later
 */
export interface AuthenticationRequest{
  username?: string;
  password?: string;
}
