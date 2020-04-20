const dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { devId } = req.params;
        const { user } = req.headers;

        try {

            const [loggedDev, targedDev] = await Promise.all([
                dev.findById(user),
                dev.findById(devId)
            ]);

            if (!targedDev) {
                return res.status(404).json({ mensagem: "Dev não existe" });
            } else if (targedDev.likes.includes(loggedDev._id)) {
                const loggedSocket = req.connectedUsers[user];
                const targetSocket = req.connectedUsers[devId];

                if (loggedSocket) {
                    req.io.to(loggedSocket).emit('match', targedDev);
                }

                if (targetSocket) {
                    req.io.to(targetSocket).emit('match', loggedDev);
                }
            }

            loggedDev.likes.push(targedDev._id);

            await loggedDev.save();

            return res.json(loggedDev);

        } catch (e) {
            res.status(500).json({ err: e });
        }
    }
}