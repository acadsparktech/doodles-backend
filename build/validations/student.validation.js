"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStudent = void 0;
const arrays_1 = require("@constants/arrays");
const regex_1 = require("@constants/regex");
const is_empty_1 = __importDefault(require("is-empty"));
const addStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const errors = {};
        if ((0, is_empty_1.default)(body.rollNumber)) {
            errors.rollNumber = 'Roll number cannot be empty';
        }
        else if (!regex_1.ISALNUMHYP.test(body.rollNumber)) {
            errors.rollNumber = 'Roll number can contain only A-Z & numbers characters with - or _ ';
        }
        if ((0, is_empty_1.default)(body.password.trim())) {
            errors.password = 'Password cannot be empty';
        }
        else if (body.password.includes(' ')) {
            errors.password = 'Password cannot contain spaces';
        }
        else if (body.password.length < 8 || body.password.length >= 32) {
            errors.password = 'Password can only 8 to 32 characters long';
        }
        else if (!regex_1.PASSWORD.test(body.password)) {
            errors.password = 'Invalid password, password must match the criteria';
        }
        else if (body.password !== body.confirmPassword) {
            errors.password = "Passwords doesn't match";
            errors.confirmPassword = "Passwords doesn't match";
        }
        if ((0, is_empty_1.default)(body.email)) {
            errors.email = 'Email cannot be empty';
        }
        else if (!regex_1.EMAIL.test(body.email)) {
            errors.email = 'Invalid email';
        }
        if ((0, is_empty_1.default)(body.firstName)) {
            errors.firstName = 'Firstname cannot be empty';
        }
        else if (!regex_1.ISALNUM.test(body.firstName)) {
            errors.firstName = 'Firstname contains invalid characters';
        }
        if ((0, is_empty_1.default)(body.lastName)) {
            errors.lastName = 'Lastname cannot be empty';
        }
        else if (!regex_1.ISALNUM.test(body.lastName)) {
            errors.lastName = 'Lastname contains invalid characters';
        }
        if ((0, is_empty_1.default)(body.gender)) {
            errors.gender = 'Gender cannot be empty';
        }
        else if (!arrays_1.GENDERS.includes(body.gender)) {
            errors.gender = 'Invalid gender';
        }
        if ((0, is_empty_1.default)(body.dateOfBirth)) {
            errors.dateOfBirth = 'Date of Birth cannot be empty';
        }
        if (!(0, is_empty_1.default)(body.examNumber) && !regex_1.ISALNUMHYP.test(body.examNumber)) {
            errors.examNumber = 'Invalid exam number';
        }
        if (!(0, is_empty_1.default)(body.emisNumber) && !regex_1.ISALNUMHYP.test(body.emisNumber)) {
            errors.emisNumber = 'Invalid EMIS number';
        }
        if ((0, is_empty_1.default)(body.parentingType)) {
            errors.parentingType = 'Parenting Type cannot be empty';
        }
        else if (!arrays_1.PARENTING_TYPE.includes(body.parentingType)) {
            errors.parentingType = 'Invalid parenting type';
        }
        if (!(0, is_empty_1.default)(body.fatherName) && !regex_1.ISALNUM.test(body.fatherName)) {
            errors.fatherName = "Invalid father's name";
        }
        if (!(0, is_empty_1.default)(body.motherName) && !regex_1.ISALNUM.test(body.motherName)) {
            errors.motherName = "Invalid mother's name";
        }
        if (!(0, is_empty_1.default)(body.guardianName) && !regex_1.ISALNUM.test(body.guardianName)) {
            errors.guardianName = "Invalid guardian's name";
        }
        if (!(0, is_empty_1.default)(body.orphanageName) && !regex_1.ISALNUM.test(body.orphanageName)) {
            errors.orphanageName = 'Invalid orphange name';
        }
        if ((0, is_empty_1.default)(body.phoneNumber1)) {
            errors.phoneNumber1 = 'Primary phone number cannot be empty';
        }
        else if (!regex_1.PHONE_NUM.test(body.phoneNumber1)) {
            errors.phoneNumber1 = 'Phone number can only contain numbers and country code';
        }
        if ((0, is_empty_1.default)(body.phone1Type)) {
            errors.phone1Type = 'Primary phone type cannot be empty';
        }
        else if (!arrays_1.PHONE_TYPE.includes(body.phone1Type)) {
            errors.phone1Type = 'Invalid phone type';
        }
        if (!(0, is_empty_1.default)(body.phoneNumber2) && !regex_1.PHONE_NUM.test(body.phoneNumber2)) {
            errors.phoneNumber2 = 'Phone number can only contain numbers and country code';
        }
        else if (body.phoneNumber2 && body.phoneNumber2.length > 0 && !arrays_1.PHONE_TYPE.includes(body.phone2Type)) {
            errors.phone2Type = 'Invalid phone type';
        }
        if (!(0, is_empty_1.default)(body.address) && body.address.length < 20) {
            errors.address = 'Address should be minimum 20 characters long';
        }
        else if (!regex_1.ADDRESS.test(body.address)) {
            errors.address = 'Address contains invalid characters';
        }
        if ((0, is_empty_1.default)(body.city)) {
            errors.city = 'City cannot be empty';
        }
        else if (!regex_1.ISALNUM.test(body.city)) {
            errors.city = 'City contains invalid characters';
        }
        if ((0, is_empty_1.default)(body.state)) {
            errors.state = 'State cannot be empty';
        }
        else if (!regex_1.ISALNUM.test(body.state)) {
            errors.state = 'State contains invalid characters';
        }
        if ((0, is_empty_1.default)(body.nationality)) {
            errors.nationality = 'Nationality cannot be empty';
        }
        else if (!regex_1.ISALNUM.test(body.nationality)) {
            errors.nationality = 'Nationality contains invalid characters';
        }
        if ((0, is_empty_1.default)(body.pincode)) {
            errors.pincode = 'Pincode cannot be empty';
        }
        else if (!regex_1.ZIPCODE.test(body.pincode)) {
            errors.pincode = 'Pincode contains invalid characters';
        }
        if (!(0, is_empty_1.default)(body.bloodGroup) && !arrays_1.BLOOD_GROUP.includes(body.bloodGroup)) {
            errors.bloodGroup = 'Invalid blood group';
        }
        if (!(0, is_empty_1.default)(body.totalFee) && !regex_1.NUMBER.test(body.totalFee)) {
            errors.totalFee = 'Invalid fee amount, fee amount can only contain numbers';
        }
        if (!(0, is_empty_1.default)(body.consessionPercent) && !regex_1.NUMBER.test(body.consessionPercent)) {
            errors.consessionPercent = 'Invalid concession percentage';
        }
        else if (parseFloat(body.consessionPercent) < 0) {
            errors.consessionPercent = 'Concession percentage cannot be negative';
        }
        if ((0, is_empty_1.default)(body.academicYear)) {
            errors.academicYear = 'Academic year cannot be empty';
        }
        else if (!regex_1.ISALNUMHYP.test(body.academicYear)) {
            errors.academicYear = 'Invalid academic year';
        }
        if ((0, is_empty_1.default)(body.class)) {
            errors.class = 'Class cannot be empty';
        }
        else if (!regex_1.NUMBER.test(body.class)) {
            errors.class = 'Class can only be numeric';
        }
        if ((0, is_empty_1.default)(body.section)) {
            errors.section = 'Section cannot be empty';
        }
        else if (!regex_1.ALL_CAPS.test(body.section)) {
            errors.section = 'Section must be all caps';
        }
        if (!(0, is_empty_1.default)(body.group) && !regex_1.ISALNUM.test(body.group)) {
            errors.group = 'Group contains invalid characters';
        }
        if (!(0, is_empty_1.default)(errors)) {
            return res.status(400).json({ success: false, errors, message: 'Application contains errors' });
        }
        else {
            return next();
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
});
exports.addStudent = addStudent;
