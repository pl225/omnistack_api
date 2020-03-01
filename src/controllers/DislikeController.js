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
            }

            loggedDev.dislikes.push(targedDev._id);

            await loggedDev.save();

            return res.json(loggedDev);

        } catch (e) {
            res.status(500).json({ err: e });
        }
    }
}