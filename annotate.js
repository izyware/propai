
var dotSize = 20;
const dotPrefix = 'dot-';
document.body.addEventListener('click', function(event) {
  if (event.clientY > 500) return;
  var dotCounter = incrementUserSetting('dotCounter', 1);
  setUserSetting(`${dotPrefix}${dotCounter}`, {
    left: (event.clientX - dotSize / 2 ),
    top: (event.clientY - dotSize / 2 )
  });
  dotsModule.applyUserSettings(getUserSettings());
});

const dotsModule = {};

dotsModule.switchViews = function() {
  let el = null;
  do {
    el = document.getElementsByClassName('dot')[0];
    if (el) el.parentNode.removeChild(el);
  } while(el);
  setUserSetting('dotCounter', 0);
  setUserSetting('feedback', document.getElementById('feedback').value);
}

dotsModule.applyUserSettings = function(userSettings, deleteFirst) {
  for(let p in userSettings) {
    if (p == 'feedback') {
      document.getElementById('feedback').value = userSettings[p];
      continue;
    }
    if (p.indexOf(dotPrefix) != 0) continue;
    value = userSettings[p];
    updateDot(p, value);
  }
}

function updateDot(p, value) {
  console.log(`[updateDot] ${p}`, value);
  if (document.getElementById(p)) {
    console.log('exits');
    return;
  };

  // Create a new dot element
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.id = p;
  dot.style.left = value.left + 'px';
  dot.style.top = value.top +  'px';
  dot.innerHTML = p.replace(dotPrefix, '');
  document.body.appendChild(dot);
};