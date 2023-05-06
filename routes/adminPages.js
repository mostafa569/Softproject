const express = require('express');
const path = require('path');
const router = express.Router();
const Admins = require('../models/admin');
const Students = require('../models/student');
const Studentcounter = require('../models/studentcounter');
const Doctorcounter = require('../models/doctorcounter');
const Doctors = require('../models/doctor');
const Departments = require('../models/department');
const Courses = require('../models/course');
const log = require('../config/auth');
var isAdmin = log.isAdmin;


router.get('/:id', isAdmin, async (req, res) => {

    const id = req?.params?.id;
    await Departments.find({}).then((depts) => {
        res.render('Adminhome.ejs', {
            id: id,
            departments: depts
        });
    }).catch(err => {
        if (err)
            console.log(err);
    });




});

router.post('/:id/add-department', isAdmin, async (req, res) => {
    const id = req?.params?.id;
    const name = req?.body?.name;
    const code = req?.body?.code;

    await Departments.findOne({ code: code }).then(dept => {
        if (dept) {
            //req.flash
            res.redirect('/admin-area/' + id);
        } else {
            const dept = new Departments({ name: name, code: code });
            dept.save().catch((err) => {
                if (err)
                    console.log(err);
            });
            //req.flash
            res.redirect('/admin-area/' + id);
        }
    }).catch(err => {
        if (err)
            console.log(err);
    });



});

router.post('/:id/add-course', isAdmin, async (req, res) => {
    const id = req?.params?.id;
    const name = req?.body?.name;
    const code = req?.body?.code;
    const department = req?.body?.department;
    const preReq = req?.body?.prereq


    await Courses.findOne({ code: code }).then(course => {
        if (course) {
            //req.flash
            res.redirect('/admin-area/' + id);
        } else {
            if (preReq) {
                Courses.findOne({ code: preReq }).then(c => {
                    if (c) {
                        var arr = [preReq];
                        const cr = new Courses({ name: name, code: code, dept: department, prerequirements: arr });
                         cr.save().then(() => {

                            //req.flash
                            res.redirect('/admin-area/' + id);
                        }).catch(err => {
                            if (err)
                                console.log(err);
                        });
                    } else {
                         //req.flash
                         res.redirect('/admin-area/' + id);
                    }
                });
            }else{
                const cr = new Courses({ name: name, code: code, dept: department, prerequirements: [""] });
                         cr.save().then(() => {

                            //req.flash
                            res.redirect('/admin-area/' + id);
                        }).catch(err => {
                            if (err)
                                console.log(err);
                        });
            }



        }


    }).catch(err => {
        if (err)
            console.log(err);
    });

});

router.post('/:id/add-student', isAdmin, async (req, res) => {
    const id = req?.params?.id;
    const name = req?.body?.name;
    const department = req?.body?.department;
    const level = req?.body?.level;
    const nationalID = req?.body?.nationalid;
    const coursesArray = [""];

    await Students.findOne({ nationalid: nationalID }).then(async (student) => {
        if (student) {
            //req.flash
            res.redirect('/admin-area/' + id);
        } else {
            const username = generateUserName('Student');
            const password = generateRandomPassword(nationalID);
            var sequence = 0;
            await Studentcounter.findOneAndUpdate({ id: "studentNumber" }, { "$inc": { "Seq": 1 } }, { new: true }).then((count) => {
                if (!count) {
                    const sc = new Studentcounter({ id: "studentNumber", Seq: 3000001 });
                    sc.save().catch((err) => {
                        if (err)
                            console.log(err);
                    });

                    sequence = 3000001;
                } else {
                    sequence = count.Seq;

                }
            }).catch((err) => {
                if (err)
                    console.log(err);
            });

            const student = new Students({ name: name, username: username, courses: coursesArray, password: password, academicnumber: sequence, nationalid: nationalID, department: department, level: level });
            student.save().catch((err) => {
                if (err)
                    console.log(err);
            });

            //req.flash
            res.redirect('/admin-area/' + id);


        }
    }).catch(err => {
        if (err)
            console.log(err);
    });



});

router.post('/:id/add-doctor', isAdmin, async (req, res) => {
    const id = req?.params?.id;
    const name = req?.body?.name;
    const department = req?.body?.department;
    const nationalID = req?.body?.nationalid;
    const coursesArray = [""];

    await Doctors.findOne({ nationalid: nationalID }).then(async (doctor) => {
        if (doctor) {
            //req.flash
            res.redirect('/admin-area/' + id);
        } else {
            const username = generateUserName('Doctor');;
            const password = generateRandomPassword(nationalID);
            var sequence = 0;

            await Doctorcounter.findOneAndUpdate({ id: "doctorNumber" }, { "$inc": { "Seq": 1 } }, { new: true }).then((count) => {
                if (!count) {
                    const dc = new Doctorcounter({ id: "doctorNumber", Seq: 2000001 });
                    dc.save().catch((err) => {
                        if (err)
                            console.log(err);
                    });

                    sequence = 2000001;

                } else {

                    sequence = count.Seq;

                }
            }).catch((err) => {
                if (err)
                    console.log(err);
            });

            const doctor = new Doctors({ name: name, username: username, courses: coursesArray, docID: sequence, password: password, nationalid: nationalID, department: department });
            doctor.save().catch((err) => {
                if (err)
                    console.log(err);
            });

            //req.flash
            res.redirect('/admin-area/' + id);

        }
    }).catch(err => {
        if (err)
            console.log(err);
    });


});


router.post('/:id/assign-course', isAdmin, async (req, res) => {
    const id = req?.params?.id;
    const courseid = req?.body?.code;
    const DId = req?.body?.DocId;
    console.log(DId);
    var cour = [""];
    await Doctors.findOne({ docID: DId }).then((doc) => {

        if (doc) {
            if (doc.courses.length !== 0) {
                for (let i = 0; i < doc.courses.length; i++) {
                    cour[i] = doc.courses[i]
                }
            }

            console.log(cour);
            Courses.findOne({ code: courseid }).then((f) => {

                if (f) {

                    cour.push(f.code);
                    console.log(cour)
                    doc.updateOne({ courses: cour }).catch((error) => console.error(error));

                }

            });

            res.redirect('/admin-area/' + id);

        } else {
            res.redirect('/admin-area/' + id);
        }



    }).catch(err => {
        if (err)
            console.log(err);
    });




});






function generateUserName(type) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (type == 'Doctor') {
        return 200 + result;
    }
    else {
        return 300 + result;
    }
}


function generateRandomPassword(nationalid) {
    const charset = nationalid + "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}



module.exports = router;

