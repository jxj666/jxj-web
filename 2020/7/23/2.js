/*
 * @LastEditTime: 2020-07-23 13:27:01
 * @LastEditors: jinxiaojian
 */

if (_this.props.onClick) _this.props.onClick(event);

if (!event.defaultPrevented && // onClick prevented default
  event.button === 0 && // ignore everything but left clicks
  !_this.props.target && // let browser handle "target=_blank" etc.
  !isModifiedEvent(event) // ignore clicks with modifier keys
) {
  event.preventDefault();

  var history = _this.context.router.history;
  var _this$props = _this.props,
    replace = _this$props.replace,
    to = _this$props.to;


  if (replace) {
    history.replace(to);
  } else {
    history.push(to);
  }
}