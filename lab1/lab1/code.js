const SOffer = document.getElementById("special");
const OfferBtn = document.querySelectorAll(".Btn");
const Text = document.getElementsByTagName("p");
const OrderBtn = document.getElementById("Order");
const menuItems = document.getElementsByClassName("menuitem");
const complaintForm = document.forms.complaintForm; 

OfferBtn.forEach((btn) => {
    btn.addEventListener("mouseover", function () {
      btn.classList.add("highlight");
    });
  
    btn.addEventListener("mouseout", function () {
      btn.classList.remove("highlight");
    });
  });
SOffer.onclick = function () {
    Text[0].innerHTML = "Дякую, що скористалися пропозицією!";
  };

for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener("click", function () {
      if (menuItems[i].classList.contains("selected")) {
        menuItems[i].classList.remove("selected");
      } else {
        menuItems[i].classList.add("selected");
      }
    });
  }
  OrderBtn.onclick = function () {
    Text[1].innerHTML = "Замовлення прийнято";
  };

  complaintForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const name = complaintForm.name.value;
    const email = complaintForm.email.value;
    const complaintText = complaintForm.complaint.value;

    const message = `Дякуємо, ${name}!Ми відповімо вам за адресою ${email} щодо вашої скарги.`;
    Text[2].innerHTML = message;


    complaintForm.reset();
}); 