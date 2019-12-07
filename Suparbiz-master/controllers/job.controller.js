const Job = require("../models/job.model");

module.exports.getOrganizationJobs = (req, res) => {
    const { organizationID } = req.params;
    Job.find({ posted_by: organizationID })
        .then(jobs => {
            res.status(200).send(jobs);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.getJobs = (req, res) => {
    Job.find({ posted_by: req.user.organization })
        .then(jobs => {
            res.status(200).send(jobs);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.getJob = (req, res) => {
    const { jobID } = req.params;
    Job.findOne({
        $and: [{ posted_by: req.user.organization }, { _id: jobID }]
    })
        .then(job => {
            res.status(200).send(job);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.postJob = (req, res) => {
    const {
        profile,
        department,
        salary,
        qualification,
        experience,
        openings
    } = req.body;

    const newJob = new Job({
        profile: profile,
        department: department,
        salary: salary,
        qualification: qualification,
        experience: experience,
        openings: openings,
        posted_by: req.user.organization
    });

    newJob
        .save()
        .then(jobPosted => {
            if (!jobPosted) {
                res.status(400).json({ message: "Error Posting Job!" });
            } else {
                res.status(201).json({ message: "Job Posted Successfully!" });
            }
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.putJob = (req, res) => {
    const {
        profile,
        department,
        salary,
        qualification,
        experience,
        openings
    } = req.body;
    const { jobID } = req.params;
    const jobUpdates = {
        profile: profile,
        department: department,
        salary: salary,
        qualification: qualification,
        experience: experience,
        openings: openings,
        posted_by: req.user.organization
    };
    Job.findOneAndUpdate({ _id: jobID }, jobUpdates)
        .then(updatedJob => {
            res.status(200).json({ message: "Job updated successfully!" });
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};
