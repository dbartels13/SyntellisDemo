import { Post } from "../../posts/models/Post";
import { Todo } from "../../todos/models/Todo";
import { UserAddress } from "./UserAddress";
import { UserCompany } from "./UserCompany";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: UserAddress;
    phone: string;
    website: string;
    company: UserCompany;

    showDetails: boolean;
    posts: Post[];
    todos: Todo[];
}
  