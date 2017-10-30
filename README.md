# BASIS
BASIS is an open source library designed to simplify working with DOM. All functions were included to Document and Element prototypes in order to beaytify your code, ;)

# Prototypes of methods
###### Document.prototype.newElement
Creates a DOM-Element, may take different params:
    
    @param {String} type - string with tag name
    @param {Object} attributes - a mass of attributes, classes and event listeners of element
    @param {Array} children - array of children of element
    @return {Element} - created DOMElement

For example, all thouse rows will not geterate an error:

    var child1 = document.newElement("div", {"width": "100px", "height": "100px"});
    var child2 = document.newElement("div");
    var child3 = document.newElement("div", child1, child2);

As you see, only first parameter is obligatory.
Moreover, you can pass an object of event listeners or an array of CSS classes here:

    
    var eventListeners = {"click", [function1, function2, function3]};
    var classList = ["class1", "class2"];
    
    var child1 = document.newElement("div", {"width": "100px", "height": "100px", "eventListeners": eventListeners, "classList": classList});

###### Element.prototype.newElement
As like as the previous one, but appends a generated element to element from which method was called.

###### Element.prototype.setEventListeners
Appends event listeners to element from which was callled.

    @param {Object} eventListeners - object of listeners, see the previous example for symtax.

###### Element.prototype.setAttributes
Appends attributes to element from which was callled. If you passed attrobute with value null or undefined, BASIS will remove it from element.

    @param {Object} attributes - object of attributes, see symtax is same as in the first example.

###### Element.prototype.setCSS
Appends a CSS classes to element from which was called.

    @param {Array} CSSclasses - array of CSS classes in strings.

###### Element.prototype.appendChildren
Appends children. May take array or just arguments of Element type.
In this example all children will be appended:

    parent.appendChildren(child1, [child2, child3, [child4], child5], child6);

###### Element.prototype.setProperties
Sets properties to element from which was called.

    @param {Object} - parameters of an element, syntax is equal to second parameter of Document.prototype.newElement

# ToDo
Add new methods and new functions if need.