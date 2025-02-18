console.log("Products frontend javascript file");

// $(function () {
//   $(".product-collection").on("change", () => {
//     const selectedValue = $(".product-collection").val();

//     if (selectedValue === "DRINK") {
//       $("#product-volume").show();
//       $("#product-collection").hide();
//     } else {
//       $("#product-collection").show();
//       $("#product-volume").hide();
//     }
//   });

//   $(
//     $("#process-btn").on("click", () => {
//       $(".dish-container").slideToggle(500);
//       $("#process-btn").css("display", "none");
//     })
//   );

//   $(
//     $("#cancel-btn").on("click", () => {
//       $(".dish-container").slideToggle(100);
//       //   $("#process-btn").show();
//       $("#process-btn").css("display", "flex");
//     })
//   );

// $(".new-product-status").on("change", async function (eve) {
//     const id = eve.target.id;
//     // console.log($(this).attr("id"));

//     const productStatus = $(`#${id}.new-product-status`).val();

//     try {
//       const response = await axios.post(`/admin/product/${id}`, {
//         productStatus: productStatus,
//       });

//       const result = response.data;

//       if (result.data) {
//         $(".new-product-status").blur();
//       } else {
//         alert("Product status update failed");
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Product update failed");
//     }
//   });

// });
$(function () {
  $(".product-collection").on("change", function () {
    const isDrink = $(this).val() === "DRINK";
    $("#product-volume").toggle(isDrink);
    $("#product-collection").toggle(!isDrink);
  });

  $("#process-btn").on("click", function () {
    $(".dish-container").slideToggle(500);
    $(this).hide();
  });

  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(100);
    $("#process-btn").css("display", "flex");
  });

  $(".new-product-status").on("change", async function () {
    const id = this.id;
    const productStatus = $(this).val();

    try {
      const { data } = await axios.post(`/admin/product/${id}`, {
        productStatus: productStatus,
      });

      if (data?.data) {
        $(this).blur();
      } else {
        alert("Product status update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Product update failed");
    }
  });
});

// function validateForm() {
//   console.log("Validating form");
//   const productName = $(".product-name").val();
//   const productStatus = $(".product-status").val();
//   const productPrice = $(".product-price").val();
//   const productLeftCount = $(".product-left-count").val();
//   const productCollection = $(".product-collection").val();
//   const productDesc = $(".product-desc").val();

//   if (
//     productName === "" ||
//     productStatus === "" ||
//     productPrice === "" ||
//     productLeftCount === "" ||
//     productCollection === "" ||
//     productDesc === ""
//   ) {
//     alert("Please fill all the required fields");
//     return false;
//   }
//   return true;
// }

function validateForm() {
  console.log("Validating form");

  const requiredFields = [
    ".product-name",
    ".product-status",
    ".product-price",
    ".product-left-count",
    ".product-collection",
    ".product-desc",
  ];

  for (const selector of requiredFields) {
    if (!$(selector).val()) {
      alert("Please fill all the required fields.");
      return false;
    }
  }

  return true;
}

// function previewFileHandler(input, order) {
//   const imgClassName = input.className;
//   const file = $(`.${imgClassName}`).get(0).files[0];

//   const fileType = file["type"];
//   const validImageType = ["image/jpg", "image/jpeg", "image/png"];

//   if (!validImageType.includes(fileType)) {
//     alert("Please insert only jpeg, jpg and png!");
//     return;
//   } else {
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = function () {
//         $(`#image-section-${order}`).attr("src", reader.result).addClass(order);
//       };
//       reader.readAsDataURL(file);
//     }
//   }
// }
function previewFileHandler(input, order) {
  const file = input.files[0];
  const validImageType = ["image/jpg", "image/jpeg", "image/png"];

  if (!file || !validImageType.includes(file.type)) {
    alert("Please insert only jpeg, jpg and png!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    $(`#image-section-${order}`).attr("src", reader.result).addClass(order);
  };
  reader.readAsDataURL(file);
}
