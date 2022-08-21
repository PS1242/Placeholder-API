import '../styles/index.css'
import $ from 'jquery';

/**
 * Initialize all the states here
 */
let isChecked = false;

$(function () {

    $('#subscribe-check').on('change', toggleEmailInput);
    $('#first-name').on('input', checkIfCanSubmit);
    $('#last-name').on('input', checkIfCanSubmit);
    $('#submit-btn').on('click', submitForm);

    function toggleEmailInput(e) {

        isChecked = e.target.checked;
        if (isChecked)
            $('#email-ctr').css('display', 'block')
        else
            $('#email-ctr').css('display', 'none')
    }

    /**
     * Function to check whether form can be submitted or not.
     * Submit button will be enabled only when both inputs have non-empty values.
     */
    function checkIfCanSubmit() {

        if ($('#first-name').val() !== '' && $('#last-name').val() !== '')
            $('#submit-btn').prop('disabled', false);
        else
            $('#submit-btn').prop('disabled', true);
    }

    function resetForm() {

        $('#first-name').val('');
        $('#last-name').val('');
        $('#comments').val('');
        $('#email').val('');
        $('#submit-btn').prop('disabled', true);
        $('#subscribe-check').prop('checked', false);
        $('#email-ctr').css('display', 'none');
    }


    function submitForm(e) {

        e.preventDefault();

        const firstName = $('#first-name').val();
        const lastName = $('#last-name').val();
        const comment = $('#comments').val();

        const payload = {
            firstName,
            lastName,
            comment,
            isSubscribed: isChecked,
        };

        if (isChecked) {
            payload.email = $('#email').val();
        }

        //display loader while API awaits response
        $('#loader').css('visibility', 'visible');

        $.ajax({
            type: 'POST',
            url: 'https://jsonplaceholder.typicdode.com/users',
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: 'application/json',

        }).always((data) => {

            resetForm();
        }).done((data) => {

            console.log(data);
            $('#loader-info').text('Submitted');
            setTimeout(() => {
                $('#loader').css('visibility', 'hidden');
                $('#loader-info').text('Submitting...');
            }, 1000);
        }).fail((xhr, textStatus) => {

            $('#loader-info').text(`${textStatus}!`);
            $('#loader-info').css('color', 'red');
            setTimeout(() => {
                $('#loader').css('visibility', 'hidden');
                $('#loader-info').text('Submitting...');
            }, 2000);
            throw new Error(textStatus)
        })
    }
});


