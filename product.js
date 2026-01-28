
const GAME_DATA = {
  yt: {
    name: "Youtube Premium",
    publisher: "Google",
    thumb: "img/yt1.png",
    desc: "Gunakan YouTube Premium untuk pengalaman bebas iklan dengan harga hemat dan murah.",
    note: "* ushakan menggunakan aplikasi yang original dari google play store Tidak mendukung versi mod!",
    nominals: [
      { title: "1 Bulan Head Family plan", price: "Rp 8.000,-", off: "10% OFF" },
      { title: "1 Bulan Family Plan Via Join", price: "Rp 1.000,-", off: "20% OFF" },
      { title: "1 Bulan Individu", price: "Rp 4.000,-", off: "20% OFF" },
    ],
  },

  sp: {
    name: "Spotify Premium",
    publisher: "Spotify AB",
    thumb: "img/sp.png",
    desc: "Gunakan YouTube Premium untuk pengalaman bebas iklan dengan harga hemat dan murah.",
    note: "* ushakan menggunakan aplikasi yang original dari google play store Tidak mendukung versi mod!",
    nominals: [
      { title: "1 Bulan Individu", price: "Rp 10.000,-", off: "5% OFF" },
      { title: "1 Bulan Student", price: "Rp 22.000,-", off: "10% OFF" },
    ],
  },

  cc: {
    name: "Capcut Premium",
    publisher: "ByteDance",
    thumb: "img/cc1.jpeg",
    desc: "Gunakan CapCut Premium untuk pengalaman bebas iklan tanpa watermark dan tools tools lainya.",
    note: "* ushakan menggunakan aplikasi yang original dari google play store Tidak mendukung versi mod!",
    nominals: [
      { title: "7 Hari Individu", price: "Rp 2.000,-" },
      { title: "35 Hari Individu", price: "Rp 8.000,-", off: "10% OFF" },
      { title: "1 Bulan Individu", price: "Rp 6.000-", off: "10% OFF" },
    ],
  },

  am: {
    name: "Alight Motion Pro",
    publisher: "Alight Creative",
    thumb: "img/am1.jpeg",
    desc: "Gunakan Alight Motion Pro untuk pengalaman mengedit yang bebas iklan dan tanpa watermark.",
    note: "* ushakan menggunakan aplikasi yang original dari google play store Tidak mendukung versi mod!",
    nominals: [
      { title: "1 Tahun Full Garansi", price: "Rp 2.000,-" },
      { title: "1 Tahun No Garansi", price: "Rp 1.000,-" },
    ],
  },

    cv: {
    name: "Canva Premium",
    publisher: "Canva Pty Ltd",
    thumb: "img/cv.png",
    desc: "Gunakan Canva Premium untuk pengalaman bebas iklan dan pegunaan tools tools premium dengan harga yang murah.",
    note: "* ushakan menggunakan aplikasi yang original dari google play store Tidak mendukung versi mod!",
    nominals: [
      { title: "1 Bulan Individu", price: "Rp 5.000,-" },
      { title: "1 Bulan Via Join Link", price: "Rp 2.000,-" },
      { title: "1 Bulan Head Family Plan", price: "Rp 8.000,-" },
      { title: "Account Belajar", price: "Rp 14.000,-", off: "10% OFF" },
    ],
  },
};

function getGameKey() {
  const params = new URLSearchParams(window.location.search);
  return params.get("game") || "mlbb";
}

function rupiah(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);
}
const gameKey = getGameKey();
const data = GAME_DATA[gameKey] || GAME_DATA["mlbb"];

document.getElementById("gameName").textContent = data.name;
document.getElementById("publisher").textContent = data.publisher;
document.getElementById("gameThumb").src = data.thumb;
document.getElementById("gameDesc").textContent = data.desc;
document.getElementById("gameNote").textContent = data.note;

const nominalGrid = document.getElementById("nominalGrid");

nominalGrid.innerHTML = data.nominals
  .map((item, i) => {
    return `
      <button 
        class="nominal-card ${i === 0 ? "active" : ""}" 
        type="button"
        data-title="${item.title}"
        data-price="${item.price}">
        <span class="check-badge">✓</span>
        <div class="nominal-title">${item.title}</div>
        <div class="nominal-price">
          <span>${item.price}</span>
        </div>
        ${item.off ? `<span class="off">${item.off}</span>` : ``}
      </button>
    `;
  })
  .join("");

const nominalCards = document.querySelectorAll(".nominal-card");

const firstNominal = document.querySelector(".nominal-card.active");
if (firstNominal) {
  window.selectedNominal = {
    title: firstNominal.dataset.title,
    price: parseInt(firstNominal.dataset.price.replace(/\D/g, "")),
  };
  document.getElementById("qrisPrice").innerText = firstNominal.dataset.price;
}

nominalCards.forEach((btn) => {
  btn.addEventListener("click", () => {
    nominalCards.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    window.selectedNominal = {
      title: btn.dataset.title,
      price: parseInt(btn.dataset.price.replace(/\D/g, "")),
    };

    document.getElementById("qrisPrice").innerText = btn.dataset.price;

    updateConfirmButton();
  });
});

