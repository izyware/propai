var config = {};
const currentView = {
  sheet: '',
  branch1: '',
  branch2: ''
}
const userSettings = {};

function switchViews(changes) {
  if (changes) {
    for(p in changes) {
      currentView[p] = changes[p];
    }
  }
  document.getElementById('branch1Image').src=`${config.storePath}/${currentView.branch1}/images/${currentView.sheet}.diff.png`;
  document.getElementById('branch2Image').src=`${config.storePath}/${currentView.branch2}/images/${currentView.sheet}.diff.png`;
  dotsModule.switchViews();
  applyUserSettings();
}

function applyUserSettings() {
  console.log('[applyUserSettings]');
  const userSettings = getUserSettings();
  positionModule.applyUserSettings(userSettings);
  dotsModule.applyUserSettings(userSettings);
}

const positionModule = {};
positionModule.applyUserSettings = function(userSettings) {
  for(let key in userSettings) {
    value = userSettings[key];
    switch(key) {
      case 'top':
      case 'left':
        const element = document.getElementById('branch2Image');
        element.style[key] = value + 'px';
        break;
    }
  }
}

function getUserSetting(key) {
  const path = `${currentView.sheet}/${currentView.branch1}/${currentView.branch2}/${key}`;
  return userSettings[path];
}

function setUserSetting(key, value) {
  const path = `${currentView.sheet}/${currentView.branch1}/${currentView.branch2}/${key}`;
  console.log('[setUserSetting]', { path, value });
  userSettings[path] = value;
}

function incrementUserSetting(key, value) {
  if (!value) value = 1;
  const path = `${currentView.sheet}/${currentView.branch1}/${currentView.branch2}/${key}`;
  if (!userSettings[path]) userSettings[path] = 0;
  userSettings[path] += value;
  return userSettings[path];
}

function getUserSettings() {
  const ret = {};
  const path = `${currentView.sheet}/${currentView.branch1}/${currentView.branch2}/`;
  for(let p in userSettings) {
    if (p.indexOf(path) == 0) {
      ret[p.substr(path.length)] = userSettings[p];
    }
  }
  return ret;
}

function toggle(str) {
  var element = document.getElementById(str);
  element.style.visibility = element.style.visibility == 'hidden' ? 'visible' : 'hidden';
}

function saveSettings() {
  navigator.clipboard.writeText(JSON.stringify(userSettings, null, 2))
  .then(() => alert('saved to clip board'))
  .catch(err => alert(err));
}

document.onkeydown = function(event) {
  var element = document.getElementById('branch2Image');
  var delta = { top: 0, left: 0 };
  const left = parseInt(window.getComputedStyle(element).left, 10) || 0;
  const top = parseInt(window.getComputedStyle(element).top, 10) || 0;
  switch (event.keyCode) {
    case 80:
      toggle('branch2Image');
      break;
    case 79:
      toggle('branch1Image');
      break;
    case 37:
      delta.left = -1;
      break;
    case 38:
      delta.top = -1;
    break;
    case 39:
      delta.left = 1;
      break;
    case 40:
      delta.top = 1;
      break;
  }
  incrementUserSetting('left', delta.left);
  incrementUserSetting('top', delta.top);

  element.style.left = (left + delta.left) + 'px';
  element.style.top = (top + delta.top) + 'px';
};

function addOption(id, option) {
  const select = document.getElementById(id);
  const newOption = document.createElement('option');
  newOption.value = option;
  newOption.textContent = option;
  select.appendChild(newOption);
  if (select.children.length == 1) currentView[id.replace('Select', '')] = option;
}

function initSelection() {
  config.sheets.forEach(item => addOption('sheetSelect', item));
  config.branches.forEach(item => addOption('branch1Select', item));
  config.branches.forEach(item => addOption('branch2Select', item));
  document.getElementById('sheetSelect').addEventListener('change', function() { switchViews({ sheet: this.value })});
  document.getElementById('branch1Select').addEventListener('change', function() { switchViews({ branch1: this.value })});
  document.getElementById('branch2Select').addEventListener('change', function() {  switchViews({ branch2: this.value })});
}

function loadSettings() {
  loadScript(`${config.storePath}/userSettings.js`);
}

function loadScript(path) {
  console.log('[loadScript]', path);  
  const script = document.createElement('script');
  script.src = path;
  script.async = true; // Optional: Load the script asynchronously
  document.body.appendChild(script);
}

function onSettingsLoadedCallback(settings) {
  console.log('[onSettingsLoadedCallback]', settings);
  for(let p in settings) {
    userSettings[p] = settings[p];
  }
  applyUserSettings();
  switchViews();
}

function onConfigLoadedCallback(cfg) {
  config = cfg;
  start();
}

function start() {
  initSelection();
  loadSettings();
}

let configPath = null;
try {
  configPath = window.location.href.split('?')[1];
} catch(e) {
}
if (!configPath) {
  alert('specify id by ?');
} else {
  configPath = `../../../../../izyware/izy-idman-tools/id/${configPath}/config.js`;
  loadScript(configPath);
}
