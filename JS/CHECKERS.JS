function isArray(element)
{
    return element instanceof Array;
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
