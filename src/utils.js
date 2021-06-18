import { includes } from 'lodash';

export function hasClass(el, klass) {
    return includes(el.classList, klass);
}

export function arrayMove(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
};

export function getMidPoint(el) {
    const rect = el.getBoundingClientRect();
    return rect.top + rect.height/2;
}