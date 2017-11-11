function isFunction(element)
{
    return element instanceof Function;
}

function isArray(element)
{
    return element instanceof Array;
}

function isObject(element)
{
    return element instanceof Object;
}

function isElement(element)
{
    return element instanceof Element;
}

function isText(element)
{
    return element instanceof Text;
}

function isString(element)
{
    return typeof element == "string";
}
