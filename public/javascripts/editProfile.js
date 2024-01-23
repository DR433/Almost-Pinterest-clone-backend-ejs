const editProfileForm = document.querySelector('#profile_img_form');
const uploadInput = document.querySelector('#uploadprofileimage');
const editIcon = document.querySelector('#edit_profile_img');

editIcon.addEventListener('click', (e) => {
    uploadInput.click();
})

uploadInput.addEventListener('change', (e) => {
    editProfileForm.submit();
})