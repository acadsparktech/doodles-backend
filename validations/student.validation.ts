import { BLOOD_GROUP, GENDERS, PARENTING_TYPE, PHONE_TYPE } from '@constants/arrays';
import { ADDRESS, ALL_CAPS, EMAIL, ISALNUM, ISALNUMHYP, NUMBER, PASSWORD, PHONE_NUM, ZIPCODE } from '@constants/regex';
import { MiddlewareFunction } from '@interface/index';
import isEmpty from 'is-empty';

export const addStudent: MiddlewareFunction = async (req, res, next) => {
  try {
    const body: any = req.body;
    const errors: any = {};

    if (isEmpty(body.rollNumber)) {
      errors.rollNumber = 'Roll number cannot be empty';
    } else if (!ISALNUMHYP.test(body.rollNumber)) {
      errors.rollNumber = 'Roll number can contain only A-Z & numbers characters with - or _ ';
    }

    if (isEmpty(body.password.trim())) {
      errors.password = 'Password cannot be empty';
    } else if (body.password.includes(' ')) {
      errors.password = 'Password cannot contain spaces';
    } else if (body.password.length < 8 || body.password.length >= 32) {
      errors.password = 'Password can only 8 to 32 characters long';
    } else if (!PASSWORD.test(body.password)) {
      errors.password = 'Invalid password, password must match the criteria';
    } else if (body.password !== body.confirmPassword) {
      errors.password = "Passwords doesn't match";
      errors.confirmPassword = "Passwords doesn't match";
    }

    if (isEmpty(body.email)) {
      errors.email = 'Email cannot be empty';
    } else if (!EMAIL.test(body.email)) {
      errors.email = 'Invalid email';
    }

    if (isEmpty(body.firstName)) {
      errors.firstName = 'Firstname cannot be empty';
    } else if (!ISALNUM.test(body.firstName)) {
      errors.firstName = 'Firstname contains invalid characters';
    }

    if (isEmpty(body.lastName)) {
      errors.lastName = 'Lastname cannot be empty';
    } else if (!ISALNUM.test(body.lastName)) {
      errors.lastName = 'Lastname contains invalid characters';
    }

    if (isEmpty(body.gender)) {
      errors.gender = 'Gender cannot be empty';
    } else if (!GENDERS.includes(body.gender)) {
      errors.gender = 'Invalid gender';
    }

    if (isEmpty(body.dateOfBirth)) {
      errors.dateOfBirth = 'Date of Birth cannot be empty';
    }

    if (!isEmpty(body.examNumber) && !ISALNUMHYP.test(body.examNumber)) {
      errors.examNumber = 'Invalid exam number';
    }

    if (!isEmpty(body.emisNumber) && !ISALNUMHYP.test(body.emisNumber)) {
      errors.emisNumber = 'Invalid EMIS number';
    }

    if (isEmpty(body.parentingType)) {
      errors.parentingType = 'Parenting Type cannot be empty';
    } else if (!PARENTING_TYPE.includes(body.parentingType)) {
      errors.parentingType = 'Invalid parenting type';
    }

    if (!isEmpty(body.fatherName) && !ISALNUM.test(body.fatherName)) {
      errors.fatherName = "Invalid father's name";
    }

    if (!isEmpty(body.motherName) && !ISALNUM.test(body.motherName)) {
      errors.motherName = "Invalid mother's name";
    }

    if (!isEmpty(body.guardianName) && !ISALNUM.test(body.guardianName)) {
      errors.guardianName = "Invalid guardian's name";
    }

    if (!isEmpty(body.orphanageName) && !ISALNUM.test(body.orphanageName)) {
      errors.orphanageName = 'Invalid orphange name';
    }

    if (isEmpty(body.phoneNumber1)) {
      errors.phoneNumber1 = 'Primary phone number cannot be empty';
    } else if (!PHONE_NUM.test(body.phoneNumber1)) {
      errors.phoneNumber1 = 'Phone number can only contain numbers and country code';
    }

    if (isEmpty(body.phone1Type)) {
      errors.phone1Type = 'Primary phone type cannot be empty';
    } else if (!PHONE_TYPE.includes(body.phone1Type)) {
      errors.phone1Type = 'Invalid phone type';
    }

    if (!isEmpty(body.phoneNumber2) && !PHONE_NUM.test(body.phoneNumber2)) {
      errors.phoneNumber2 = 'Phone number can only contain numbers and country code';
    } else if (body.phoneNumber2 && body.phoneNumber2.length > 0 && !PHONE_TYPE.includes(body.phone2Type)) {
      errors.phone2Type = 'Invalid phone type';
    }

    if (!isEmpty(body.address) && body.address.length < 20) {
      errors.address = 'Address should be minimum 20 characters long';
    } else if (!ADDRESS.test(body.address)) {
      errors.address = 'Address contains invalid characters';
    }

    if (isEmpty(body.city)) {
      errors.city = 'City cannot be empty';
    } else if (!ISALNUM.test(body.city)) {
      errors.city = 'City contains invalid characters';
    }

    if (isEmpty(body.state)) {
      errors.state = 'State cannot be empty';
    } else if (!ISALNUM.test(body.state)) {
      errors.state = 'State contains invalid characters';
    }

    if (isEmpty(body.nationality)) {
      errors.nationality = 'Nationality cannot be empty';
    } else if (!ISALNUM.test(body.nationality)) {
      errors.nationality = 'Nationality contains invalid characters';
    }

    if (isEmpty(body.pincode)) {
      errors.pincode = 'Pincode cannot be empty';
    } else if (!ZIPCODE.test(body.pincode)) {
      errors.pincode = 'Pincode contains invalid characters';
    }

    if (!isEmpty(body.bloodGroup) && !BLOOD_GROUP.includes(body.bloodGroup)) {
      errors.bloodGroup = 'Invalid blood group';
    }

    if (!isEmpty(body.totalFee) && !NUMBER.test(body.totalFee)) {
      errors.totalFee = 'Invalid fee amount, fee amount can only contain numbers';
    }

    if (!isEmpty(body.consessionPercent) && !NUMBER.test(body.consessionPercent)) {
      errors.consessionPercent = 'Invalid concession percentage';
    } else if (parseFloat(body.consessionPercent) < 0) {
      errors.consessionPercent = 'Concession percentage cannot be negative';
    }

    if (isEmpty(body.academicYear)) {
      errors.academicYear = 'Academic year cannot be empty';
    } else if (!ISALNUMHYP.test(body.academicYear)) {
      errors.academicYear = 'Invalid academic year';
    }

    if (isEmpty(body.class)) {
      errors.class = 'Class cannot be empty';
    } else if (!NUMBER.test(body.class)) {
      errors.class = 'Class can only be numeric';
    }

    if (isEmpty(body.section)) {
      errors.section = 'Section cannot be empty';
    } else if (!ALL_CAPS.test(body.section)) {
      errors.section = 'Section must be all caps';
    }

    if (!isEmpty(body.group) && !ISALNUM.test(body.group)) {
      errors.group = 'Group contains invalid characters';
    }

    if (!isEmpty(errors)) {
      return res.status(400).json({ success: false, errors, message: 'Application contains errors' });
    } else {
      return next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};
