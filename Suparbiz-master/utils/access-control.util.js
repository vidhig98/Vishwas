const AccessControl = require("accesscontrol");

const ac = new AccessControl();

// ++++++++++++++++++++++++++++++++
// Employee Priviledges
// ++++++++++++++++++++++++++++++++

// Attendance Resource
ac.grant("employee").readOwn("attendance");

// Employee Resource
ac.grant("employee")
    .readOwn("employee")
    .updateOwn("employee");

// Task Resource
ac.grant("employee")
    .createAny("task")
    .readOwn("task")
    .updateOwn("task")
    .deleteOwn("task");

// Task Comment Resource
ac.grant("employee")
    .createAny("taskComment")
    .readAny("taskComment")
    .updateOwn("taskComment")
    .deleteOwn("taskComment");

// ++++++++++++++++++++++++++++++++
// Admin Priviledges
// ++++++++++++++++++++++++++++++++

// Attendance Resource
ac.grant("admin")
    .createAny("attendance")
    .readAny("attendance")
    .updateAny("attendance");

// Customer Resource
ac.grant("admin")
    .createAny("customer")
    .readAny("customer")
    .updateAny("customer")
    .deleteAny("customer");
ac.grant("admin")
    .createAny("customerComment")
    .readAny("customerComment")
    .updateAny("customerComment")
    .deleteAny("customerComment");

// Department Resource
ac.grant("admin").readAny("department");

// Employee Resource
ac.grant("admin")
    .createAny("employee")
    .readAny("employee")
    .updateAny("employee")
    .deleteAny("employee");

// Job Resource
ac.grant("admin")
    .createAny("job")
    .readAny("job")
    .updateAny("job")
    .deleteAny("job");

ac.grant("admin")
    .createAny("inventory")
    .readAny("inventory")
    .updateAny("inventory")
    .deleteAny("inventory");

ac.grant("admin")
    .createAny("production")
    .readAny("production")
    .updateAny("production")
    .deleteAny("production");

// Lead Resource
ac.grant("admin")
    .createAny("lead")
    .readAny("lead")
    .updateAny("lead")
    .deleteAny("lead");
ac.grant("admin")
    .createAny("leadComment")
    .readAny("leadComment")
    .updateAny("leadComment")
    .deleteAny("leadComment");

// Task Resource
ac.grant("admin")
    .createAny("task")
    .readAny("task")
    .updateAny("task")
    .deleteAny("task");

// Task Comment Resource
ac.grant("admin")
    .createAny("taskComment")
    .readAny("taskComment")
    .updateAny("taskComment")
    .deleteAny("taskComment");

exports.ac = ac;
