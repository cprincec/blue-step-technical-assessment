// I provided this solution with the assumption that the UserHelper library is imported and avaliable

const form = document.forms[0];

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Perform validation with Javascript in case of bypassed html validation
    const errors = validateForm(e);
    if (errors.length > 0) {
        return displayFormErrors(errors);
    } else {
        // Remove any existing errors messages
        document.querySelectorAll(".error").forEach((element) => element.remove());
    }

    const formData = new FormData(e.target);

    // create and populate user data object with form data
    const userData = {};
    for (const [key, value] of formData.entries()) {
        userData[key] = value;
    }

    // Simulate post request to pretend API
    // const url = "myfunapi.fake/user/signup";
    // try {
    //     let response = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(userData),
    //     });

    //     if (!response.ok) console.log("An error occured");
    //     const data = await response.json();
    //     console.log(data);
    // } catch (error) {
    //     console.error("Error fetching data:", error);
    // }

    // Call mockApi function
    const response = mockAPI(userData);

    const notificationModal = new bootstrap.Modal("#notification");
    const modalH1 = document.querySelector(".modal-title");

    // Display the mockAPI response in frontend modal
    if (response.result === false) {
        modalH1.textContent = response.message;
        return;
    } else if (response.result === true) {
        modalH1.textContent = response.message;
        notificationModal.show();
        form.reset();
    }
});

// MOCK API function
function mockAPI(userData) {
    // validate for required fields
    if (!userData.email || !userData.name) {
        return { result: false, message: "Email and Name are required" };
    }

    // create and save user
    // try {
    //     const newUser = UserHelper.create(); // Assumes the UserHelper library has been imported or available in the scope
    //     if (!newUser) return { result: false, message: "Error creating user" };

    //     // Set user data
    //     if (!newUser.setName(userData.name)) return { result: false, message: "Error setting name" };
    //     if (!newUser.setEmail(userData.email)) return { result: false, message: "Error setting email" };
    //     if (!newUser.setPhone(userData.phone)) return { result: false, message: "Error setting phone" };
    //     if (!newUser.setAddres(userData.address)) return { result: false, message: "Error setting address" };
    //     if (!newUser.setEmergencyContact(userData.emergencyContect))
    //         return { result: false, message: "Error setting emergency contact" };
    //     if (!newUser.setSex(userData.sex)) return { result: false, message: "Error setting sex" };
    //     if (!newUser.setDob(userData.dob)) return { result: false, message: "Error setting date of birth" };

    //     // Save user
    //     const saveSuccessful = UserHelper.save();

    //     if (saveSuccessful) return { result: true, message: "Sign up successful" };
    //     else return { result: false, message: "Sign up failed" };
    // } catch (error) {
    //     return { result: false, message: "Something went wrong" };
    // }

    return {
        result: true,
        message: "Sign up successful",
    };
}

/**
 *
 * Utility functions
 *
 * */
function displayFormErrors(errors) {
    // Remove any existing errors messages
    document.querySelectorAll(".error").forEach((element) => element.remove());

    // Display validation errors on form
    if (errors.length > 0) {
        errors.forEach((error) => {
            // create dynamic classes for each error display element
            const errorElementClass = `text-danger error ${error.field}-error`;

            const errorElement = `<div class="${errorElementClass}">${error.message}</div>`;
            const field = document.querySelector(`[name = ${error.field}]`);
            field.insertAdjacentHTML("afterend", errorElement);
        });

        return;
    }
}

// e refers to the submitted form
function validateForm(e) {
    const errors = [];
    let message;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // validate form fields incase html validation is bypassed
    if (!e.target.name.value.trim()) {
        message = "Name is required";
        errors.push({
            field: "name",
            message: message,
        });
    }

    if (!e.target.email.value.trim()) {
        message = "Email is required";
        errors.push({
            field: "email",
            message: message,
        });
    } else if (!emailRegex.test(e.target.email.value)) {
        message = "Enter a valid email";
        errors.push({
            field: "email",
            message: message,
        });
    }

    if (!e.target.address.value.trim()) {
        message = "Address is required";
        errors.push({
            field: "address",
            message: message,
        });
    }

    if (!e.target.sex.value) {
        message = "Sex is required";
        errors.push({
            field: "sex",
            message: message,
        });
    }

    if (!e.target.dob.value) {
        message = "Date of Birth is required";
        errors.push({
            field: "dob",
            message: message,
        });
    }

    return errors;
}
