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

    this.__events__ = this.__events__ || {};

	for (var event in eventListeners)
	{
        if (!isArray(eventListeners[event]))
        {
            eventListeners[event] = [eventListeners[event]];
        }

        this.__events__[event] = this.__events__[event] || [];

		eventListeners[event].forEach
		(
			(function(eventListener)
			{
                if (!isFunction(eventListener))
                {
                    console.warn("ERROR: cannot set something except Function as an event listener to event, called \"" + event + "\". Skipping.");
                    return;
                }

                if (event == "resize" && this.tagName != "IFRAME" && this.__events__.resize && !this.__events__.resize.length)
                {
                    this.__resizer__ = this.newChildElementBefore(this.children[0], "iframe", {style: "WIDTH:100%;HEIGHT:100%;POSITION:ABSOLUTE;", name: "BASIS__RESIZER"});
                    this.__resizer__.contentWindow.onresize = (function()
                    {
                        this.dispatchEvent(new Event("resize"));
                    }).bind(this);
                }
                
                this.__events__[event].push(eventListener);
				this.addEventListener(event, eventListener);
			}).bind(this)
		);
	}
};

/*
 * Removes event listeners to DOM-Element
 *
 * @param {Object} eventListeners - a mass of event listeners
 */
Element.prototype.removeEventListeners = function(eventListeners)
{
    if (!eventListeners || !isObject(eventListeners))
    {
        console.warn("ERROR: argument passed to setEventListeners method is not an Object. Skipping.");
        return;
    }

    this.__events__ = this.__events__ || {};

	for (var event in eventListeners)
	{
        if (!isArray(eventListeners[event]))
        {
            eventListeners[event] = [eventListeners[event]];
        }

        this.__events__[event] = this.__events__[event] || [];

		eventListeners[event].forEach
		(
			(function(eventListener)
			{
                if (!isFunction(eventListener))
                {
                    console.warn("ERROR: cannot remove something except Function as an event listener to event, called \"" + event + "\". Skipping.");
                    return;
                }

                var index = this.__events__[event].indexOf(eventListener);
                if (index != -1)
                {
                    this.__events__[event].splice(index, 1);
                    if (event == "resize" && !this.__events__[event].length)
                    {
                        this.removeChildren(this.__resizer__);
                    }
                }
				this.removeEventListener(event, eventListener);
			}).bind(this)
		);
	}
};

/**
 * Clones DOMElement
 * @param {Object} properties            - settings for cloning
 * @param {Boolean} properties.listeners - if true then DOMElement will be cloned with event listeners
 * @param {Boolean} properties.deep      - if true then DOMElement will be cloned with CSS and children
 */
Element.prototype.cloneElement = function(properties)
{
    var element;

    if (properties.deep)
    {
        element = this.cloneNode(true);
    }
    else
    {
        element = this.cloneNode(true);
    }

    if (properties.listeners)
    {
        element.__events__ = this.__events__;
        element.setEventListeners(element.__events__);
    }

    return element;
}

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
    if (isObject(properties.eventListeners))
    {
        this.setEventListeners(properties.eventListeners);
    }
    else if (properties.eventListeners)
    {
        console.warn("ERROR: argument passed to setEventListeners method is not an Object. Skipping");
    }

    if (isArray(properties.classList) || isString(properties.classList))
    {
        this.setCSS(properties.classList);
    }
    else if (properties.classList)
    {
        console.warn("ERROR: cannot set something except String or Array as an CSS-class. Skipping.");
    }

	delete properties.eventListeners;
	delete properties.classList;

	this.setAttributes(properties);
};

/*
 * Appends a mass of children to DOM-Element
 *
 * @param {Element|Text|Array} - children to append
 */
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
                console.log(child);
                console.warn("ERROR: cannot append something except String, Text or Element as an DOMElement. Skipping.");
            }
		}).bind(this)
	);
};

/*
 * Removes a mass of children to DOM-Element
 *
 * @param {Element|Text|Array} - children to remove
 */
Element.prototype.removeChildren = function()
{
	Array.from(arguments).forEach
	(
		(function (child)
		{
			if (isElement(child) || isText(child))
			{
				this.removeChild(child);
            }
            else if (isArray(child) && !isString(child))
            {
                this.removeChildren.apply(this, child);
            }
            else
            {
                console.warn("ERROR: cannot remove something except Text or Element as an DOMElement. Skipping.");
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
    arguments = Array.from(arguments);
    if (typeof arguments[0] != "string")
	{
        console.warn("ERROR: first argument passed to newElement method is not an String. Skipping.");
		return null;
	}

	var element = document.createElement(arguments[0]);
    arguments = arguments.slice(1);

	if (arguments[0] && !isArray(arguments[0]) && !isElement(arguments[0]) && !isString(arguments[0]))
	{
		element.setProperties(arguments[0]);
        arguments = arguments.slice(1);
	}

    if (arguments[0] && (isArray(arguments[0]) || isElement(arguments[0]) || isString(arguments[0])))
    {
        element.appendChildren.apply(element, arguments);
    }

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

Element.prototype.newChildElementBefore = function()
{
    var element = document.newElement.apply(null, Array.from(arguments).splice(1, arguments.length - 1));
    if (element)
    {
        if (isElement(arguments[0]))
        {
            this.insertBefore(element, arguments[0]);
        }
        else
        {
            this.appendChild(element);
        }
    }

    return element;
};
