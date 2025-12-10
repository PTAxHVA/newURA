document.addEventListener("DOMContentLoaded", function () {
  const breadcrumbContainer = document.getElementById("breadcrumbs-container");
  if (!breadcrumbContainer) return;

  const arrowIcon = `<svg class="crumb-separator" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"/></svg>`;

  let pathArray = window.location.pathname
    .split("/")
    .filter((item) => item !== "");

  // Logic loại bỏ file trùng tên folder (ví dụ: PEOPLE/people.html)
  if (pathArray.length >= 2) {
    const lastItem = pathArray[pathArray.length - 1].toLowerCase();
    const folderName = pathArray[pathArray.length - 2].toLowerCase();

    if (lastItem.replace(".html", "") === folderName) {
      pathArray.pop();
    }
  }

  if (
    pathArray.length > 0 &&
    pathArray[pathArray.length - 1] === "index.html"
  ) {
    pathArray.pop();
  }

  let breadcrumbsHTML = `<a href="/">Home</a>`;
  let currentPath = "";

  pathArray.forEach((part, index) => {
    currentPath += `/${part}`;

    // [SỬA LẠI ĐOẠN NÀY]
    // 1. Chuyển tên folder/file gốc thành chữ thường hết (PEOPLE -> people)
    let lowerName = part.replace(".html", "").replace(/-/g, " ").toLowerCase();

    // 2. Viết hoa chữ cái đầu (people -> People)
    let displayName = lowerName.charAt(0).toUpperCase() + lowerName.slice(1);

    breadcrumbsHTML += arrowIcon;

    if (index === pathArray.length - 1) {
      breadcrumbsHTML += `<span class="current">${displayName}</span>`;
    } else {
      // Logic fix link folder
      let folderLink = currentPath;
      if (["blogs", "people"].includes(displayName.toLowerCase())) {
        folderLink = `${currentPath}/${displayName.toLowerCase()}.html`;
      }
      breadcrumbsHTML += `<a href="${folderLink}">${displayName}</a>`;
    }
  });

  breadcrumbContainer.innerHTML = breadcrumbsHTML;
});
