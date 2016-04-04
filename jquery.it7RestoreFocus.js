/**
 *
 * jquery.it7RestoreFocus.js
 * @summary Save and restore focus jQuery plugin
 * @see https://github.com/it7-solutions/jquery.it7RestoreFocus.js
 *
 * @version: 1.0.0
 * @author ANEKHERo.SyS aka Kolodyazhni Andrew
 *
 * @licence MIT License http://www.opensource.org/licenses/mit-license
 *
 * @requires jQuery jQuery v1.8.2
 */
;(function ($) {


    /* Variables */
    var defaultOptions = {
        // Error message style
        // 0 - hide
        // 1 - show native alert
        errorMessage: 1
    };


    /* Public methods */
    function it7SaveFocus() {
        var result = {selector: '', position: {}};
        var element = $(this).get(0);
        if(element){
            result.selector = getPath(element);
            result.position = getElementSelection(element);
        }
        return result;
    }

    function it7RestoreFocus(focus) {
        var found = false;
        if(focus && focus.selector) {
            var $element = $(focus.selector);
            if($element.length){
                $element.focus();
                if(focus.position && focus.position.start !== undefined && focus.position.end !== undefined) {
                    setElementSelection($element.get(0), focus.position.start, focus.position.end);
                }
            }
        }
        return found;
    }

    /* Private methods */

    function getPath(element) {
        var node = $(element);
        if (node.length != 1) throw 'Requires one element.';
        var path = "";
        while (node.length) {
            var realNode = node[0];
            var name = realNode.localName;
            if (!name) break;
            name = name.toLowerCase();
            var parent = node.parent();
            var siblings = parent.children(name);
            if (siblings.length > 1) {
                name += ':eq(' + siblings.index(realNode) + ')';
            }
            path = name + (path ? '>' + path : '');
            node = parent;
        }
        return path;
    }

    function getElementSelection(that) {
        var position = {};
        if (that.selectionStart === undefined) {
            that.focus();
            var select = document.selection.createRange();
            position.length = select.text.length;
            select.moveStart('character', -that.value.length);
            position.end = select.text.length;
            position.start = position.end - position.length;
        } else {
            position.start = that.selectionStart;
            position.end = that.selectionEnd;
            position.length = position.end - position.start;
        }
        return position;
    }

    function setElementSelection(that, start, end) {
        if (that.selectionStart === undefined) {
            that.focus();
            var r = that.createTextRange();
            r.collapse(true);
            r.moveEnd('character', end);
            r.moveStart('character', start);
            r.select();
        } else {
            that.selectionStart = start;
            that.selectionEnd = end;
        }
    }

    /**
     * Show error Message
     *
     * @param message
     */
    function showError(message) {
        if (defaultOptions.errorMessage) {
            alert('Javascript runtime error: ' + message);
        }
    }


    /* Register plugin in jQuery namespace */
    $.fn.it7SaveFocus = it7SaveFocus;
    $.it7RestoreFocus = it7RestoreFocus;

})(jQuery);