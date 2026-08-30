// AllStoryKor web resource routing.
(function() {
    'use strict';
    var NEoul = 'https://neoul-sok-ai.vercel.app/';
    var ALLSTORY_RAW = 'https://raw.githubusercontent.com/mindslash79/allstorykor/main/';

    if (window.PluginManager) PluginManager._path = NEoul + 'js/plugins/';
    if (window.AudioManager) AudioManager._path = NEoul + 'audio/';

    if (window.ImageManager) {
        ImageManager.loadBitmap = function(folder, filename, hue, smooth) {
            if (!filename) return this.loadEmptyBitmap();
            var path = (folder === 'img/titles1/' && filename === 'AllStoryKorTitle')
                ? 'assets/AllStoryKorTitle.png'
                : NEoul + folder + encodeURIComponent(filename) + '.png';
            var bitmap = this.loadNormalBitmap(path, hue || 0);
            bitmap.smooth = smooth;
            return bitmap;
        };
    }

    if (window.DataManager) {
        DataManager.loadDataFile = function(name, src) {
            // Map001 and Tilesets are intercepted by allstory_map_loader.js.
            var url = src === 'System.json'
                ? ALLSTORY_RAW + 'data/System.json'
                : NEoul + 'data/' + src;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.overrideMimeType('application/json');
            xhr.onload = function() {
                if (xhr.status < 400) {
                    window[name] = JSON.parse(xhr.responseText);
                    DataManager.onLoad(window[name]);
                }
            };
            xhr.onerror = function() {
                DataManager._errorUrl = DataManager._errorUrl || url;
            };
            window[name] = null;
            xhr.send();
        };
    }
})();
