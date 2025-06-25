let assetsToLoadURLs;
// Func to load assets & call the callback Func
function loadAssets(assetsURL, callback) {
    assetsToLoadURLs = assetsURL;
    loadAssetsUsingHowlerAndNoXhr(assetsToLoadURLs, callback);
}
//Buffer Loader to load multiple files asynchronously. The callback functions is called when all files have been loaded and decoded
function isImage(url) {
    return (url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null);
}
function isAudio(url) {
    return (url.match(/\.(mp3|m4a|ogg|wav)$/) != null);
}
function loadAssetsUsingHowlerAndNoXhr(assetsToBeLoaded, callback) {
    var assetsLoaded = {};
    var loadedAssets = 0;
    var numberOfAssetsToLoad = 0;

    // define ifLoad feature
    var ifLoad = function () {
        if (++loadedAssets >= numberOfAssetsToLoad) {
            callback(assetsLoaded);
        }
        console.log("Loaded asset " + loadedAssets);
    };

    // get num of assets to load
    for (var name in assetsToBeLoaded) {
        numberOfAssetsToLoad++;
    }

    console.log("Nb assets to load: " + numberOfAssetsToLoad);

    for (name in assetsToBeLoaded) {
        var url = assetsToBeLoaded[name].url;
        console.log("Loading " + url);
        if (isImage(url)) {
            assetsLoaded[name] = new Image();

            assetsLoaded[name].onload = ifLoad;
            // will start async loading. 
            assetsLoaded[name].src = url;
        } else {
            // We assume the asset is an audio file
            console.log("loading " + name + " buffer : " + assetsToBeLoaded[name].loop);
            assetsLoaded[name] = new Howl({
                src: [url],
                buffer: assetsToBeLoaded[name].buffer,
                loop: assetsToBeLoaded[name].loop,
                autoplay: false,
                volume: assetsToBeLoaded[name].volume,
                onload: function () {
                    if (++loadedAssets >= numberOfAssetsToLoad) {
                        callback(assetsLoaded);
                    }
                    console.log("Loaded asset " + loadedAssets);
                }
            }); // End of howler.js callback
        } // if

    } // for
} // function
export { loadAssets }
