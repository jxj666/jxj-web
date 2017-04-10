jquery 关键词

选择器 : 基本 层级 表单 属性 筛选 (基本,内容,可见性,子元素)

选择方法

- .eq(index)
- .get([index])
- .next([selector])
- .prev([selector])
- .nextAll([selector])
- .prevAll([selector])
- .siblings([selectors])
- .parent([selector])
- .parents([selector])
- .children([selector])
- .find([selector])
- .first()
- .last()
- .filter(selector)
- .filter(function(index))
- .not(selector)
- .not(function(index))
- .is(selector)
- .is(function(index))- .
- .is(dom/jqObj)
- .has(selector)
- .has(dom)

Dom 操作

- .append(content[,content])
- .append(function(index,html))
- .appendTo(target)
- .prepend(content[,content])
- .prepend(function(index,html))
- .prependTo(target)
- .before([content][,content]) 
- .before(function)
- .insertBefore(target)
- .after([content][,content]) 
- .after(function（index）)
- .insertAfter(target)
- .remove([selector])
- .empty()
- .detach()
- .wrap(wrappingElement)
- .wrap(function(index))
- .wrapAll(wrappingElement)
- .wrapInner(wrappingElement)
- .wrapInner(function(index))
- .unwrap()
- .html([string])
- .text([string])

属性操作

- .val([value])
- .attr(attributeName)
- .attr(attributeName,value)
- .attr(attributesJson)
- .attr( attributeName, function(index, attr) )
- .removeAttr()
- .prop()
- .removeProp()
- .css(propertyName)
- .css(propertyNamesArray)
- .css(propertyName,value) 
- .css( propertyName, function(index, value) ) 
- .css( propertiesJson )
- .addClass(className) 
- .addClass(function(index,currentClass))
- .removeClass([className]) 
- .removeClass(function(index,class))
- .hasClass(className)
- .toggleClass(className)

常用方法

- .each( function(index, Element) )
- jQuery.each( collection, callback(indexInArray, valueOfElement) )
- .map( callback(index, domElement) )
- jQuery.extend([deep,] target [, object1 ] [, objectN ] )
- .clone( [withDataAndEvents ] )
- .index() 
- .index(selector)
- .index(element)
- .ready( handler )

事件

- .on( events [,selector ] [,data ], handler(eventObject) )
- .off( events [, selector ] [, handler ] )
- .trigger( eventType [, extraParameters ] )

动画

- .hide([duration ] [,easing ] [,complete ])
- .show( [duration ] [, easing ] [, complete ] )
- .toggle( [duration ] [, easing ] [, complete ] )
- .fadeIn( [duration ] [, easing ] [, complete ] )
- .fadeOut( [duration ] [, easing ] [, complete ] )
- .fadeTo( duration, opacity [, easing ] [, complete ] )
- .fadeToggle( [duration ] [, easing ] [, complete ] )
- .slideDown( [duration ] [, easing ] [, complete ] )
- .slideUp( [duration ] [, easing ] [, complete ] )
- .slideToggle( [duration ] [, easing ] [, complete ] )
- .animate( properties [, duration ] [, easing ] [, complete ] )
- .animate( properties, options )
- .stop( [clearQueue ] [, jumpToEnd ] )

传输

- jQuery.ajax( [settings ] )
settings : async beforeSend cache context data headers method dataType
- jQuery.get( [settings] )
- jQuery.post( [settings ] )
- jQuery.getJSON( url [, data ] [, success(data, textStatus, jqXHR) ] )
- .load( url [, data ] [, complete(responseText, textStatus, XMLHttpRequest) ] )
- .serialize() 
- .serializeArray()

