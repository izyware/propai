var config = {};
const userSettings = {};

const globalModule = {};
globalModule.currentView = {
  sheet: '',
  branch1: '',
  branch2: ''
}
globalModule.applyUserSettings = function(userSettings) {
  console.log('[global]', userSettings);
  for(let p in userSettings) {
    globalModule[p] = userSettings[p];
  }
  for(let p in globalModule.currentView) {
    document.getElementById(p + 'Select').value = globalModule.currentView[p];
  }
}

function switchViews(changes) {
  if (changes) {
    for(p in changes) {
      globalModule.currentView[p] = changes[p];
    }
  }

  document.getElementById('branch1Image').src=`${config.storePath}/${globalModule.currentView.branch1}/images/${globalModule.currentView.sheet}.png`;
  document.getElementById('branch2Image').src=`${config.storePath}/${globalModule.currentView.branch2}/images/${globalModule.currentView.sheet}.png`;
  dotsModule.switchViews();
  applyUserSettings();
}

function toggle(str) {
  var element = document.getElementById(str);
  element.style.visibility = element.style.visibility == 'hidden' ? 'visible' : 'hidden';
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
  if (select.children.length == 1) globalModule.currentView[id.replace('Select', '')] = option;
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
