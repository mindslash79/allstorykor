// Loads the full Velvet Shadows track from small CDN chunks.
(function() {
    'use strict';
    var BASE = 'https://cdn.jsdelivr.net/gh/mindslash79/allstorykor@main/assets/chunks/';

    async function readParts(prefix, count) {
        var jobs = [];
        for (var i = 0; i < count; i++) {
            var n = ('0' + i).slice(-2);
            jobs.push(fetch(BASE + prefix + '_' + n + '.txt', { cache: 'force-cache' }).then(function(r) {
                if (!r.ok) throw new Error('asset chunk load failed: ' + r.status);
                return r.text();
            }));
        }
        return (await Promise.all(jobs)).join('').replace(/\s+/g, '');
    }

    function base64ToBlobUrl(base64, mime) {
        var bin = atob(base64);
        var bytes = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return URL.createObjectURL(new Blob([bytes], { type: mime }));
    }

    async function load() {
        var music = await readParts('music', 5);
        return {
            titleUrl: 'assets/AllStoryKorTitle.jpg',
            openingUrl: 'assets/Allstory_Opening.mp4',
            musicUrl: base64ToBlobUrl(music, 'audio/mpeg')
        };
    }

    window.AllStoryAssets = { ready: load() };
})();
