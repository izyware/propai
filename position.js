
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