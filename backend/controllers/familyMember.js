const familyMemberSchema = require("../models/familyMemberModel");

exports.addFamilyMember = async (req, resp) => {
    try {
        console.log('=========IN ADD FAMILY MEMBERS=========');
        const { firstName, middleName, lastName } = req.body;
        const familyMember = familyMemberSchema({
            firstName,
            middleName,
            lastName
        });
        await familyMember.save();

        resp.status(200).json({ message: "FamilyMember saved successfully." });

    } catch (e) {
        console.log('=========IN ADD FAMILY MEMBERS ERROR=========', e);
        return resp.status(500).json({ message: e.message });
    }
}

exports.getFamilyMembers = async (req, resp) => {
    try {
        console.log('=========IN GET FAMILY MEMBERS =========');
        const familyMembers = await familyMemberSchema.find().sort({ creatdAt: -1 });
        resp.status(200).json(familyMembers);
    } catch (e) {
        console.log('=========IN GET FAMILY MEMBERS ERROR=========', e);
        return resp.status(500).json({ message: e.message });
    }
};

exports.deleteFamilyMember = async (req, resp) => {
    try {
        console.log('=========IN FAMILY MEMBER DELETE  =========');
        const { _id } = req.body;
        familyMemberSchema.findByIdAndDelete(_id)
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