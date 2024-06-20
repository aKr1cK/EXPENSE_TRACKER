const bankSchema = require("../models/bankModel");

exports.addBank = async (req, resp) => {
    try {
        console.log('=========IN ADD BANK=========');
        const { name, balance } = req.body;
        const bank = bankSchema({
            name,
            balance
        });
        await bank.save();

        resp.status(200).json({ message: "Bank saved successfully." });

    } catch (e) {
        console.log('=========IN ADD BANK ERROR=========', e);
        return resp.status(500).json({ message: e.message });
    }
}

exports.getBanks = async (req, resp) => {
    try {
        console.log('=========IN GET BANKS =========');
        const banks = await bankSchema.find().sort({ creatdAt: -1 });
        resp.status(200).json(banks);
    } catch (e) {
        console.log('=========IN GET BANKS ERROR=========', e);
        return resp.status(500).json({ message: e.message });
    }
};

exports.deleteBank = async (req, resp) => {
    try {
        console.log('=========IN BANK DELETE  =========');
        const { _id } = req.body;
        bankSchema.findByIdAndDelete(_id)
            .then(() => {
                resp.status(200).json({ message: 'Record Deleted successfully !!' })
            })
            .catch(() => {
                resp.status(500).json({ message: 'Server Error' })
            })
    } catch (e) {
        console.log('=========IN FAMILY MEMBER DELETE ERROR=========', e);
        return resp.status(500).json({ message: e.message });
    }
};