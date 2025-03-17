import {Injectable, ExecutionContext, UnauthorizedException} from "@nestjs/common";
import { JwtStrategy } from "../strategies/jwt.strategy";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtGuard extends AuthGuard('jwt'){
    constructor(private readonly jwtStrategy: JwtStrategy){
        super();
    }

    canActivate(context: ExecutionContext){
        return super.canActivate(context);
    }

    handleRequest(err, user, info){
        if(err) throw err;
        if(!user) throw new UnauthorizedException('Authentication failed');
        return user;
    }
}