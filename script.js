let step = 0;
let userData = {};

function startOnboarding() {
    document.getElementById('welcomeBox').style.display = 'none';
    document.getElementById('container').style.display = 'block';

    document.getElementById('step0').classList.remove('hidden');
    document.getElementById('step0').classList.add('active');


    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.add('hidden');
}

function goBack() {
    if (step > 0) {
        document.getElementById(`step${step}`).classList.add('hidden');
        step--;
        document.getElementById(`step${step}`).classList.remove('hidden');
    } else {

        document.getElementById('container').style.display = 'none';
        document.getElementById('welcomeBox').style.display = 'block';
    }
}

function nextStep() {
    if(step ==0){
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
       
        if (name.trim() === '' || email.trim() === '' ) {
        
            if (name.trim() === '') {
                document.getElementById('name').style.border = '1px solid red';
            }
            if (email.trim() === '') {
                document.getElementById('email').style.border = '1px solid red';
            }
           
            alert('Please fill name and email.');
            return;
        }
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailRegex)) {
            document.getElementById('email').style.border = '1px solid red';
            alert('Please enter a valid email address.');
            return;
        }
    }
    if (step < 3) {
        document.getElementById(`step${step}`).classList.add('hidden');
        step++;
        document.getElementById(`step${step}`).classList.remove('hidden');
    } else {

        saveData();
    }
}

function saveData() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var age = document.getElementById("age").value;

    userData = {
        name: name,
        email: email,
        age: age,
        frequency: document.getElementById('frequency').value,
        MindfulnessTrait: document.getElementById('MindfulnessTrait').value,
        techniques: Array.from(document.getElementById('techniques').selectedOptions).map(option => option.value),
        goals: document.getElementById('goals').value
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    const jsonData = JSON.stringify(userData);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'user_data.json';
    link.click();


    const confirmationBox = document.getElementById('confirmationBox');
    confirmationBox.style.display = 'block';

    step = 0;
    document.getElementById('container').style.display = 'none';
    document.getElementById('welcomeBox').style.display = 'none';
}

function typeEffect() {
    var text = " Be Blissful Yoga";
    var header = document.getElementById("header-text");
    var index = 0;

    function type() {
        if (index < text.length) {
            header.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }

    type();
}

window.onload = typeEffect;