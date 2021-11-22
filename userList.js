const tbody = document.getElementById("tbodyUserList");
const ul = document.querySelector(".pagination");
const pages = document.querySelectorAll(".pagesLi");







// Events
window.onload = () => {
    getApiUserList(page = 1);
}

ul.addEventListener("click", changePage);




// Functions


function changePage(e) {
    if (e.target.classList.contains("pages")) {
        getApiUserList(e.target.innerText);

        pages.forEach(li => {
            if (e.target.parentElement.innerText == li.firstElementChild.innerText) {
                e.target.parentElement.classList.add("active");
            } else {
                li.classList.remove("active")

            }
        })
    }
}

const getApiUserList = async (pageNo) => {
    tbody.innerHTML = "";
    showLoading();

    const responseData = await axios.get(`https://reqres.in/api/users?page=${pageNo}`);
    console.log(responseData)

    console.log(responseData.data.data);
    if (responseData.data.data[0].id == undefined) {
        alert("userlist not found!");
        removeLoading();
    } else {
        for (let i = 0; i < responseData.data.data.length; i++) {
            tbody.innerHTML += ` <tr>
            <td>
            <img src="${responseData.data.data[i].avatar}"/>
            </td>
            <td>
            ${responseData.data.data[i].id}
            </td>
            <td>
            ${responseData.data.data[i].email}
            </td>
            <td>
            ${responseData.data.data[i].first_name}
            </td>
            <td>
            ${responseData.data.data[i].last_name}
            </td>
     </tr>`;
            removeLoading()
        }
    }
}