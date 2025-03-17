import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';
import { UserService } from "src/users/users.service";
import { compare, hash } from 'bcrypt';

type RegisterDTO = {
    email: string;
    password: string;
    name: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async register(registerDTO: RegisterDTO){
        const { email, password, name} = registerDTO;
    
        const hashPassword = await hash(password, 10);
        
        const existingUser = await this.checkIfUserExists(email);
        if(existingUser.userExists){
            throw new ConflictException('User already exists');
        }
        const newUser = await this.userService.create({
            email,
            password: hashPassword,
            name
        });
        console.log({email, password, hashPassword, existingUser, newUser});
        return newUser
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.checkIfUserExists(email);
        console.log({user})
        if (!user.userExists) {
            return null;
        }
        const isPasswordValid = await compare(password, user.user.password);
        
        if(isPasswordValid){
            return user.user as User;
        }
        return null;
    }

    //TODO: Implement this
    //This function will check if the user already exists in the database
    //It will return true if the user exists, false otherwise
    //It will use the email to check if the user exists
    async checkIfUserExists(email: string): Promise<any>{
        const user = await this.userService.findByEmail(email);
        console.log({user})
        if(user){
            return {
                user, userExists: true
            }
        }
        return {user, userExists: false};
    }

    async login(user: User): Promise<{ access_token: string }>{
        // Get the MongoDB document _id
        const userDocument = user as any;
        const userId = userDocument._id ? userDocument._id.toString() : '';
        
        const payload = {
            sub: userId,
            email: user.email,
            guildId: user.guildId
        };

        return {
            access_token: this.jwtService.sign(payload)
        };
    }

}