let selectedPayment = null;

const payHeads = document.querySelectorAll(".pay-head");
const payItems = document.querySelectorAll(".pay-item");

payHeads.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.closest(".pay-item");
    const isActive = parent.classList.contains("active");

    payItems.forEach((item) => {
      item.classList.remove("active");
      item.classList.remove("selected");
    });

    if (!isActive) {
      parent.classList.add("active");
      parent.classList.add("selected");
      selectedPayment = btn.dataset.pay;
    } else {
      selectedPayment = null;
    }

    updateConfirmButton();
  });
});

const confirmBuyBtn = document.getElementById("confirmBuyBtn");
const orderModal = document.getElementById("orderModal");
const cancelOrderBtn = document.getElementById("cancelOrderBtn");
const payNowBtn = document.getElementById("payNowBtn");

function scrollToNominal() {
  const panel2 = document.querySelector(".panel:nth-of-type(2)");
  if (panel2) panel2.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateConfirmButton() {
  if (window.selectedNominal && selectedPayment) {
    confirmBuyBtn.classList.add("active");
    confirmBuyBtn.disabled = false;
  } else {
    confirmBuyBtn.classList.remove("active");
    confirmBuyBtn.disabled = true;
  }
}

confirmBuyBtn.addEventListener("click", () => {
  if (!window.selectedNominal) {
    alert("Pilih nominal top up dulu!");
    scrollToNominal();
    return;
  }

  if (!selectedPayment) {
    alert("Pilih metode pembayaran dulu!");
    return;
  }

  const userId = document.getElementById("userIdInput")?.value || "-";
  const wa = document.getElementById("waInput")?.value || "-";

  document.getElementById("modalUserId").innerText = userId;
  document.getElementById("modalWa").innerText = wa;
  document.getElementById("modalItem").innerText = window.selectedNominal.title;
  document.getElementById("modalPrice").innerText = rupiah(window.selectedNominal.price);
  document.getElementById("modalTotal").innerText = rupiah(window.selectedNominal.price);

  const payText =
    selectedPayment === "qris"
      ? "QRIS Untuk Semua Pembayaran"
      : selectedPayment === "ewallet"
      ? "E-Wallet"
      : selectedPayment === "cstore"
      ? "Convenience Store"
      : selectedPayment === "va"
      ? "Virtual Account"
      : selectedPayment;

  document.getElementById("modalPay").innerText = payText;

  orderModal.style.display = "flex";
});

cancelOrderBtn.addEventListener("click", () => {
  orderModal.style.display = "none";
});

payNowBtn.addEventListener("click", async () => {
  try {
    payNowBtn.disabled = true;
    payNowBtn.innerText = "Memproses...";

    if (selectedPayment !== "qris") {
      window.location.href = "https://lynk.id/";
      return;
    }

payNowBtn.addEventListener("click", () => {
  const order_id = "INV" + Date.now();
  const amount = window.selectedNominal.price;

  const gameName = document.getElementById("gameName").innerText;
  const itemName = window.selectedNominal.title;
  const userId = document.getElementById("userIdInput").value || "-";
  const wa = document.getElementById("waInput").value || "-";

  window.location.href =
    `pesanan.html?order_id=${encodeURIComponent(order_id)}` +
    `&amount=${encodeURIComponent(amount)}` +
    `&game=${encodeURIComponent(gameName)}` +
    `&item=${encodeURIComponent(itemName)}` +
    `&userId=${encodeURIComponent(userId)}` +
    `&wa=${encodeURIComponent(wa)}`;
});


  } catch (err) {
    alert("Error: " + err.message);
  } finally {
    payNowBtn.disabled = false;
    payNowBtn.innerText = "Beli Sekarang →";
  }
});

updateConfirmButton();

const TELEGRAM_LINK = "https://t.me/aspanoffc";
let alreadyRedirected = false;

function showSuccessAndRedirect() {
  if (alreadyRedirected) return;
  alreadyRedirected = true;

  const pop = document.getElementById("paySuccess");
  if (pop) pop.style.display = "flex";

  setTimeout(() => {
    window.location.href = TELEGRAM_LINK;
  }, 1600);
}

async function checkPaymentStatus(order_id) {
  try {
    const res = await fetch(`${BACKEND_URL}/status/${order_id}`);
    const data = await res.json();

    console.log("STATUS DARI BACKEND:", data);

    const status = String(data.status || "").toLowerCase();

    if (["completed", "success", "done", "paid", "settled"].includes(status)) {
      showSuccessAndRedirect();
    }
  } catch (err) {
    console.log("Gagal cek status:", err);
  }
}

function startAutoCheck(order_id) {
  setInterval(() => {
    checkPaymentStatus(order_id);
  }, 3000);
}

const params = getParams();
if (params.order_id) {
  startAutoCheck(params.order_id);
}
