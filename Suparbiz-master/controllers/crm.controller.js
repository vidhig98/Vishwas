const Lead = require("../models/lead.model");
const Customer = require("../models/customer.model");
const LeadComment = require("../models/leadComment.model");
const CustomerComment = require("../models/customerComment.model");
const mongoose = require("mongoose");

module.exports.getLeads = (req, res) => {
    Lead.find({ organization: req.user.organization })
        .then(leads => {
            res.status(200).json(leads);
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};

module.exports.getLead = (req, res) => {
    const { leadID } = req.params;
    Lead.aggregate([
        {
            $match: {
                $and: [
                    { _id: mongoose.Types.ObjectId(leadID) },
                    {
                        organization: mongoose.Types.ObjectId(
                            req.user.organization
                        )
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "leadcomments",
                localField: "comments",
                foreignField: "_id",
                as: "comments"
            }
        },
        {
            $unwind: {
                path: "$comments",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "comments.posted_by",
                foreignField: "_id",
                as: "comments.posted_by"
            }
        },
        {
            $project: {
                company_name: 1,
                contact_person: 1,
                phone: 1,
                email: 1,
                website: 1,
                source: 1,
                order: 1,
                added_by: 1,
                organization: 1,
                createdAt: 1,
                updatedAt: 1,
                comments: {
                    _id: 1,
                    text: 1,
                    posted_by: { $arrayElemAt: ["$comments.posted_by", 0] },
                    posted_to: 1,
                    organization: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    company_name: "$company_name",
                    contact_person: "$contact_person",
                    phone: "$phone",
                    email: "$email",
                    website: "$website",
                    source: "$source",
                    order: "$order",
                    added_by: "$added_by",
                    organization: "$organization",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt"
                },
                comments: {
                    $push: "$comments"
                }
            }
        },
        {
            $limit: 1
        }
    ])
        .then(lead => {
            res.status(200).json(lead);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.getCustomers = (req, res) => {
    Customer.find({ organization: req.user.organization })
        .then(customers => {
            res.status(200).json(customers);
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};

module.exports.getCustomer = (req, res) => {
    const { customerID } = req.params;
    Customer.aggregate([
        {
            $match: {
                $and: [
                    { _id: mongoose.Types.ObjectId(customerID) },
                    {
                        organization: mongoose.Types.ObjectId(
                            req.user.organization
                        )
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "customercomments",
                localField: "comments",
                foreignField: "_id",
                as: "comments"
            }
        },
        {
            $unwind: {
                path: "$comments",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "comments.posted_by",
                foreignField: "_id",
                as: "comments.posted_by"
            }
        },
        {
            $project: {
                company_name: 1,
                contact_person: 1,
                phone: 1,
                email: 1,
                website: 1,
                source: 1,
                order: 1,
                added_by: 1,
                organization: 1,
                createdAt: 1,
                updatedAt: 1,
                comments: {
                    _id: 1,
                    text: 1,
                    posted_by: { $arrayElemAt: ["$comments.posted_by", 0] },
                    posted_to: 1,
                    organization: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    company_name: "$company_name",
                    contact_person: "$contact_person",
                    phone: "$phone",
                    email: "$email",
                    website: "$website",
                    source: "$source",
                    order: "$order",
                    added_by: "$added_by",
                    organization: "$organization",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt"
                },
                comments: {
                    $push: "$comments"
                }
            }
        },
        {
            $limit: 1
        }
    ])
        .then(customer => {
            res.status(200).json(customer);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.postLead = (req, res) => {
    const {
        company_name,
        contact_person,
        phone,
        email,
        website,
        source,
        order
    } = req.body;
    const newLead = new Lead({
        company_name: company_name,
        contact_person: contact_person,
        phone: phone,
        email: email,
        website: website,
        source: source,
        order: order,
        comments: [],
        added_by: req.user._id,
        organization: req.user.organization
    });
    newLead
        .save()
        .then(leadCreated => {
            res.status(201).json({ message: "Lead created successfully!" });
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};

module.exports.putLead = (req, res) => {
    const {
        company_name,
        contact_person,
        phone,
        email,
        website,
        source,
        order
    } = req.body;
    const { leadID } = req.params;
    const leadUpdates = {
        company_name: company_name,
        contact_person: contact_person,
        phone: phone,
        email: email,
        website: website,
        source: source,
        order: order
    };
    Lead.findOneAndUpdate({ _id: leadID }, leadUpdates)
        .then(updatedLead => {
            res.status(200).json({ message: "Lead updated successfully!" });
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.postCustomer = (req, res) => {
    const {
        company_name,
        contact_person,
        phone,
        email,
        website,
        source,
        order
    } = req.body;
    const newCustomer = new Customer({
        company_name: company_name,
        contact_person: contact_person,
        phone: phone,
        email: email,
        website: website,
        source: source,
        order: order,
        comments: [],
        added_by: req.user._id,
        organization: req.user.organization
    });
    newCustomer
        .save()
        .then(customerCreated => {
            res.status(201).json({ message: "Customer created successfully!" });
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};

module.exports.putCustomer = (req, res) => {
    const {
        company_name,
        contact_person,
        phone,
        email,
        website,
        source,
        order
    } = req.body;
    const { customerID } = req.params;
    const customerUpdates = {
        company_name: company_name,
        contact_person: contact_person,
        phone: phone,
        email: email,
        website: website,
        source: source,
        order: order
    };
    Customer.findOneAndUpdate({ _id: customerID }, customerUpdates)
        .then(updatedLead => {
            res.status(200).json({ message: "Customer updated successfully!" });
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

// Lead Comments

module.exports.getLeadComments = (req, res) => {
    const { leadID } = req.params;
    LeadComment.aggregate([
        {
            $match: {
                $and: [
                    {
                        posted_to: mongoose.Types.ObjectId(leadID)
                    },
                    {
                        organization: mongoose.Types.ObjectId(
                            req.user.organization
                        )
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "posted_by",
                foreignField: "_id",
                as: "posted_by"
            }
        },
        {
            $project: {
                _id: 1,
                text: 1,
                posted_by: {
                    $arrayElemAt: ["$posted_by", 0]
                },
                posted_to: 1,
                organization: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }
    ])
        .then(leadCommnets => {
            res.status(200).json(leadCommnets);
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};

module.exports.postLeadComment = (req, res) => {
    const { leadID } = req.params;
    const { text } = req.body;
    const newLeadComment = new LeadComment({
        text: text,
        posted_by: req.user._id,
        posted_to: leadID,
        organization: req.user.organization
    });
    newLeadComment
        .save()
        .then(leadComment => {
            return Lead.findByIdAndUpdate(leadID, {
                $push: { comments: leadComment._id }
            });
        })
        .then(updatedLead => {
            res.status(201).json({ message: "Lead Posted Successfully!" });
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};

module.exports.editLeadComment = (req, res) => {
    const { leadID, commentID } = req.params;
    const { text } = req.body;
    LeadComment.findOneAndUpdate(
        {
            $and: [
                { _id: commentID },
                { posted_to: leadID },
                { organization: req.user.organization }
            ]
        },
        { text: text },
        { new: true }
    )
        .then(updatedComment => {
            res.status(200).json(updatedComment);
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};

module.exports.deleteLeadComment = (req, res) => {
    const { leadID, commentID } = req.params;
    Lead.findByIdAndUpdate(leadID, {
        $pull: { comments: { $in: [commentID] } }
    })
        .then(updatedLead => {
            LeadComment.findByIdAndDelete(commentID)
                .exec()
                .then(deleted => {
                    res.status(200).json({
                        message: "Comment Deleted Successfully!"
                    });
                })
                .catch(error => res.status(400).json({ message: `${error}` }));
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};

// Customer Comments

module.exports.getCustomerComments = (req, res) => {
    const { customerID } = req.params;
    CustomerComment.aggregate([
        {
            $match: {
                $and: [
                    {
                        posted_to: mongoose.Types.ObjectId(customerID)
                    },
                    {
                        organization: mongoose.Types.ObjectId(
                            req.user.organization
                        )
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "posted_by",
                foreignField: "_id",
                as: "posted_by"
            }
        },
        {
            $project: {
                _id: 1,
                text: 1,
                posted_by: {
                    $arrayElemAt: ["$posted_by", 0]
                },
                posted_to: 1,
                organization: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }
    ])
        .then(customerComments => {
            res.status(200).json(customerComments);
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};

module.exports.postCustomerComment = (req, res) => {
    const { customerID } = req.params;
    const { text } = req.body;
    const newCustomerComment = new CustomerComment({
        text: text,
        posted_by: req.user._id,
        posted_to: customerID,
        organization: req.user.organization
    });
    newCustomerComment
        .save()
        .then(customerComment => {
            Customer.findByIdAndUpdate(customerID, {
                $push: { comments: customerComment._id }
            })
                .then(updatedCustomer => {
                    res.status(201).json(customerComment);
                })
                .catch(error => res.status(400).json({ message: `${error}` }));
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};

module.exports.editCustomerComment = (req, res) => {
    const { customerID, commentID } = req.params;
    const { text } = req.body;
    CustomerComment.findOneAndUpdate(
        {
            $and: [
                { _id: commentID },
                { posted_to: customerID },
                { organization: req.user.organization }
            ]
        },
        { text: text },
        { new: true }
    )
        .then(updatedComment => {
            res.status(200).json(updatedComment);
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};

module.exports.deleteCustomerComment = (req, res) => {
    const { customerID, commentID } = req.params;
    Customer.findByIdAndUpdate(customerID, {
        $pull: { comments: { $in: [commentID] } }
    })
        .then(updatedCustomer => {
            CustomerComment.findByIdAndDelete(commentID)
                .exec()
                .then(deleted => {
                    res.status(200).json({
                        message: "Comment Deleted Successfully!"
                    });
                })
                .catch(error => res.status(400).json({ message: `${error}` }));
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};
