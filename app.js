const tbody = document.getElementById("tbody");
const count = document.getElementById("count");
const search = document.getElementById("q");

const raw = window.RAW_PRODUCTS || [];

/* 🔧 Hàm đọc dữ liệu an toàn (fix undefined) */
function normalize(p) {
  return {
    id: p.id ?? "",
    title: p["Tiêu đề"] ?? p["tiêu đề"] ?? p.title ?? "—",
    slug: p.slug ?? p["sên"] ?? p["ốc sên"] ?? "—",
    price: p["Giá"] ?? p.price ?? "—",
    description:
      p["Mô tả"] ??
      p["mô tả"] ??
      p["Mô tả sản phẩm"] ??
      "—",
    category:
      p.loại?.Tên ??
      p.loại?.tên ??
      p.loại?.slug ??
      "—",
    image:
      Array.isArray(p["hình ảnh"]) && p["hình ảnh"].length > 0
        ? p["hình ảnh"][0]
        : ""
  };
}

const products = raw.map(normalize);

function render(list) {
  tbody.innerHTML = list.map(p => `
    <tr>
      <td><span class="badge">${p.id}</span></td>

      <td>
        <div><b>${p.title}</b></div>
        <div class="muted">${p.slug}</div>
      </td>

      <td class="col-slug">${p.slug}</td>

      <td class="money">$${p.price}</td>

      <td class="desc col-desc">${p.description}</td>

      <td class="cat col-cat">${p.category}</td>

      <td>
        ${
          p.image
            ? `<img class="thumb" src="${p.image}" alt="img">`
            : `<span class="muted">No image</span>`
        }
      </td>
    </tr>
  `).join("");

  count.textContent = `Tổng: ${list.length}`;
}

render(products);

/* 🔍 Search */
search.addEventListener("input", () => {
  const key = search.value.toLowerCase();

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(key) ||
    p.slug.toLowerCase().includes(key) ||
    p.category.toLowerCase().includes(key)
  );

  render(filtered);
});
