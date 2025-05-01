document.getElementById("menuIcon").addEventListener("click", () => {
  document.getElementById("sideMenu").classList.toggle("open");
});

document.addEventListener("click", function (e) {
  const menu = document.getElementById("sideMenu");
  const menuIcon = document.getElementById("menuIcon");

  if (
    !menu.contains(e.target) &&
    !menuIcon.contains(e.target) &&
    menu.classList.contains("open")
  ) {
    menu.classList.remove("open");
  }
});

document.getElementById("closeMenu").addEventListener("click", function () {
  document.getElementById("sideMenu").classList.remove("open");
});

function toggleForm() {
  const form = document.getElementById("suggest-form");
  form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
}

function login() {
  const username = prompt("Kullanıcı adınızı girin:");
  if (username) {
    document.getElementById("authSection").style.display = "none";
    document.getElementById("userSection").style.display = "flex";
    document.getElementById("usernameDisplay").textContent = username;
  }
}

function register() {
  alert("Kayıt sistemi henüz aktif değil.");
}

function showDetail(title, reason, image) {
  document.getElementById("detailTitle").textContent = title;
  document.getElementById("detailReason").textContent = reason;
  const imageEl = document.getElementById("detailImage");

  if (image) {
    imageEl.src = image;
    imageEl.style.display = "block";
  } else {
    imageEl.style.display = "none";
  }

  document.getElementById("detailOverlay").style.display = "flex";
}

document.getElementById("closeDetail").addEventListener("click", () => {
  document.getElementById("detailOverlay").style.display = "none";
});

function createBrandCard(name, reason, imageUrl) {
  const newBrand = document.createElement("div");
  newBrand.classList.add("brand");
  if (imageUrl) newBrand.style.backgroundImage = `url('${imageUrl}')`;
  newBrand.innerHTML = `<h3>${name}</h3><p>Nedeni: ${reason}</p>`;

  newBrand.addEventListener("click", function () {
    showDetail(name, reason, imageUrl);
  });

  document.getElementById("brand-list").appendChild(newBrand);
}

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("brandName").value.trim();
  const reason = document.getElementById("reason").value.trim();
  const imageInput = document.getElementById("imageUpload");
  const imageFile = imageInput.files[0];

  if (name && reason) {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (event) {
        createBrandCard(name, reason, event.target.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      createBrandCard(name, reason, null);
    }

    document.getElementById("brandName").value = "";
    document.getElementById("reason").value = "";
    imageInput.value = "";
  }
});

document.getElementById("searchInput").addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  const brands = document.querySelectorAll("#brand-list .brand");







  brands.forEach((brand) => {
    const text = brand.textContent.toLowerCase();
    brand.style.display = text.includes(filter) ? "block" : "none";
  });
});