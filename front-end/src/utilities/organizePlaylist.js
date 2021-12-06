export function shufflePlaylist(arr) {
    let j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }

    if (arr.length > 12) {
        return arr.slice(0, 13);
    } else {
        return arr;
    }
}
