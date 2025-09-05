function normalize(str){
    return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}


function checkPalindrome(raw){
const cleaned = normalize(raw);
const reversed = [...cleaned].reverse().join("");
const isPal = cleaned.length > 0 && cleaned === reversed;
return { isPal, cleaned, reversed };
}


const $ = (sel) => document.querySelector(sel);
const input = $('#text');
const checkBtn = $('#checkBtn');
const clearBtn = $('#clearBtn');
const result = $('#result');
const badge = $('#badge');
const statusText = $('#statusText');
const statusPill = $('#statusPill');
const cleanedEl = $('#cleaned');
const reversedEl = $('#reversed');
const history = $('#history');
const historyList = $('#historyList');


function render({isPal, cleaned, reversed}, raw){
result.hidden = false;
badge.className = 'badge ' + (isPal ? 'ok' : 'no');
statusPill.className = 'pill ' + (isPal ? 'ok' : 'no');
statusText.textContent = isPal ? 'Palindrome' : 'Not a palindrome';
cleanedEl.textContent = cleaned || '—';
reversedEl.textContent = reversed || '—';


if(raw.trim()){
history.hidden = false;
const li = document.createElement('li');
li.textContent = raw + ' → ' + (isPal ? '✔️' : '✖️');
historyList.prepend(li);
while(historyList.children.length > 6){ historyList.lastElementChild.remove(); }
}
}


function handleCheck(){
const raw = input.value;
const res = checkPalindrome(raw);
render(res, raw);
}


checkBtn.addEventListener('click', handleCheck);
input.addEventListener('keyup', (e)=>{
if(e.key === 'Enter') handleCheck();
});
clearBtn.addEventListener('click', ()=>{
input.value=''; result.hidden = true; input.focus();
});


// Demo example
input.value = 'A man, a plan, a canal: Panama!';
handleCheck();