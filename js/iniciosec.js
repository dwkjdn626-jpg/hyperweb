const btnSignIn = document.getElementById("sign-in"),
      btnSignUp = document.getElementById("sign-up"),
      containerFormRegister = document.querySelector(".register"),
      containerFormLogin = document.querySelector(".login");

// Alternar formularios
btnSignIn.addEventListener("click", () => {
    containerFormRegister.classList.add("hide");
    containerFormLogin.classList.remove("hide");
});

btnSignUp.addEventListener("click", () => {
    containerFormLogin.classList.add("hide");
    containerFormRegister.classList.remove("hide");
});

// Validación en vivo y al enviar
document.querySelectorAll("form").forEach(form => {
    let inputs = form.querySelectorAll("input[required]");

    // Validar en tiempo real
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            if (input.value.trim() === "") {
                input.setCustomValidity("⚠ Rellena este campo");
            } else {
                input.setCustomValidity("");
            }
            input.reportValidity(); // Muestra mensaje en vivo
        });
    });

    // Validar al enviar
    form.addEventListener("submit", function(e) {
        let valido = true;
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                input.setCustomValidity("⚠ Rellena este campo");
                valido = false;
            } else {
                input.setCustomValidity("");
            }
        });

        if (!valido) {
            e.preventDefault(); // Bloquea envío
            form.reportValidity(); // Muestra errores
        } else {
            e.preventDefault(); // Evita recargar la página

            // Redirigir según el formulario
            if (form.classList.contains("form-register")) {
                window.location.href = "index.html"; // <- cambia al nombre de tu página de registro
            } else if (form.classList.contains("form-login")) {
                window.location.href = "index.html"; // <- cambia al nombre de tu página de login
            }
        }
    });
});
