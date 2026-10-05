document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // MOBILE MENU
    // =========================

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
            });
        });

    }


    // =========================
    // LOAN MODAL
    // =========================

    const loanModal = document.getElementById("loanModal");
    const closeBtn = document.getElementById("closeBtn");

    const applyBtn = document.getElementById("applyBtn");
    const navApplyBtn = document.getElementById("navApplyBtn");
    const heroApplyBtn = document.getElementById("heroApplyBtn");
    const bottomApplyBtn = document.getElementById("bottomApplyBtn");

    const loanForm = document.getElementById("loanForm");

    const successMessage = document.getElementById("successMessage");
    const successCloseBtn = document.getElementById("successCloseBtn");


    // OPEN FORM
    function openLoanForm() {

        if (loanModal) {
            loanModal.style.display = "flex";
            document.body.style.overflow = "hidden";
        }

    }


    if (applyBtn) {
        applyBtn.addEventListener("click", openLoanForm);
    }

    if (navApplyBtn) {
        navApplyBtn.addEventListener("click", openLoanForm);
    }

    if (heroApplyBtn) {
        heroApplyBtn.addEventListener("click", openLoanForm);
    }

    if (bottomApplyBtn) {
        bottomApplyBtn.addEventListener("click", openLoanForm);
    }


    // CLOSE FORM
    if (closeBtn) {

        closeBtn.addEventListener("click", function () {

            loanModal.style.display = "none";
            document.body.style.overflow = "auto";

        });

    }


    // CLOSE OUTSIDE
    if (loanModal) {

        loanModal.addEventListener("click", function (event) {

            if (event.target === loanModal) {

                loanModal.style.display = "none";
                document.body.style.overflow = "auto";

            }

        });

    }


    // CLOSE SUCCESS MESSAGE
    if (successCloseBtn) {

        successCloseBtn.addEventListener("click", function () {

            if (successMessage) {
                successMessage.style.display = "none";
            }

        });

    }


    // =========================
    // SUBMIT FORM
    // =========================

    if (loanForm) {

        loanForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            const application = {

                name: document.getElementById("name").value.trim(),

                loanAmount:
                    document.getElementById("loanAmount").value,

                mobile:
                    document.getElementById("mobile").value.trim(),

                email:
                    document.getElementById("email").value.trim(),

                state:
                    document.getElementById("state").value,

                loanType:
                    document.getElementById("loanType").value,

                monthlyIncome:
                    document.getElementById("monthlyIncome").value

            };


            // NAME
            if (!application.name) {

                alert("Please enter your name.");
                return;

            }


            // MOBILE
            if (!/^[0-9]{10}$/.test(application.mobile)) {

                alert("Please enter a valid 10-digit mobile number.");
                return;

            }


            // EMAIL
            if (!application.email) {

                alert("Please enter your email.");
                return;

            }


            // LOAN AMOUNT
            if (!application.loanAmount) {

                alert("Please enter loan amount.");
                return;

            }


            try {

                const response = await fetch(
                    "/submit-application",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(application)
                    }
                );


                const result = await response.json();


                // SUCCESS
                if (result.success) {

                    loanForm.reset();

                    loanModal.style.display = "none";
                    document.body.style.overflow = "auto";

                    if (successMessage) {
                        successMessage.style.display = "flex";
                    }

                }


                // ERROR
                else {

                    alert(result.message);

                }


            } catch (error) {

                console.error(error);

                alert("Server se connection nahi ho raha.");

            }

        });

    }

});