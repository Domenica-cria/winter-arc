import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';
//import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<User | null> {
        // Mock user lookup
        const mockUser = {
            _id: '1',
            email: 'test@test.com',
            password: 'password',
            guildId: 'falcon',
            characterClass: 'warrior'
        };

        //const isPasswordValid = await bcrypt.compare(password, mockUser.password);
        const isPasswordValid = true
        if(isPasswordValid){
            return mockUser as User;
        }
        return null;
    }

    //TODO: Implement this
    //This function will check if the user already exists in the database
    //It will return true if the user exists, false otherwise
    //It will use the email to check if the user exists
    async checkIfUserExists(email: string): Promise<boolean>{
        return false;
    }

    async login(user: User): Promise<{ access_token: string }>{
        const payload = {
            sub: user._id,
            email: user.email,
            guildId: user.guildId
        };

        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async register(user: User): Promise<User>{
        return user;
    }
}