const Inventory = require("../models/inventory.model");

module.exports.getOrganizationInventorys = (req, res) => {
    const { organizationID } = req.params;
    Inventory.find({ posted_by: organizationID })
        .then(Inventorys => {
            res.status(200).send(Inventorys);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.getInventorys = (req, res) => {
    Inventory.find({ posted_by: req.user.organization })
        .then(Inventorys => {
            res.status(200).send(Inventorys);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.getInventory = (req, res) => {
    const { InventoryID } = req.params;
    Inventory.findOne({
        $and: [{ posted_by: req.user.organization }, { _id: InventoryID }]
    })
        .then(Inventory => {
            res.status(200).send(Inventory);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.postInventory = (req, res) => {
    const {
        item_name,
        party_name,
        UIN,
        width,
        length,
        GSM,
        sq_mtr,
        weight,
        impression
    } = req.body;

    const newInventory = new Inventory({
        item_name: item_name,
        party_name: party_name,
        UIN: UIN,
        width: width,
        length: length,
        GSM: GSM,
        sq_mtr: sq_mtr,
        weight:weight,
        impression: impression,
        posted_by: req.user.organization
    });

    newInventory
        .save()
        .then(InventoryPosted => {
            if (!InventoryPosted) {
                res.status(400).json({ message: "Error Posting Inventory!" });
            } else {
                res.status(201).json({ message: "Inventory Posted Successfully!" });
            }
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.putInventory = (req, res) => {
    const {
        item_name,
        party_name,
        UIN,
        width,
        length,
        GSM,
        sq_mtr,
        weight,
        impression
    } = req.body;
    const { InventoryID } = req.params;
    const InventoryUpdates = {
        item_name: item_name,
        party_name: party_name,
        UIN: UIN,
        width: width,
        length: length,
        GSM: GSM,
        sq_mtr: sq_mtr,
        weight: weight,
        impression: impression,
        posted_by: req.user.organization
    };
    Inventory.findOneAndUpdate({ _id: InventoryID }, InventoryUpdates)
        .then(updatedInventory => {
            res.status(200).json({ message: "Inventory updated successfully!" });
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};
