import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret' // TODO: change this to env variable
        })
    }

    async validate(payload: any){
        const user = await this.userService.findByEmail(payload.email);
        if(!user) throw new UnauthorizedException();
        
        return {
            userId: payload.sub,
            email: user.email,
            guildId: user.guildId
        }
    }
}