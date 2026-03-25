import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { Passport } from "passport";

export class JwtGuard extends AuthGuard('jwt') {
    

}