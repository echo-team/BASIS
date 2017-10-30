/*
 * Sets event listeners to DOM-Element
 *
 * @param {Object} eventListeners - a mass of event listeners
 */
Element.prototype.setEventListeners = function(eventListeners)
{
    if (!eventListeners || !isObject(eventListeners))
    {
        console.warn("ERROR: argument passed to setEventListeners method is not an Object. Skipping.");
        return;
    }

	for (var event in eventListeners)
	{
        if (!isArray(eventListeners[event]))
        {
            eventListeners[event] = [eventListeners[event]];
        }

		eventListeners[event].forEach
		(
			(function(eventListener)
			{
                if (!isFunction(eventListener))
                {
                    console.warn("ERROR: cannot set something except Function as an event listener to event, called \"" + event + "\". Skipping.");
                    return;
                }
				this.addEventListener(event, eventListener);
			}).bind(this)
		);
	}
};

Element.prototype.removeCSS = function()
{
    Array.from(arguments).forEach
	(
		(function(CSSclass)
		{
            if (isString(CSSclass))
			{
                this.classList.remove(CSSclass);
            }
            else if (isArray(CSSclass))
            {
                this.setCSS.apply(this, CSSclass);
            }
            else
            {
                console.warn("ERROR: cannot remove something except String as an CSS-class. Skipping.");
            }
		}).bind(this)
	);
}

Element.prototype.setCSS = function()
{
	Array.from(arguments).forEach
	(
		(function(CSSclass)
		{
            if (isString(CSSclass))
			{
                this.classList.add(CSSclass);
            }
            else if (isArray(CSSclass))
            {
                this.setCSS.apply(this, CSSclass);
            }
            else
            {
                console.warn("ERROR: cannot set something except String as an CSS-class. Skipping.");
            }
		}).bind(this)
	);
};

Element.prototype.setAttributes = function(attributes)
{
    if (!isObject(attributes))
    {
        console.warn("ERROR: argument passed to setAttributes method is not an Object. Skipping.");
        return;
    }

	for (var attribute in attributes)
	{
		attributes[attribute] ? this.setAttribute(attribute, attributes[attribute]) : this.removeAttribute(attribute);
	}
};

Element.prototype.removeAttributes = function()
{
    Array.from(arguments).forEach
    (
        (function(attribute)
        {
            if (isString(attribute))
            {
                this.removeAttribute(attribute);
            }
            else if (isArray(attribute))
            {
                this.removeAttributes.apply(this, attribute);
            }
            else
            {
                console.warn("ERROR: cannot remove attribute because given id is not a String. Skipping.");
            }
        }).bind(this)
    );
};

/*
 * Sets properties (attributes, classes and event listeners) to DOM-Element
 *
 * @param {Object} properties - a mass of properties
 */
Element.prototype.setProperties = function(properties)
{
	this.setEventListeners(properties.eventListeners);
	this.setCSS(properties.classList);

	delete properties.eventListeners;
	delete properties.classList;

	this.setAttributes(properties);
};

Element.prototype.appendChildren = function()
{
	Array.from(arguments).forEach
	(
		(function (child)
		{
			if (isElement(child))
			{
				this.appendChild(child);
            }
            else if (isText(child) || isString(child))
            {
                this.innerHTML += child;
            }
            else if (isArray(child) && !isString(child))
            {
                this.appendChildren.apply(this, child);
            }
            else
            {
                console.warn("ERROR: cannot append something except String, Text or Element as an DOMElement. Skipping.");
            }
		}).bind(this)
	);
};

/*
 * Creates a DOM-Element, may take different params
 *
 * @param {String} type - string with tag
 * @param {Object} attributes - a mass of attributes, classes and event listeners of element
 * @param {Array} children - array of children of element
 */
Document.prototype.newElement = function()
{
    if (typeof arguments[0] != "string")
	{
        console.warn("ERROR: first argument passed to newElement method is not an String. Skipping.");
		return null;
	}

	var element = document.createElement(arguments[0]);

	if (arguments[1] && !isArray(arguments[1]) && !isElement(arguments[1]))
	{
		element.setProperties(arguments[1]);
	}

    element.appendChildren.apply(element, Array.from(arguments).slice(1));

	return element;
};

Element.prototype.newChildElement = function()
{
    var element = document.newElement.apply(null, arguments);
    if (element)
    {
        this.appendChild(element);
    }

    return element;
};
