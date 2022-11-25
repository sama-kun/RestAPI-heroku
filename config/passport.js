const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
require('dotenv').config()

const key = process.env.KEY
const Users = mongoose.model('users')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key

module.exports = passport => {
    passport.use(new JwtStrategy(opts,(payload,done)=>{
        Users.findOne({email: payload.email})
            .then(user=>{
                if(user)
                    return done(null,user)
                else
                    return done(null,false)
            })
            .catch(err => console.log(err))
    }))
}