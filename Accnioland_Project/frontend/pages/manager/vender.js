// const API = "http://localhost:5000";
let editingVendorId = null;

/* ================= LOAD VENDORS ================= */

async function loadVendors() {
  const res = await fetch(API + "/api/vendors");
  const data = await res.json();
  renderVendorList(data);
}

/* ================= OPEN MAIN MODAL ================= */

window.openVendorModal = function () {
  document.getElementById("vendorModal").classList.add("show");
  document.body.classList.add("modal-open");
  loadVendors();
};

window.closeVendorModal = function () {
  document.getElementById("vendorModal").classList.remove("show");
  document.body.classList.remove("modal-open");
};

/* ================= RENDER LIST ================= */

function renderVendorList(list) {
  const container = document.getElementById("vendorListContainer");
  container.innerHTML = "";

  if (!list.length) {
    container.innerHTML = `<div class="text-muted fw-semibold">No Vendors Found</div>`;
    return;
  }

  list.forEach(v => {
    const div = document.createElement("div");
    div.className = "vendor-card";

    div.innerHTML = `
      <div style="display:flex; justify-content:space-between;">
        <div>
          <div class="vendor-name">${v.name}</div>
          <div class="vendor-service">${v.service}</div>
          <div class="vendor-info">
            📞 ${v.phone}<br>
            ✉ ${v.email}<br>
            ⭐ Rating: ${v.rating}/5
          </div>
        </div>

        <div class="d-flex gap-2">
          <i class="bi bi-pencil-square text-primary"
             style="cursor:pointer"
             onclick="openVendorForm('${v._id}')"></i>

          <i class="bi bi-trash-fill text-danger"
             style="cursor:pointer"
             onclick="deleteVendor('${v._id}')"></i>
        </div>
      </div>
    `;

    container.appendChild(div);
  });
}

/* ================= OPEN FORM ================= */

window.openVendorForm = async function(id = null) {

  editingVendorId = id;

  document.getElementById("vendorFormModal").classList.add("show");

  if (id) {
    const res = await fetch(API + "/api/vendors");
    const vendors = await res.json();
    const vendor = vendors.find(v => v._id === id);

    document.getElementById("vendorFormTitle").innerText = "Edit Vendor";

    document.getElementById("vendorName").value = vendor.name;
    document.getElementById("vendorService").value = vendor.service;
    document.getElementById("vendorPhone").value = vendor.phone;
    document.getElementById("vendorEmail").value = vendor.email;
    document.getElementById("vendorRating").value = vendor.rating;

  } else {
    document.getElementById("vendorFormTitle").innerText = "Add Vendor";
    clearVendorForm();
  }
};

window.closeVendorForm = function(){
  document.getElementById("vendorFormModal").classList.remove("show");
  clearVendorForm();
};

function clearVendorForm(){
  document.getElementById("vendorName").value = "";
  document.getElementById("vendorService").value = "";
  document.getElementById("vendorPhone").value = "";
  document.getElementById("vendorEmail").value = "";
  document.getElementById("vendorRating").value = "";
  editingVendorId = null;
}

/* ================= SAVE ================= */

window.saveVendor = async function(){

  const data = {
    name: document.getElementById("vendorName").value,
    service: document.getElementById("vendorService").value,
    phone: document.getElementById("vendorPhone").value,
    email: document.getElementById("vendorEmail").value,
    rating: document.getElementById("vendorRating").value
  };

  if(editingVendorId){
    await fetch(API + "/api/vendors/" + editingVendorId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  } else {
    await fetch(API + "/api/vendors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }

  closeVendorForm();
  loadVendors();
};

/* ================= DELETE ================= */

window.deleteVendor = async function(id){

  const ok = confirm("Delete this vendor?");
  if(!ok) return;

  await fetch(API + "/api/vendors/" + id, {
    method: "DELETE"
  });

  loadVendors();
};