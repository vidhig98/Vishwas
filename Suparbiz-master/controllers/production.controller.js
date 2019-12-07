const Production = require("../models/production.model");

module.exports.getOrganizationProductions = (req, res) => {
    const { organizationID } = req.params;
    Production.find({ posted_by: organizationID })
        .then(Productions => {
            res.status(200).send(Productions);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.getProductions = (req, res) => {
    Production.find({ posted_by: req.user.organization })
        .then(Productions => {
            res.status(200).send(Productions);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.getProduction = (req, res) => {
    const { ProductionID } = req.params;
    Production.findOne({
        $and: [{ posted_by: req.user.organization }, { _id: ProductionID }]
    })
        .then(Production => {
            res.status(200).send(Production);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.postProduction = (req, res) => {
    const {
        machine_no,
        customer,
        UIN,
        width,
        length,
        expected_rolls,
        actual_rolls,
        sq_mtr
    } = req.body;

    const newProduction = new Production({
        machine_no: machine_no,
        customer: customer,
        UIN: UIN,
        width: width,
        length: length,
        expected_rolls: expected_rolls,
        actual_rolls:actual_rolls,
        sq_mtr: sq_mtr,
        posted_by: req.user.organization
    });

    newProduction
        .save()
        .then(ProductionPosted => {
            if (!ProductionPosted) {
                res.status(400).json({ message: "Error Posting Production!" });
            } else {
                res.status(201).json({ message: "Production Posted Successfully!" });
            }
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.putProduction = (req, res) => {
    const {
        machine_no,
        customer,
        UIN,
        width,
        length,
        expected_rolls,
        actual_rolls,
        sq_mtr
    } = req.body;
    const { ProductionID } = req.params;
    const ProductionUpdates = {
        machine_no: machine_no,
        customer: customer,
        UIN: UIN,
        width: width,
        length: length,
        expected_rolls: expected_rolls,
        actual_rolls: actual_rolls,
        sq_mtr: sq_mtr,
        posted_by: req.user.organization
    };
    Production.findOneAndUpdate({ _id: ProductionID }, ProductionUpdates)
        .then(updatedProduction => {
            res.status(200).json({ message: "Production updated successfully!" });
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};
