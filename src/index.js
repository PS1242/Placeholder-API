import '../styles/index.css'

/**
 * Get all the DOM elements here
 */
const fnInput = document.getElementById('first-name');
const lnInput = document.getElementById('last-name');
const subscribeCheck = document.getElementById('subscribe-check');
const email = document.getElementById('email');
const emailInput = document.getElementById('email-ctr')
const submitBtn = document.getElementById('submit-btn');
const comments = document.getElementById('comments');
const loader = document.getElementById('loader');
const loaderInfo = document.getElementById('loader-info');

/**
 * Initialize all the states here
 */
let isChecked = false;

/**
 * Function to check whether form can be submitted or not.
 * Submit button will be enabled only when both inputs have non-empty values.
 */
const checkIfCanSubmit = ()=>{

    if(fnInput.value !== '' && lnInput.value != ''){
        submitBtn.disabled = false;
    }
    else{
        submitBtn.disabled = true;
    }
}

const submitForm  = (e)=>{

    //prevent page from reloading
    e.preventDefault();

    const firstName = fnInput.value;
    const lastName = lnInput.value;
    const comment = comments.value;

    const payload = {
        firstName,
        lastName,
        comment,
        isSubscribed: isChecked,
    };

    //include email in the payload if the subscribe checkbox is ticked.
    if(isChecked){
        payload.email = email.value;
    }

    //Display loader until API is finished.
    loader.style.visibility = 'visible';

    //perform POST request
    fetch('https://jsonplaceholder.typicode.com/users' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    })
    .then(()=>{
        //reset form values
        fnInput.value = '';
        lnInput.value = '';
        comments.value = '';
        submitBtn.disabled = true;
        subscribeCheck.checked = false;
        email.value = '';
        emailInput.style.display = 'none';

        //update loader text
        loaderInfo.textContent = 'Submitted';

        //Hide loader
        setTimeout(() => {
            loader.style.visibility = 'hidden';
            loaderInfo.textContent = 'Submitting...'
        }, 1000);
    });
}

/**
 * Subscribe checkbox event listener - the email
 * input will appear only when the checkbox is checked.
 */
subscribeCheck.addEventListener('change' , (e)=>{

    const val = e.target.checked;
    isChecked = val;

    if(isChecked){
        emailInput.style.display = 'block';
    }
    else{
        emailInput.style.display = 'none';
    }

});

/**
 * First name event listener
 */
fnInput.addEventListener('input' , checkIfCanSubmit);

/**
 * Last name event listener
 */
lnInput.addEventListener('input', checkIfCanSubmit);

/**
 * Submit button event listener
 */
submitBtn.addEventListener('click' , submitForm);

