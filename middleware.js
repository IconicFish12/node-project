import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "./Models/User";

const option = {};
option.jwtFromStrategy = ExtractJwt.fromAuthHeaderAsBearerToken();
option.secretKey = "secret";

passport.use(new JwtStrategy(option, async (jwr_payload, done) => {
    
}));
