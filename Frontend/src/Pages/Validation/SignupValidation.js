export default function SignupValidation(values) {
    debugger
    const errors = {};

    // Define the patterns as regular expressions
    const Firstname_pattern = /^[A-Za-z]+([ '-][A-Za-z]+)*$/; // Updated for first name
    const lastname_pattern = /^[A-Za-z]+([ '-][A-Za-z]+)*$/; 
    const mobile_pattern =/^[6-9]\d{9}$/;


    const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (values.FirstName == "") {
        errors.FirstName = "Firstname Required"
    }
    else if (!Firstname_pattern.test(values.FirstName)) {
        errors.FirstName = "invalid FirstName"
    }

    if (values.LastName == "") {
        errors.LastName = "Lastname Required"
    }
    else if (!lastname_pattern.test(values.LastName)) {
        errors.LastName = "invalid LastName"
    }

    if (values.MobileNumber === "") {
        errors.MobileNumber = "Mobile Number required";
        
    } else if (!mobile_pattern.test(values.MobileNumber)) {
        errors.MobileNumber = "Invalid Number";
    }

    if (values.Email === "") {
        errors.Email = "Email required";
    } else if (!email_pattern.test(values.Email)) {
        errors.Email = "Invalid Email";
    }

    if(values.Password=="")
    {
        errors.Password="Password required"
    }
    // else if(!password_pattern.test(values.Password))
    // {
    //     errors.Password="Password must be 8 characters"
    // }

    if(values.ConfirmPassword=="")
    {
        errors.ConfirmPassword="Confirm Password"
    }
    else if(values.Password!= values.ConfirmPassword)
    {
         errors.ConfirmPassword="Password did not match"
        
    }

    return errors;
}
