import { Role } from './../enum/role';
export default interface User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  role: Role;
}
