import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        if(!request.user) throw new UnauthorizedException('User not authenticated.');

        if(data){
            return request.user[data as string];
        }

        return request.user; // { id: 1, email: 'test@test.com', guildId: '1234567890' }
    }
)
