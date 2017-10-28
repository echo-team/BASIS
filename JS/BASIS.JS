/*
 * Sets event listeners to DOM-Element
 *
 * @param {Object} eventListeners - a mass of event listeners
 */
Element.prototype.setEventListeners = function(eventListeners)
{
    if (!eventListeners)
    {
        return;
    }

	for (var event in eventListeners)
	{
		eventListeners[event].forEach
		(
			(function(eventListener)
			{
				this.addEventListener(event, eventListener);
			}).bind(this);
		);
	}
};

Element.prototype.setCSS = function(classes)
{
    if (!classes)
    {
        return;
    }

	classes.forEach
	(
		(function(CSSclass)
		{
			this.classList.add(CSSclass);
		}).bind(this)
	);
};

Element.prototype.setAttributes = function(attributes)
{
	for (var attribute in attributes)
	{
		attributes[attribute] ? this.setAttribute(attribute, attributes[attribute]) : this.removeAttribute(attribute);
	}
};

Element.prototype.removeAttributes = function(attributes)
{
    for (var attribute in attributes)
    {
        this.removeAttributes(attribute);
    }
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
		function (child)
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
		}
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
};
