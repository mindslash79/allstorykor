// Loads AllStoryKor title image, opening video, and Velvet Shadows from small CDN chunks.
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
        var values = await Promise.all([
            readParts('title', 3),
            readParts('opening', 1),
            readParts('music', 9)
        ]);
        return {
            titleUrl: base64ToBlobUrl(values[0], 'image/jpeg'),
            openingUrl: base64ToBlobUrl(values[1], 'video/mp4'),
            musicUrl: base64ToBlobUrl(values[2], 'audio/mpeg')
        };
    }

    window.AllStoryAssets = { ready: load() };
})();
