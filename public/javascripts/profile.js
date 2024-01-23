const editProfileImg = document.querySelector('.edit_profile_img');
const uploadProfileImage = document.querySelector('#uploadprofileimage');
const uploadImageForm = document.querySelector('#profile_img_form');
editProfileImg.addEventListener('click', (e) => {
    uploadProfileImage.click();
})
uploadProfileImage.addEventListener('change', (e) => {
    uploadImageForm.submit();
})
