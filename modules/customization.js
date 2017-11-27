const deepExtend = require('deep-extend');
const { dirname, resolve } = require('path');
const { existsSync } = require('fs');
const { isObject, isString, isFunction, isArray } = require('./typeChecker');

const getCustom = pth => {
    const root = dirname(require.main.filename);

    return existsSync(resolve(root, pth)) ? require(resolve(root, pth)) : {};
};

const mix = (props, data) => {
    if (isObject(data)) {
        return deepExtend(props, data);
    }
    else if (isString(data)) {
        data = getCustom(data);
        return deepExtend(props, data);
    }
    return props;
};

const customize = (...args) => {
    let props = args[0];
    let middlewares = args[1];

    if (isFunction(middlewares)) {
        props.middlewares = {
            pre: middlewares
        }
    }
    else if (isArray(middlewares)) {
        props.middlewares = {
            pre: middlewares
        }
    }
    else if (isObject(middlewares)) {
        props.middlewares = {
            pre: middlewares.pre,
            post: middlewares.post
        }
    }
    return props;
};

module.exports = {
    customize,
    mix
};