//属性劫持
function defineObjProp (obj, propName, propValue) {
    var self = this;
    var _value = proValue || '';
    try {
        Object.definedProperty(obj, propName, {
            get: function() {
                return _value;
            },
            set: function(newValue) {
                _value = newValue;
                pubsub.publish('update', self.modelName + '.' + propName, newValue);
            },
            enumerable: true,
            configurable: true
        });
        obj[propName] = _value;
    } catch (error) {
        console('浏览器版本必须大于IE8')
    }
}