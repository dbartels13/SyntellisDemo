import { Geo } from "./Geo";

export interface UserAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}
  