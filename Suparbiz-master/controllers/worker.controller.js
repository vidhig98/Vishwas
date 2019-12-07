const Worker = require("../models/worker.model");

module.exports.getAllWorkers = (req, res) => {
    Worker.find({ organization: req.user.organization })
        .then(workers => {
            if (!workers) {
                res.status(400).json({ message: "Workers Not Found!" });
            } else {
                res.status(200).json({
                    message: "Workers Found!",
                    data: workers
                });
            }
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.getWorker = (req, res) => {
    const { workerID } = req.params;
    Worker.findById(workerID)
        .then(worker => {
            if (!worker) {
                res.status(400).json({ message: "Worker Not Found!" });
            } else {
                res.status(200).json({
                    message: "Worker Found!",
                    data: worker
                });
            }
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.postWorker = (req, res) => {
    const { firstname, lastname, phone } = req.body;
    const newWorker = new Worker({
        first_name: firstname,
        last_name: lastname,
        phone: phone
    });
    newWorker
        .save()
        .then(addedWorker => {
            if (!addedWorker) {
                res.status(400).json({ message: "Error Adding Worker!" });
            } else {
                res.status(201).json({
                    message: "Worker Added Successfully!"
                });
            }
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.deleteWorker = (req, res) => {
    const { workerID } = req.params;
    Worker.findByIdAndDelete(workerID)
        .then(worker => {
            if (!worker) {
                res.status(400).json({ message: "Worker Not Found!" });
            } else {
                res.status(200).json({
                    message: "Worker Data Deleted Successfully!"
                });
            }
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};
