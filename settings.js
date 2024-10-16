function setGlobalSetting(key, value) {
  const path = `global/${key}`;
  console.log('[setGlobalSetting]', { path, value });
  userSettings[path] = value;
}

function getGlobalSettings() {
  const ret = {};
  const path = `global/`;
  for(let p in userSettings) {
    if (p.indexOf(path) == 0) {
      ret[p.substr(path.length)] = userSettings[p];
    }
  }
  return ret;
}

function applyUserSettings() {
  console.log('[applyUserSettings]');
  globalModule.applyUserSettings(getGlobalSettings());

  const userSettings = getUserSettings();
  positionModule.applyUserSettings(userSettings);
  dotsModule.applyUserSettings(userSettings);
}

function getUserSetting(key) {
  const path = `${globalModule.currentView.sheet}/${globalModule.currentView.branch1}/${globalModule.currentView.branch2}/${key}`;
  return userSettings[path];
}

function setUserSetting(key, value) {
  const path = `${globalModule.currentView.sheet}/${globalModule.currentView.branch1}/${globalModule.currentView.branch2}/${key}`;
  console.log('[setUserSetting]', { path, value });
  userSettings[path] = value;
}

function incrementUserSetting(key, value) {
  if (!value) value = 1;
  const path = `${globalModule.currentView.sheet}/${globalModule.currentView.branch1}/${globalModule.currentView.branch2}/${key}`;
  if (!userSettings[path]) userSettings[path] = 0;
  userSettings[path] += value;
  return userSettings[path];
}

function getUserSettings() {
  const ret = {};
  const path = `${globalModule.currentView.sheet}/${globalModule.currentView.branch1}/${globalModule.currentView.branch2}/`;
  for(let p in userSettings) {
    if (p.indexOf(path) == 0) {
      ret[p.substr(path.length)] = userSettings[p];
    }
  }
  return ret;
}

function saveSettings() {
  navigator.clipboard.writeText(JSON.stringify(userSettings, null, 2))
  .then(() => alert('saved to clip board'))
  .catch(err => alert(err));
}