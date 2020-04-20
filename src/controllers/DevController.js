const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {
        
        try {
            const { user } = req.headers;

            const loggedUser = await Dev.findById(user);

            const users = await Dev.find({
                $and: [
                    {
                        _id: {
                            $ne: loggedUser._id
                        }
                    },
                    {
                        _id: {
                            $nin: loggedUser.likes
                        }
                    },
                    {
                        _id: {
                            $nin: loggedUser.dislikes
                        }
                    }
                ]
            });

            res.json(users);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    async store(req, res) {

        try {
            const { username } = req.body;

            const user = await Dev.findOne({ user: username });

            if (user) {
                return res.json(user);
            }

            const response = await axios.get(`https://api.github.com/users/${username}`);

            const { name, bio, avatar_url } = response.data; 

            const dev = await Dev.create({
                name,
                user: username,
                bio,
                avatar: avatar_url
            });

            return res.json(dev);

        } catch (e) {
            return res.status(500).json(e);
        }
    }
}