console.log("Users frontend javascript file");

// $(function () {
//   $(".member-status").on("change", function (e) {
//     console.log("Inside FE userStatus update");
//     const id = e.target.id;
//     const memberStatus = $(`#${id}.member-status`).val();

//     axios
//       .post("/admin/user/edit", {
//         _id: id,
//         memberStatus: memberStatus,
//       })
//       .then((response) => {
//         const result = response.data;

//         if (result.data) {
//           console.log("User updated successfully");
//           $(".member-status").blur();
//         } else {
//           alert("User status update failed");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         alert("User update failed");
//       });
//   });
// });

$(function () {
  $(".member-status").on("change", function () {
    console.log("Inside FE userStatus update");
    const memberStatus = this.value,
      id = this.id;

    axios
      .post("/admin/user/edit", {
        _id: id,
        memberStatus: memberStatus,
      })
      .then((response) => {
        if (response?.data?.data) {
          console.log("User updated successfully");
          $(this).blur();
        } else {
          alert("User status update failed");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("User update failed");
      });
  });
});
